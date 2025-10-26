import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';

const isDevelopment = process.env.mode === 'development';

export default {
  input: 'src/laboratory-rollup.js',
  output: [
    {
      format: 'es',
      entryFileNames: '[name].js',
      assetFileNames: '[name][extname]',
      dir: 'dist'
    }
  ],
  preserveEntrySignatures: 'allow-extension',
  watch: {
    buildDelay: 1000,
    clearScreen: false,
    include: 'src/**',
    exclude: 'node_modules/**'
  },
  plugins: [
    babel({ babelHelpers: 'bundled' }),
    isDevelopment ? serve({
      port: 9007,
      // Multiple folders to serve from
      contentBase: ['dist'],
      //set headers
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
        console.log(`Open with ${protocol}://${host}:${address.port}/laboratory-rollup.js`);
      }
    }) : null
  ]
}