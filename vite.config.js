import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import Sitemap from 'vite-plugin-sitemap';

export default defineConfig({
    base: './',
    plugins: [
        tailwindcss(),
        Sitemap({
            hostname: 'https://valentinhrnd.fr',
            dynamicRoutes: ['/src/html/about', '/src/html/exp', '/src/html/legal', '/src/html/project', '/src/html/veille']
        })
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'src/html/about.html'),
                exp: resolve(__dirname, 'src/html/exp.html'),
                legal: resolve(__dirname, 'src/html/legal.html'),
                project: resolve(__dirname, 'src/html/project.html'),
                veille: resolve(__dirname, 'src/html/veille.html'),
                404: resolve(__dirname, '404.html'),
            },
        },
    },
    server: {
        host: true,
        port: 3000,
        hmr: {
            clientPort: 3000,
        },
        watch: {
            usePolling: true,
        },
    },
});
