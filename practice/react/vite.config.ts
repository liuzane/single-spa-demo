// Bases
import { defineConfig, loadEnv } from 'vite';
import path from 'node:path';

// Types
import type { ConfigEnv, UserConfig } from 'vite';

// Plugins
import react from '@vitejs/plugin-react';
import externalize from 'vite-plugin-externalize-dependencies';

export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  // load environment variables
  const env: Record<string, string> = loadEnv(mode, process.cwd(), "");
  // the output dir
  const outputDir: string = 'dist';
  // dev server port
  const port: number = Number(env.VITE_PORT);
  // dev server host
  const host: string = env.VITE_DEPLOY_ORIGIN.replace(/^https?:\/\/|:\d{4,6}$/g, "");
  // static resource url origin
  const origin: string = `${env.VITE_DEPLOY_ORIGIN}${env.VITE_PUBLIC_PATH}`;
  // exclude modules outside the bundle
  const external: RegExp = /^@laboratory\//;
  // check if the OS is windows
  const isWindows: boolean = typeof process !== 'undefined' && process.platform === 'win32';

  return {
    define: {
      __dirname: isWindows && command === 'serve' ? JSON.stringify(path.posix.normalize(__dirname.split(path.sep).join(path.posix.sep))) : '""'
    },
    build: {
      outDir: outputDir,
      manifest: true,
      rollupOptions: {
        external,
        input: 'src/laboratory-react.tsx',
        output: {
          entryFileNames: '[name].js',
          // assetFileNames: '[name].[ext]'
          chunkFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
        preserveEntrySignatures: 'strict',
      },
    },
    server: {
      port,
      open: false,
      host,
      // Defines the origin of the generated asset URLs during development.
      origin,
    },
    plugins: [
      react(),
      externalize({ externals: [external] })
    ],
    experimental: {
      // More detail see here: https://cn.vitejs.dev/guide/build.html#advanced-base-options
      renderBuiltUrl(filename: string) {
        return `${origin}/${filename}`;
      }
    },
  };
});