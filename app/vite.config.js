import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
 
export default defineConfig({
	plugins: [react()],
	preview: {
		port: 5173,
		host: true,    // This enables listening on all network interfaces
	},
	server: {        // Also add this for development server
		host: true,    // This enables listening on all network interfaces
		port: 5173,
    allowedHosts: ["traefik.me", ".traefik.me"],
    hmr: {
      host: "rivage-rivageallstack-pris1b-3afe35-46-62-137-212.traefik.me",
      protocol: "wss", // ou "ws" si pas HTTPS
    }
	}
});