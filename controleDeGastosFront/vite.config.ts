import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Encaminha chamadas /api do front (porta 5173) para a API .NET (porta 5231).
    // O proxy roda dentro do próprio servidor Vite, então "localhost:5231" aqui é
    // resolvido no contexto do container/máquina que está rodando o Vite, não no
    // navegador — funciona igual em ambiente local e em Codespaces/devcontainers.
    proxy: {
      '/api': {
        target: 'http://localhost:5231',
        changeOrigin: true,
      },
    },
  },
})
