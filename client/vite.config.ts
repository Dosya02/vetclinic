import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import react from '@vitejs/plugin-react-swc'

const __filePath = fileURLToPath(import.meta.url)
const __dirname = dirname(__filePath)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': resolve(__dirname, './src/assets'),
      '@components': resolve(__dirname, './src/components'),
      '@constants': resolve(__dirname, './src/constants'),
      '@context': resolve(__dirname, './src/context'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@localization': resolve(__dirname, './src/localization'),
      '@models': resolve(__dirname, './src/models'),
      '@store': resolve(__dirname, './src/store'),
      '@styles': resolve(__dirname, './src/styles'),
      '@utils': resolve(__dirname, './src/utils'),
    },
  },
})
