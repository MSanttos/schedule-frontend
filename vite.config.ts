import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import postcssNested from 'postcss-nested'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        postcssNested,
        tailwindcss,
        autoprefixer
      ]
    }
  },
  server: {
    // Configuração para SPA (Single Page Application)
    // Todas as requisições devem retornar o index.html
    // Isso é necessário para o roteamento do React funcionar
    proxy: {
      // Adicione aqui seus proxies se necessário
    }
  },
  // Configuração de build para SPA
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // Desativa a divisão de chunks para SPA simples
      }
    },
    // Configura o fallback para index.html para rotas não encontradas
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  }
})