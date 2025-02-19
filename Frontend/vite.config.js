import path from "node:path"; // Use "node:path" for modern Node.js environments
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
        server: {
            proxy: {
                "/api": "http://localhost:3000", // Proxy API requests to the backend
            },
        },
    },
});
