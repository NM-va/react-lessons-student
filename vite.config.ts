/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
plugins: [
    react(),
    svgr({
             // Опциональные настройки
             svgrOptions: {
                 icon: true, // Можно использовать размеры как у иконок
             },
         }),
],
test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.ts'],
},
server: {
    port: 3000
    // proxy: {
    //     '/api': {
    //         target: 'https://mockapi.io', // Базовый URL API
    //         changeOrigin: true,
    //         rewrite: (path) => path.replace(/^\/api/, ''),
    //         configure: (proxy, _options) => {
    //             proxy.on('error', (err, _req, _res) => {
    //                 console.log('proxy error', err);
    //             });
    //             proxy.on('proxyReq', (proxyReq, req, _res) => {
    //                 console.log('Sending Request to the Target:', req.method, req.url);
    //             });
    //             proxy.on('proxyRes', (proxyRes, req, _res) => {
    //                 console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
    //             });
    //         },
    //     },
    // },
},
})