import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import fs from 'fs';
import path from 'path';

const isDevelopment = process.env.mode === 'development';
const outputDir = 'dist';

export default {
  input: ['src/index.ts'],
  output: [
    {
      format: 'es',
      entryFileNames: 'esm/[name].js',
      dir: outputDir
    },
    {
      format: 'cjs',
      entryFileNames: 'cjs/[name].js',
      dir: outputDir
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
    // transpile typescript
    typescript({
      compilerOptions: {
        outDir: `${outputDir}/typings`
      }
    }),

    // transpile to es5
    babel({ babelHelpers: 'bundled' }),

    // minified bundle without html.
    isDevelopment ? null : terser(),

    // clear output directory.
    clear(outputDir),

    // write output package.json.
    writePackage(outputDir)
  ]
};

/**
 * clear output directory
 * @param {string|string[]} paths
 */
function clear(paths) {
  return {
    name: 'clear',
    buildStart() {
      const options = {
        force: true,
        recursive: true
      };
      try {
        if (paths instanceof Array) {
          paths.forEach(p => {
            fs.rmSync(p, options);
          });
        } else {
          fs.rmSync(paths, options);
        }
      } catch (error) {
        console.error('clear plugin: ', error);
      }
    }
  };
}

/**
 * write output package.json
 * @param {string|string[]} paths
 */
function writePackage(outputDir) {
  return {
    name: 'write-package',
    closeBundle() {
      try {
        const packageString = fs.readFileSync('./package.json', 'utf8');
        const packageJson = JSON.parse(packageString);
        delete packageJson.type;
        delete packageJson.scripts;
        delete packageJson.devDependencies;
        fs.writeFileSync(
          path.join(path.resolve(), `${outputDir}/package.json`),
          JSON.stringify(packageJson, null, 2),
          'utf8'
        );
      } catch (error) {
        console.error('write-package plugin: ', error);
      }
    }
  };
}
