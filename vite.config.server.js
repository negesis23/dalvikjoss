import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import { h, Fragment } from 'nano-jsx'`
  },
  build: {
    ssr: true,
    lib: {
      entry: 'src/server.jsx',
      formats: ['cjs'],
      fileName: 'server'
    },
    outDir: 'dist-server',
    emptyOutDir: true
  },
  ssr: {
    noExternal: true
  }
})
