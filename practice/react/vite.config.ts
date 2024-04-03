// Bases
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
// import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// Types
import type { ConfigEnv, UserConfig, Plugin } from "vite";
// import type { OutputOptions, OutputBundle, OutputChunk } from "rollup";

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // Load environment variables
  const env: Record<string, string> = loadEnv(mode, process.cwd(), "");
  const port: number = Number(env.VITE_PORT);
  const host: string = env.VITE_DEPLOY_ORIGIN.replace(
    /^https?:\/\/|:\d{4,6}$/g,
    ""
  );
  const outputDir: string = "dist";

  return {
    build: {
      outDir: outputDir,
      rollupOptions: {
        preserveEntrySignatures: "allow-extension",
        input: "src/laboratory-react.tsx",
        output: {
          entryFileNames: "[name].js",
          // assetFileNames: '[name].[ext]'
          chunkFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
    },
    server: {
      port,
      open: false,
      host,
      // Defines the origin of the generated asset URLs during development.
      origin: env.VITE_DEPLOY_ORIGIN,
    },
    plugins: [
      react(),
      // cssInjectedByJsPlugin({
      //   relativeCSSInjection: true,
      //   suppressUnusedCssWarning: true,
      //   jsAssetsFilterFunction: (entry) => entry.name === 'laboratory-react',
      // })
      myPlugin(),
    ],
    experimental: {
      // More detail see here: https://cn.vitejs.dev/guide/build.html#advanced-base-options
      renderBuiltUrl(filename: string, { type }) {
        console.log("filename:", filename, type);
        return `${env.VITE_DEPLOY_ORIGIN}${env.VITE_PUBLIC_PATH}/${filename}`;
        // if (type === 'public') {
        //   return `${env.VITE_DEPLOY_ORIGIN}${env.VITE_PUBLIC_PATH}/${filename}`;
        // } else {
        //   return filename;
        // }
      },
    },
  };
});

function myPlugin(): Plugin {
  return {
    name: "my-plugin",
    transform(code: string, id: string) {
      console.log('id: ', id);
      if (this.getModuleInfo(id)?.isEntry) {
        console.log('code: ', code);
        console.log('module: ', this.getModuleInfo(id));
      }
      return {
        code,
        map: null,
      };
    },
    // generateBundle(_options: OutputOptions, bundle: OutputBundle, _isWrite: boolean) {
    //   console.log('bundle', bundle);
    //   const entryFileName = Object.keys(bundle).find((fileName) => bundle[fileName].type == 'chunk' && (bundle[fileName] as OutputChunk).isEntry);
    //   if (entryFileName && bundle[entryFileName]) {
    //     const entryCssFileName = Object.keys(bundle).find((fileName) => bundle[fileName].type == 'asset' && bundle[fileName].name === entryFileName.replace(/\.js$/, '.css'));
    //     (bundle[entryFileName] as OutputChunk).code += `import('${entryCssFileName}')`;
    //   }
    // }
  };
}
