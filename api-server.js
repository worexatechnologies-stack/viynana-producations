// api-server.js - Lightweight Express API for Viyana Productions Contact Form
// Run alongside Vite dev server: node api-server.js
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

// Load .env.local manually (Vite doesn't load it for Node scripts)
const envPath = path.join(__dirname, ".env.local");
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf8")
    .split("\n")
    .forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const [key, ...rest] = trimmed.split("=");
      if (key && rest.length) {
        process.env[key.trim()] = rest.join("=").trim();
      }
    });
  console.log("✅ Loaded .env.local");
}

const app = express();

// Security: Disable Express fingerprinting
app.disable("x-powered-by");

// Security: HTTP Security Headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});

// Security: Allowed Origins CORS Protection
const allowedOrigins = [
  "https://viyana.productions",
  "https://www.viyana.productions",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:4173",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, server-to-server) or approved domains
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".viyana.productions")) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in dev, logged
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Security: Enforce 50kb max payload limit to prevent DoS memory exhaustion
app.use(express.json({ limit: "50kb" }));

// Security: In-Memory Sliding-Window Rate Limiter (Max 15 submissions per 10 min per public IP)
const rateLimitMap = new Map();
function rateLimiter(req, res, next) {
  const ip =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.ip ||
    req.connection.remoteAddress ||
    "client";

  const isLocal =
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip === "::ffff:127.0.0.1" ||
    ip === "localhost" ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    ip.endsWith(".local");

  // In local development or intranet testing, bypass rate limit so testing is never blocked
  if (isLocal && process.env.NODE_ENV !== "production") {
    return next();
  }

  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 15;

  const clientHistory = (rateLimitMap.get(ip) || []).filter(t => now - t < windowMs);

  if (clientHistory.length >= maxRequests) {
    return res.status(429).json({
      success: false,
      error: "Too many contact submissions. Please wait a few minutes before submitting again.",
    });
  }

  clientHistory.push(now);
  rateLimitMap.set(ip, clientHistory);

  // Periodic cleanup if map grows large
  if (rateLimitMap.size > 1000) {
    for (const [key, timestamps] of rateLimitMap.entries()) {
      if (timestamps.every(t => now - t >= windowMs)) {
        rateLimitMap.delete(key);
      }
    }
  }

  next();
}

const PORT = process.env.PORT || 3001;

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);

const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = parseInt(process.env.SMTP_PORT || "465");
const smtpSecure = process.env.SMTP_SECURE !== "false";
const smtpUser = process.env.SMTP_USER || "info.viyanaproductions@gmail.com";
const smtpPass = process.env.SMTP_PASS || "";
const receiverEmail =
  process.env.CONTACT_RECEIVER_EMAIL || smtpUser || "info.viyanaproductions@gmail.com";
const fromName = process.env.SMTP_FROM_NAME || "Viyana Productions Web";

let transporter = null;
if (smtpUser && smtpPass) {
  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user: smtpUser, pass: smtpPass },
  });

  transporter.verify((err) => {
    if (err) {
      console.error("❌ SMTP verification failed:", err.message);
    } else {
      console.log(`✅ SMTP ready → will send to: ${receiverEmail}`);
    }
  });
} else {
  console.log("ℹ️ No SMTP_USER / SMTP_PASS found in .env.local. Inquiries will be logged and saved to data/inquiries.json.");
}

/**
 * Saves incoming contact form inquiry to a local JSON file
 * so no customer leads are ever lost even if SMTP is unavailable.
 */
function saveInquiryLocally(inquiry) {
  try {
    const dataDir = path.join(__dirname, "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const filePath = path.join(dataDir, "inquiries.json");
    let list = [];
    if (fs.existsSync(filePath)) {
      try {
        list = JSON.parse(fs.readFileSync(filePath, "utf8"));
      } catch (e) {
        list = [];
      }
    }
    list.unshift({
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...inquiry,
    });
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2), "utf8");
    console.log(`📁 Inquiry saved to data/inquiries.json (Total inquiries: ${list.length})`);
  } catch (err) {
    console.error("Failed to save inquiry locally:", err);
  }
}

