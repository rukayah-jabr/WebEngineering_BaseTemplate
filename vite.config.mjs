import { defineConfig } from "vite";

export default defineConfig({
    root: ".",
    base: "./",    //für Pages
    build: {
    outDir: "dist", // Standard ist "dist", optional
    emptyOutDir: true
    },
    server: {
        open: true        // auto-open browser
    }
});
