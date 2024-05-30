import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                // changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
            '/socket.io': {
                target: 'http://localhost:3000',
                ws: true,
                secure: false,
            },
        },
    },
    resolve: {
        alias: [
            // 절대경로로 접근하기
            { find: '~/components', replacement: '/src/components' },
            { find: '~/lib', replacement: '/src/lib' },
            { find: '~/routers', replacement: '/src/routers' },
            { find: '~/routes', replacement: '/src/routes' },
            { find: '~/store', replacement: '/src/store' },
            { find: '~/public', replacement: '/public' },
        ],
    },
});
