const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "laboratory";
  const projectName = "business";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName,
    webpackConfigEnv,
    argv,
    outputSystemJS: false,
  });

  // 模块联邦要设置 externals 为 undefined，否则会报错
  defaultConfig.externals = undefined;

  defaultConfig.devtool = webpackConfigEnv.mode === "development" ? "source-map" : false;

  console.log("defaultConfig", defaultConfig);
  return merge(defaultConfig, {
    devServer: {
      port: 9003,
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
            requiredVersion: false,
            import: false,
          },
          'react-dom': { 
            singleton: true,
            requiredVersion: false,
            import: false,
          },
          moment: { 
            singleton: true,
            requiredVersion: false,
            import: false,
          },
          lodash: { 
            singleton: true,
            requiredVersion: false,
            import: false,
          }
        },
      }),
    ],
  });
};
