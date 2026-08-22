import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const isDemo = mode === 'demo';

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    build: isDemo
      ? {
        // Vercel / Demo Website ke liye normal build config
        outDir: 'dist',
      }
      : {
        // NPM package ke liye Library build config (Aapka maujooda config)
        lib: {
          entry: resolve(__dirname, 'src/index.ts'), // Aapka library entry point
          name: 'EaseUI',
          fileName: (format) => `easeui.${format}.js`,
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
        outDir: 'dist',
      },
  };
});
