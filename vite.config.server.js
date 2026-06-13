import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  build: {
    ssr: true,
    lib: {
      entry: 'src/server.jsx',
      formats: ['iife'],
      name: 'DalvikJossServer',
      fileName: 'server'
    },
    outDir: 'dist-server',
    emptyOutDir: true
  },
  ssr: {
    noExternal: true
  }
})