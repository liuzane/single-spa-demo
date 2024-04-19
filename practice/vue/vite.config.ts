// Bases
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import externalize from "vite-plugin-externalize-dependencies";
import path from "path";

// Types
import type { ConfigEnv, UserConfig } from "vite";
// import type { OutputOptions, OutputBundle, OutputChunk } from "rollup";

export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  const outputDir: string = 'dist';
  // Load environment variables
  const env: Record<string, string> = loadEnv(mode, process.cwd(), '');
  const port: number = Number(env.VITE_PORT);
  const host: string = env.VITE_DEPLOY_ORIGIN.replace(/^https?:\/\/|:\d{4,6}$/g, '');
  const origin: string = `${env.VITE_DEPLOY_ORIGIN}${env.VITE_PUBLIC_PATH}`;

  return {
    define: {
      __dirname: command === 'serve' ? JSON.stringify(__dirname.split(path.sep).join(path.posix.sep)) : '""'
    },
    build: {
      outDir: outputDir,
      manifest: true,
      rollupOptions: {
        external: /^@laboratory\//,
        input: 'src/laboratory-vue.ts',
        output: {
          entryFileNames: '[name].js',
          // assetFileNames: '[name].[ext]'
          chunkFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        },
        preserveEntrySignatures: 'strict',
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
      externalize({ externals: ['@laboratory/common', '@laboratory/manifest-loader'] })
    ],
    experimental: {
      // More detail see here: https://cn.vitejs.dev/guide/build.html#advanced-base-options
      renderBuiltUrl(filename: string) {
        return `${origin}/${filename}`;
      }
    }
  }
});
