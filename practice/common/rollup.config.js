// Bases
import { glob } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Plugins
import { loadEnv } from './env-loader.js';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import { rimraf } from 'rimraf';
import copy from 'rollup-plugin-copy';
import serve from 'rollup-plugin-serve';

// check if the mode is development
const isDevelopment = process.env.mode === 'development';
// the output dir
const outputDir = 'dist';
// load environment variables
const env = loadEnv(process.env.mode, process.cwd());
// entry files
const inputs = Object.fromEntries(
  glob
    .sync('src/**/*.{ts,css}')
    .map(file => [
      path.relative('src', file.slice(0, file.length - path.extname(file).length)),
      fileURLToPath(new URL(file, import.meta.url))
    ])
);

export default {
  input: inputs,
  output: [
    {
      format: 'es',
      dir: outputDir
    }
  ],
  preserveEntrySignatures: 'allow-extension',
  external: [/^@laboratory\//],
  watch: {
    buildDelay: 1000,
    clearScreen: false,
    include: 'src/**',
    exclude: 'node_modules/**'
  },
  plugins: [
    // transpile typescript
    typescript({
      compilerOptions: {
        outDir: outputDir
      }
    }),

    // resolve node_modules
    nodeResolve(),

    // transpile to es5
    babel({ babelHelpers: 'bundled' }),

    // replaces targeted strings in files while bundling.
    replace({
      preventAssignment: true,
      __PUBLIC_PATH: JSON.stringify(env.PUBLIC_PATH)
    }),

    // minified bundle without html.
    isDevelopment ? null : terser(),

    // clear output directory.
    clear(outputDir),

    // copy public directory to output directory.
    copy({
      targets: [{ src: 'public/*', dest: outputDir }]
    }),

    // start dev server.
    isDevelopment
      ? serve({
          port: Number(env.PORT),
          // Multiple folders to serve from
          contentBase: [outputDir],
          // set headers
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          // execute function after server has begun listening
          onListening: function (server) {
            const address = server.address();
            const host = address.address === '::' ? 'localhost' : address.address;
            // by using a bound function, we can access options as `this`
            const protocol = this.https ? 'https' : 'http';
            console.log(`Server listening at ${protocol}://${host}:${address.port}/`);
            console.log(`Open with ${protocol}://${host}:${address.port}/laboratory-common.js`);
          }
        })
      : null
  ]
};

/**
 * clear output directory
 * @param {string|string[]} paths
 */
function clear(paths = 'dist') {
  return {
    name: 'clear',
    buildStart() {
      rimraf(paths);
    }
  };
}
