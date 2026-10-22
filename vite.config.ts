import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/currencypro/', // <-- Важно! Это имя твоего репозитория на GitHub
  server: { port: 5173 },
});