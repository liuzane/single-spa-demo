const { defineConfig } = require('@vue/cli-service')
const singleSpaDefaults = require("webpack-config-single-spa");

const defaultConfig = singleSpaDefaults({
  orgName: "labortory",
  projectName: "vue"
});

delete defaultConfig.output.publicPath

const config = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 9005,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: config => {
    console.log(config)
    return {
      devtool: false,
      entry: {
        'laboratory-vue': './src/laboratory-vue.js'
      },
      output: {
        libraryTarget: 'system'
      }
    }
  }
})

module.exports = config
