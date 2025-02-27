import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import compression from 'vite-plugin-compression'

export default defineConfig({
    plugins: [
        react(),
        visualizer({ open: true }),
        compression({
            algorithm: 'brotliCompress',
            ext: '.br',
            threshold: 1024,
            deleteOriginFile: false,
        }),
        compression({
            algorithm: 'gzip',
            ext: '.gz',
            threshold: 1024,
            deleteOriginFile: false,
        }),
    ],
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
            output: {
                comments: false,
            },
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom'],
                    vendor: ['axios', 'lodash'], // Group other dependencies
                },
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
