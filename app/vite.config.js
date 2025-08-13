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
		port: 5173
	}
});