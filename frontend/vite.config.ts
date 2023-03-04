import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// https://vitejs.dev/guide/env-and-mode.html
export default defineConfig(({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	return {
		plugins: [react()],
		base: "/react-todo-list",
	};
});
