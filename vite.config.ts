import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import postcssNested from 'postcss-nested'

// https://vite.dev/config/
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
  }
})