import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // build: {
  //   sourcemap: true, // Ensure source maps are enabled
  // },
  // server: {
  //   port: 3000, // Customize the port if needed
  // },
  // // Force explicit source map generation in development mode
  // esbuild: {
  //   sourcemap: true,
  // }
})
