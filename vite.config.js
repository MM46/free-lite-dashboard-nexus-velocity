import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import base44 from '@base44/vite-plugin'

// https://vite.dev
export default defineConfig({
  base: '/free-lite-dashboard-nexus-velocity/',
  plugins: [
    base44({
      legacySDKImports: false,
      hmrNotifier: false,
      navigationNotifier: false,
      analyticsTracker: false,
      visualEditAgent: false
    }),
    react(),
  ]
});
