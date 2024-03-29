import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// createApp(App).mount('#app')
const app = createApp(App);

// if (import.meta.env.DEV) {
//   mount({});
// }

export function bootstrap(props) {
  return Promise.resolve().then(() => {
    // One-time initialization code goes here
    console.log("vite bootstrapped!");
  });
}

export function mount(props) {
  return Promise.resolve().then(() => {
    console.log("vite mounted!");
    // Do framework UI rendering here
    app.mount('#single-spa-application\\:\\@laboratory\\/vite')
  });
}

export function unmount(props) {
  return Promise.resolve().then(() => {
    // Do framework UI unrendering here
    console.log("vite unmounted!");
    app.unmount();
  });
}


// import './style.css'
// import { createApp, h } from 'vue'
// import App from './App.vue'
// import singleSpaVue from 'single-spa-vue'

// // createApp(App).mount('#app')

// const vueLifecycles = singleSpaVue({
//   createApp,
//   appOptions: {
//     render() {
//       return h(App, {
//         props: {
//           // single-spa props are available on the "this" object. Forward them to your component as needed.
//           // https://single-spa.js.org/docs/building-applications#lifecyle-props
//           name: this.name
//         },
//       });
//     },
//   },
//   handleInstance: (app) => {
//     // app.use(router);
//   }
// });
// export const bootstrap = vueLifecycles.bootstrap;
// export const mount = vueLifecycles.mount;
// export const unmount = vueLifecycles.unmount;