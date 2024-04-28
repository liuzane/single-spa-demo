import { createRouter, createWebHashHistory } from "vue-router";

const baseURL: string = "/vue";

const routes = [
  { path: baseURL + "/", name: "Home", component: () => import("./Home.vue") },
  {
    path: baseURL + "/foo",
    name: "Foo",
    component: () => import("./components/Foo.vue"),
  },
  {
    path: baseURL + "/bar",
    name: "Bar",
    component: () => import("./components/Bar.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach(async (to, from) => {
//   // const realPath: string = window.location.hash.replace(/^#\/vue/g, '');

//   console.log('to', to);
//   console.log('from', from);
//   // console.log('window.location', window.location);
//   console.log('resolve', router.resolve(to.path));
//   // console.log('realPath', realPath);
//   // Manually change the path when the browser has a path and vue router is not triggered.
//   // if (!from.name && to.path === '/' && realPath.length > 0 && realPath !== to.path) {
//   //   historyReplaceState(from.path, realPath);
//   //   return realPath;
//   // }

//   // ...
//   // explicitly return false to cancel the navigation
//   // historyReplaceState(from.path, to.path);
//   if (router.resolve(to.path).matched.length === 0) {
//     return false;
//   } else {
//     return true;
//   }
// });

// function historyReplaceState(fromPath: string, toPath: string) {
//   history.pushState(null, baseURL + fromPath, baseURL + toPath);
// }
