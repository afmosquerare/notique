import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/notique.ts'),
      name: 'Notique',
      fileName: (format) => `notique.${format}.js`,
      formats: ['es', 'umd']
    }
  }
});
