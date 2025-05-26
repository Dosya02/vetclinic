import {defineConfig} from "vite";
import {fileURLToPath} from "url";
import {dirname, resolve} from "path";
import react from "@vitejs/plugin-react-swc";

const __filePath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filePath);

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@icons": resolve(__dirname, "./src/assets/icons"),
            "@images": resolve(__dirname, "./src/assets/images"),
            "@api": resolve(__dirname, "./src/api"),
            "@components": resolve(__dirname, "./src/components"),
            "@config": resolve(__dirname, "./src/config"),
            "@context": resolve(__dirname, "./src/context"),
            "@layouts": resolve(__dirname, "./src/layouts"),
            "@localization": resolve(__dirname, "./src/localization"),
            "@models": resolve(__dirname, "./src/api/models"),
            "@pages": resolve(__dirname, "./src/pages"),
            "@routes": resolve(__dirname, "./src/routes"),
            "@store": resolve(__dirname, "./src/api/store"),
            "@styles": resolve(__dirname, "./src/styles"),
            "@utils": resolve(__dirname, "./src/utils"),
        },
    },
});
