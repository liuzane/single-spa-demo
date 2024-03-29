const path = require('path');
const webpack = require("webpack");

module.exports = {
  mode: 'development',
  entry: {
    umd: {
      import: './src/laboratory-webpack.js',
      filename: 'laboratory-webpack.umd.js',
      library: {
        type: 'umd',
        umdNamedDefine: true,
      },
    },
    system: {
      import: './src/laboratory-webpack.js',
      filename: 'laboratory-webpack.system.js',
      library: {
        type: 'system'
      },
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    hot: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    port: 9006
  },
  // plugins: [
  //   // 模块热替换的插件
  //   new webpack.HotModuleReplacementPlugin(),
  // ]
};