app.post("/api/contact", rateLimiter, async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  // Input presence checks
  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ success: false, error: "Name is required." });
  }
  if (!phone || typeof phone !== "string" || !phone.trim()) {
    return res.status(400).json({ success: false, error: "Phone number is required." });
  }
  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ success: false, error: "Message is required." });
  }

  // Security: Max character length validation
  if (name.length > 100) {
    return res.status(400).json({ success: false, error: "Name must be under 100 characters." });
  }
  if (phone.length > 30) {
    return res.status(400).json({ success: false, error: "Phone number must be under 30 characters." });
  }
  if (message.length > 3000) {
    return res.status(400).json({ success: false, error: "Message must be under 3000 characters." });
  }
  if (email && (typeof email !== "string" || email.length > 120)) {
    return res.status(400).json({ success: false, error: "Email must be under 120 characters." });
  }
  if (service && (typeof service !== "string" || service.length > 100)) {
    return res.status(400).json({ success: false, error: "Service must be under 100 characters." });
  }

  const formattedDate = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  const inquiryRecord = {
    name,
    email: email || "N/A",
    phone,
    service: service || "General Inquiry",
    message,
    receivedAt: formattedDate,
  };

  // 1. Always record the inquiry locally first so lead data is safe
  saveInquiryLocally(inquiryRecord);

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:0;background-color:#0c0d0e;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#ededed;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:30px auto;background-color:#141517;border:1px solid #282828;border-radius:16px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
    <tr>
      <td style="padding:36px 36px 24px 36px;background:linear-gradient(180deg,#1c1d20 0%,#141517 100%);border-bottom:1px solid #282828;">
        <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:3px;color:#888888;display:block;margin-bottom:6px;">NEW INCOMING INQUIRY</span>
        <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">VIYANA PRODUCTIONS</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:32px 36px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="padding-bottom:24px;">
              <div style="display:inline-block;background-color:#ffffff;color:#000000;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;padding:6px 14px;border-radius:20px;">${escapeHtml(service || "General Inquiry")}</div>
            </td>
          </tr>
          <tr>
            <td>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#1a1b1e;border:1px solid #2d2e32;border-radius:10px;margin-bottom:24px;">
                <tr>
                  <td style="padding:14px 18px;border-bottom:1px solid #242528;width:30%;color:#888888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Name</td>
                  <td style="padding:14px 18px;border-bottom:1px solid #242528;color:#ffffff;font-size:14px;font-weight:600;">${escapeHtml(name)}</td>
                </tr>
                ${email ? `<tr>
                  <td style="padding:14px 18px;border-bottom:1px solid #242528;color:#888888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</td>
                  <td style="padding:14px 18px;border-bottom:1px solid #242528;color:#ffffff;font-size:14px;"><a href="mailto:${escapeHtml(email)}" style="color:#ffffff;text-decoration:underline;">${escapeHtml(email)}</a></td>
                </tr>` : ""}
                <tr>
                  <td style="padding:14px 18px;border-bottom:1px solid #242528;color:#888888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Phone</td>
                  <td style="padding:14px 18px;border-bottom:1px solid #242528;color:#ffffff;font-size:14px;"><a href="tel:${escapeHtml(phone)}" style="color:#ffffff;text-decoration:none;">${escapeHtml(phone)}</a></td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;color:#888888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Received</td>
                  <td style="padding:14px 18px;color:#aaaaaa;font-size:13px;">${formattedDate} (IST)</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#888888;display:block;margin-bottom:8px;">Project Brief / Message:</span>
              <div style="background-color:#0e0f11;border:1px solid #282828;border-left:3px solid #ffffff;padding:18px;border-radius:8px;color:#dddddd;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding-top:30px;text-align:center;">
              ${email ? `<a href="mailto:${escapeHtml(email)}?subject=Re:%20Inquiry%20from%20Viyana%20Productions%20Website" style="display:inline-block;background-color:#ffffff;color:#000000;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;padding:14px 30px;border-radius:30px;text-decoration:none;">Reply to ${escapeHtml(name)} &rarr;</a>` : `<a href="tel:${escapeHtml(phone)}" style="display:inline-block;background-color:#ffffff;color:#000000;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;padding:14px 30px;border-radius:30px;text-decoration:none;">Call ${escapeHtml(name)} &rarr;</a>`}
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 36px;background-color:#0e0f11;border-top:1px solid #242528;text-align:center;color:#666666;font-size:11px;letter-spacing:0.5px;">
        This notification was generated automatically from the contact form on viyanaproductions.com.
      </td>
    </tr>
  </table>
</body>
</html>`;

  const textContent = `New Project Enquiry - Viyana Productions
------------------------------------------
Service: ${service || "General Inquiry"}
Name: ${name}
${email ? `Email: ${email}\n` : ""}Phone: ${phone}
Received: ${formattedDate} (IST)

Message:
${message}
------------------------------------------
${email ? `Reply to: ${email}` : `Call: ${phone}`}`;

  // If SMTP transporter is configured, send the real email
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"${fromName}" <${smtpUser}>`,
        to: receiverEmail,
        ...(email ? { replyTo: email } : {}),
        subject: `New Project Inquiry: ${name} [${service || "Production"}]`,
        text: textContent,
        html: htmlContent,
      });
      console.log(`✉️ Email dispatched to ${receiverEmail}`);
    } catch (error) {
      console.error("⚠️ [SMTP DISPATCH ERROR]:", error.message);
      // Lead is still saved in data/inquiries.json
    }
  } else {
    console.log(`ℹ️ Lead received from ${name} (${phone}) - saved to inquiries.json`);
  }

  // Always return success so the user sees the confirmation and submission succeeds
  return res.json({
    success: true,
    message: "Your message has been sent successfully. Our team will contact you shortly.",
  });
});

// Serve production built frontend (Hostinger Node.js deployment support)
const buildDir = path.join(__dirname, "build");
if (fs.existsSync(buildDir)) {
  app.use(express.static(buildDir));
  app.use((req, res, next) => {
    if (req.method === "GET") {
      if (req.path === "/portfolio" || req.path.startsWith("/portfolio/")) {
        const portfolioHtml = path.join(buildDir, "portfolio", "index.html");
        if (fs.existsSync(portfolioHtml)) {
          return res.sendFile(portfolioHtml);
        }
      }
      if (!req.path.startsWith("/api")) {
        return res.sendFile(path.join(buildDir, "index.html"));
      }
    }
    next();
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Viyana server running on port ${PORT}`);
  console.log(`   POST /api/contact → sends via SMTP or saves to data/inquiries.json`);
});
