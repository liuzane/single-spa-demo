// Bases
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue';

// Types
import type { ConfigEnv, UserConfig } from 'vite';

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env: ViteEnv = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': {
        NODE_ENV: mode
      }
    },
    // 开发服务器选项
    server: {
      // 指定开发服务器端口
      port: env.VITE_PORT,
      // 开发服务器启动时，自动在浏览器中打开应用程序
      open: false,
      // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
      host: 'localhost',
      // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
      // proxy: {}
      origin: 'http://localhost:9004',
    },
    build: {
      rollupOptions: {
        preserveEntrySignatures: 'allow-extension',
        input: 'src/main.ts',
        output: {
          entryFileNames: '[name].js',
          assetFileNames: '[name][extname]'
          // format: 'system'
          // format: 'umd'
        }
      },
    },
    plugins: [
      vue({
        template: {
          transformAssetUrls: {
            base: '/src'
          }
        }
      }),
      splitVendorChunkPlugin()
    ],
    experimental: {
      renderBuiltUrl(filename: string, { hostId, hostType, type }: { hostId: string, hostType: 'js' | 'css' | 'html', type: 'public' | 'asset' }) {
        console
        if (type === 'public') {
          return 'http://localhost:9004/dist/' + filename;
        } else {
          return filename;
        }
      }
    }
  }
});