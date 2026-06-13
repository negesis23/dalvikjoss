import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: 'dist-server',
    ssr: true,
    lib: {
      entry: path.resolve('src/platform/server/server.jsx'),
      formats: ['iife'],
      name: 'server',
      fileName: () => 'server.js',
    },
    rollupOptions: {
      external: [],
      output: {
        extend: true,
      },
    },
  },
  ssr: {
    noExternal: ['nano-jsx'],
  },
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
});