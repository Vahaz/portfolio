import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import Sitemap from 'vite-plugin-sitemap';

const vercelRewrites = () => ({
    name: 'vercel-rewrites',
    configureServer(server) {
        server.middlewares.use((req, res, next) => {
            const rewrites = {
                '/study': '/src/html/study.html',
                '/exp': '/src/html/exp.html',
                '/compt': '/src/html/compt.html',
                '/legal': '/src/html/legal.html',
                '/project': '/src/html/project.html',
                '/veille': '/src/html/veille.html'
            };

            if (rewrites[req.url]) {
                req.url = rewrites[req.url];
            }
            next();
        });
    }
});

export default defineConfig({
    base: '/',
    plugins: [
        tailwindcss(),
        Sitemap({
            hostname: 'https://valentinhrnd.fr',
            dynamicRoutes: ['/study', '/exp', '/compt', '/legal', '/project', '/veille']
        }),
        vercelRewrites()
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                study: resolve(__dirname, 'src/html/study.html'),
                compt: resolve(__dirname, 'src/html/compt.html'),
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
