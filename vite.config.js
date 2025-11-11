import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

const sharedEnv = path.resolve(__dirname, ".env.shared");
if (fs.existsSync(sharedEnv)) {
  dotenv.config({ path: sharedEnv });
}

const backendPort = process.env.BACKEND_PORT || 8000;
const backendUrl = `http://127.0.0.1:${backendPort}/connect`;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.REACT_APP_API_URL": JSON.stringify(`${backendUrl}`),
  },
  server: {
    port: Number(process.env.FRONTEND_PORT) || 3000,
  },
});
