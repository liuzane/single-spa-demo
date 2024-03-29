import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import html from '@rollup/plugin-html';
import ejs from 'ejs';
import serve from 'rollup-plugin-serve';
import terser from '@rollup/plugin-terser';
import { rimraf } from 'rimraf';
import copy from 'rollup-plugin-copy';

const isDevelopment = process.env.mode === 'development';
const outputDir = 'dist';

export default {
  input: ['src/laboratory-root.ts'],
  output: [
    {
      format: 'es',
      entryFileNames: '[name].esm.js',
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

    // generate html file.
    html({
      title: 'Laboratory Root',
      publicPath: isDevelopment ? '/' : '/laboratory',
      // The template args details see here: https://www.npmjs.com/package/@rollup/plugin-html#template
      template: async ({ attributes, files, publicPath, title }) => {
        const html = await ejs.renderFile('./src/template.ejs', {
          isLocal: isDevelopment,
          files: files.js,
          attributes,
          publicPath,
          title
        });
        return html;
      }
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
    isDevelopment ? serve({
      port: 9000,
      // Multiple folders to serve from
      contentBase: [outputDir],
      historyApiFallback: '/index.html',
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
        console.log(`Open with ${protocol}://${host}:${address.port}/laboratory-rollup.esm.js`);
      }
    }) : null
  ]
}

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
  }
};