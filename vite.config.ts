import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { spawn } from "child_process";
import net from "net";

function autoApiServerPlugin(): Plugin {
  return {
    name: "auto-api-server",
    configureServer() {
      const tester = net.createServer();
      tester.once("error", (err: NodeJS.ErrnoException) => {
        if (err.code === "EADDRINUSE") {
          console.log("ℹ️ Contact API server is already active on port 3001");
        }
      });
      tester.once("listening", () => {
        tester.close(() => {
          console.log("🚀 Auto-starting api-server.js on port 3001 for contact form...");
          const apiProcess = spawn("node", ["api-server.js"], {
            cwd: __dirname,
            stdio: "inherit",
            shell: true,
          });
          process.on("exit", () => {
            try {
              apiProcess.kill();
            } catch {
              // ignore
            }
          });
        });
      });
      tester.listen(3001);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), autoApiServerPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    host: true,
    port: 4173,
  },
  base: "/",
  build: {
    outDir: "build",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          animations: ["framer-motion", "gsap"],
        },
      },
    },
  },
});
