const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "laboratory";
  const projectName = "base";
  
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName,
    webpackConfigEnv,
    argv,
    outputSystemJS: false,
  });

  // 模块联邦要设置 externals 为 undefined，否则会报错
  defaultConfig.externals = undefined;

  return merge(defaultConfig, {
    devServer: {
      port: 9002,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: projectName,
        remotes: {
          // 引用远程应用 root
          root: 'root@http://localhost:9000/remoteEntry.js', // 假设 root-app 运行在9000端口
        },
        shared: {
          // 声明共享的依赖，配置尽量与远程应用一致
          react: { 
            singleton: true,
            requiredVersion: '^18.0.0'
          },
          'react-dom': { 
            singleton: true,
            requiredVersion: '^18.0.0'
          },
          'react-dom/client': { 
            singleton: true,
            requiredVersion: '^18.0.0'
          },
          moment: { 
            singleton: true,
            requiredVersion: '^2.0.0'
          },
          lodash: { 
            singleton: true,
            requiredVersion: '^4.0.0'
          }
        },
      }),
    ],
  });
};
