import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
    base: './',
    plugins: [
        tailwindcss(),
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                legal: resolve(__dirname, 'src/html/legal.html'),
                contact: resolve(__dirname, 'src/html/contact.html'),
                veille: resolve(__dirname, 'src/html/veille.html'),
            },
        },
    },
    server: {
        host: true,
        port: 5173,
        watch: {
            usePolling: true,
        },
    },
});
