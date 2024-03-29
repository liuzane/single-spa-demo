const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (env, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "laboratory",
    projectName: "common",
    webpackConfigEnv: {
      ...env,
      standalone: true // true: add "react" "react-dom" lib to build file, false: remove "react" "react-dom" lib to build file.
    },
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  });
};
