// Bases
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// Types
import type { ConfigEnv, UserConfig } from 'vite';

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // Load environment variables
  const env: Record<string, string> = loadEnv(mode, process.cwd(), '');
  const port: number = Number(env.VITE_PORT);
  const host: string = env.VITE_DEPLOY_ORIGIN.replace(/^https?:\/\/|:\d{4,6}$/g, '');
  const outputDir: string = 'dist';
  
  return {
    build: {
      outDir: outputDir,
      rollupOptions: {
        preserveEntrySignatures: 'allow-extension',
        input: 'src/laboratory-vue.ts',
        output: {
          entryFileNames: '[name].js',
          // assetFileNames: '[name].[ext]'
          chunkFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    server: {
      port,
      open: false,
      host,
      // Defines the origin of the generated asset URLs during development.
      origin: env.VITE_DEPLOY_ORIGIN,
    },
    plugins: [
      vue(),
      cssInjectedByJsPlugin({
        relativeCSSInjection: true,
        suppressUnusedCssWarning: true,
        jsAssetsFilterFunction: (entry) => entry.name === "laboratory-vue",
      })
    ],
    experimental: {
      // More detail see here: https://cn.vitejs.dev/guide/build.html#advanced-base-options
      renderBuiltUrl(filename: string, { type }) {
        console.log('filename:', filename, type);
        return `${env.VITE_DEPLOY_ORIGIN}${env.VITE_PUBLIC_PATH}/${filename}`;
        // if (type === 'public') {
        //   return `${env.VITE_DEPLOY_ORIGIN}${env.VITE_PUBLIC_PATH}/${filename}`;
        // } else {
        //   return filename;
        // }
      }
    }
  }
});