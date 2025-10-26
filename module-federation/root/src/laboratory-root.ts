import { registerApplication, start } from "single-spa";
// @ts-ignore
// import React from "react";
// console.log("start", start);
// console.log("React", React);

import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";
import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import _ from "lodash";

console.log("React", React);
console.log("ReactDOM", ReactDOM);
console.log("moment", moment);
console.log("lodash", _);

// import type { LifeCycles } from "single-spa";


const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    // return System.import<LifeCycles>(name);
    // webpackIgnore: true 它的作用是 告诉 Webpack 忽略对这个导入语句的处理，让模块保持原样，不经过 Webpack 的打包流程。
    return import(/* webpackIgnore: true */ name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
