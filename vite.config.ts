import { defineConfig } from 'vite';
import { resolve } from 'path';
import Inspect from 'vite-plugin-inspect';

import glsl from 'vite-plugin-glsl';

export default defineConfig({
  plugins: [glsl(undefined, /\.(glsl|vert|frag)$/i, 'glsl'), Inspect()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
