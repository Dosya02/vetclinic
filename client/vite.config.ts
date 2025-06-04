import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import react from '@vitejs/plugin-react-swc';

const __filePath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filePath);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@icons': resolve(
        __dirname,
        './src/assets/icons',
      ),
      '@images': resolve(
        __dirname,
        './src/assets/images',
      ),
      '@styles': resolve(
        __dirname,
        './src/assets/styles',
      ),
      '@components': resolve(
        __dirname,
        './src/components',
      ),
      '@constants': resolve(
        __dirname,
        './src/constants',
      ),
      '@data': resolve(__dirname, './src/data'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@layouts': resolve(
        __dirname,
        './src/layouts',
      ),
      '@localization': resolve(
        __dirname,
        './src/localization',
      ),
      '@models': resolve(__dirname, './src/models'),
      '@pages': resolve(__dirname, './src/pages'),
      '@providers': resolve(__dirname, './src/providers'),
      '@routes': resolve(__dirname, './src/routes'),
      '@store': resolve(__dirname, './src/store'),
      '@helpers': resolve(
        __dirname,
        './src/utils/helpers',
      ),
      '@types': resolve(
        __dirname,
        './src/utils/types',
      ),
      '@validators': resolve(
        __dirname,
        './src/utils/validators',
      ),
    },
  },
});
