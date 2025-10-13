import { defineConfig } from "vite";

export default defineConfig({
    //root: ".",
    base: "/WebEngineering_BaseTemplate/",   //für Pages
    build: {
    outDir: "dist" // Standard ist "dist", optional
    },
    server: {
        open: true        // auto-open browser
    }
});
