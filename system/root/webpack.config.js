const path = require('path');
// import { merge } from 'webpack-merge';
// import singleSpaDefaults from 'webpack-config-single-spa-ts';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// const { ProvidePlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const orgName = 'laboratory';
const projectName = 'root';
module.exports = (env, { mode }) => {
  const isProduction = mode === 'production';
  return {
    entry: {
      index: {
        import: './src/index.ts',
        filename: 'index.js',
        library: {
          type: 'umd',
          umdNamedDefine: true,
        },
      },
      system: {
        import: `./src/${orgName}-${projectName}`,
        filename: `${orgName}-${projectName}.js`,
        library: {
          type: 'system'
        },
        dependOn: 'index',
      }
    },
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      uniqueName: orgName,
      devtoolNamespace: projectName,
      publicPath: '',
    },
    optimization: {
      runtimeChunk: 'single',
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader', { paths: [__dirname] }),
          },
        },
        {
          test: /\.css$/i,
          include: [/node_modules/, /src/],
          exclude: [/\.module\.css$/],
          use: [
            {
              loader: require.resolve('style-loader', { paths: [__dirname] }),
            },
            {
              loader: require.resolve('css-loader', { paths: [__dirname] }),
              options: {
                modules: false,
              },
            },
          ],
        },
        {
          test: /\.module\.css$/i,
          exclude: [/node_modules/],
          use: [
            {
              loader: require.resolve('style-loader', { paths: [__dirname] }),
            },
            {
              loader: require.resolve('css-loader', { paths: [__dirname] }),
              options: {
                modules: true,
              },
            },
          ],
        },
        {
          test: /\.(bmp|png|jpg|jpeg|gif|webp)$/i,
          exclude: /node_modules/,
          type: 'asset/resource',
        },
        // svg has its own loader to allow easier overriding (eg. svg-loader for React components)
        {
          test: /\.svg$/i,
          exclude: /node_modules/,
          type: 'asset/resource',
        },
        {
          test: /\.html$/i,
          exclude: [/node_modules/, /\.vue\.html$/],
          type: 'asset/source',
        },
        // {
        //   test: require.resolve('systemjs'),
        //   loader: 'expose-loader',
        //   options: {
        //     exposes: {
        //       globalName: 'window.System',
        //       moduleLocalName: 'System',
        //     },
        //   },
        // }
        // {
        //   test: require.resolve('systemjs'),
        //   loader: 'exports-loader',
        //   options: {
        //     type: 'commonjs',
        //     exports: 'single System',
        //   },
        // }
      ],
    },
    devtool: isProduction ? false : 'source-map',
    devServer: {
      port: 9000,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      client: {
        webSocketURL: {
          hostname: 'localhost',
        },
      },
      allowedHosts: 'all',
    },
    // externals: [new RegExp(`^@${orgName}/`)],
    plugins: [
      // new ProvidePlugin({
      //   SystemJS: 'systemjs'
      // }),
      new BundleAnalyzerPlugin({
        analyzerMode: env.analyze ? 'server' : 'disabled',
      }),
      new HtmlWebpackPlugin({
        // inject: false,
        template: 'src/index.ejs',
        templateParameters: {
          isLocal: !isProduction
        },
        chunks: ['index', 'system']
      }),
    ],
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.json'],
    },
  };
};
