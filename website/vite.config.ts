import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

function gitpodConfig() {
	if (process.env.APP_ENV === "gitpod") {
		return {
			server: {
				hmr: {
					clientPort: 443,
				},
			},
		};
	}
}

export default defineConfig({
	plugins: [react()],
	...gitpodConfig(),
});
