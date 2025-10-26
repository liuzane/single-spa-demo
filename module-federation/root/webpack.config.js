const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require('./package.json').dependencies;

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "laboratory";
  const projectName = "root";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName,
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
    outputSystemJS: false,
  });

  return merge(defaultConfig, {
    devServer: {
      port: 9000,
    },
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),

      // 模块联邦配置
      new ModuleFederationPlugin({
        // 这个应用的名称，是其他应用引用它的标识
        name: projectName,
        // 暴露给外部使用的模块清单文件，文件名通常固定为 `remoteEntry.js`
        // Host 会先加载这个文件，才知道 Remote 暴露了哪些模块
        filename: 'remoteEntry.js',
        // 定义哪些模块可以被其他应用使用
        exposes: {
          // 键：导入路径，Host 应用将通过这个路径来导入
          // 值：当前应用内部的模块路径
          './some-exposes': './src/some-exposes.ts',
        },
        // 定义共享的库
        // 这样可以确保 Host 和 Remote 使用同一个版本的库实例，避免重复加载
        shared: {
          // 配置共享库的信息
          react: { 
            singleton: true, // 确保整个应用只使用一个实例
            eager: true, // 延迟加载，Host 应用需要时才加载
            requiredVersion: deps.react, // 指定所需的版本
            shareKey: 'react',
            shareScope: 'default',
            import: undefined,
          },
          'react-dom': { 
            singleton: true, 
            eager: true,
            requiredVersion: deps['react-dom'], // 指定所需的版本
            shareKey: 'react-dom',
            shareScope: 'default',
            import: undefined,
          },
          moment: {
            singleton: true,
            eager: true,
            requiredVersion: deps.moment, // 指定所需的版本
            shareKey: 'moment',
            shareScope: 'default',
            import: undefined,
          },
          lodash: {
            singleton: true,
            eager: true,
            requiredVersion: deps.lodash, // 指定所需的版本
            shareKey: 'lodash',
            shareScope: 'default',
            import: undefined,
          }
        },
      }),
    ],
  });
};
