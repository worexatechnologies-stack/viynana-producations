import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { spawn } from "child_process";
import net from "net";
function autoApiServerPlugin() {
    return {
        name: "auto-api-server",
        configureServer() {
            const tester = net.createServer();
            tester.once("error", (err) => {
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
                        }
                        catch {
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
        // Increase chunk size warning threshold slightly for animation-heavy app
        chunkSizeWarningLimit: 600,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // Core React vendor
                    if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/") || id.includes("node_modules/react-router-dom/") || id.includes("node_modules/scheduler/")) {
                        return "vendor";
                    }
                    // Heavy animation libraries in a separate async chunk
                    if (id.includes("node_modules/framer-motion/") || id.includes("node_modules/motion/")) {
                        return "framer-motion";
                    }
                    if (id.includes("node_modules/lenis/")) {
                        return "lenis";
                    }
                    // Lucide icons tree-shaken separately
                    if (id.includes("node_modules/lucide-react/")) {
                        return "lucide";
                    }
                },
            },
        },
    },
});
