import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import terser from '@rollup/plugin-terser';
import { rimraf } from 'rimraf';
import copy from 'rollup-plugin-copy';
import { glob } from 'glob';

const isDevelopment = process.env.mode === 'development';
const outputDir = 'dist';

export default {
  input: glob.sync('src/**/*.{ts,css}'),
  output: [
    {
      format: 'es',
      entryFileNames: '[name].js',
      assetFileNames: '[name][extname]',
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
          port: 9003,
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
