const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "laboratory",
    projectName: "vue",
    webpackConfigEnv,
    argv,
  });

  defaultConfig.externals = [ /^@laboratory\// ];

  return merge(defaultConfig, {
    devServer: {
      port: 9005
    }
    // modify the webpack config however you'd like to by adding to this object
  });
};
