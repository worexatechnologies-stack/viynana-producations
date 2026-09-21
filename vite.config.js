import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
export default defineConfig({
    plugins: [react(), tailwindcss()],
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
