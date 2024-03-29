import 'vite/modulepreload-polyfill';
import { createApp } from 'vue';
// import style from './style.css?inline';
import './style.css';
import { router } from './router';
import App from './App.vue';

let app: any = null;
// let styleIds: number[] = [];

export function bootstrap() {
  return Promise.resolve().then(() => {
    // One-time initialization code goes here
    console.log('vue bootstrapped!');
  });
}

export function mount() {
  return Promise.resolve().then(() => {
    console.log('vue mounted!');
    // Do framework UI rendering here
    app = createApp(App);
    // For each app instance, mount() can only be called once.
    app.use(router).mount('#single-spa-application\\:vue');
    // import('./style.css');
    // style().then((res) => {
    //   console.log('style:', style);
    // });
    // console.log('style:', style);
    console.log('import.meta:', import.meta);
    // styleIds.push(loadStyleFile(style));
  });
}

export function unmount() {
  return Promise.resolve().then(() => {
    // Do framework UI unrendering here
    console.log('vue unmounted!');
    app.unmount();
    // styleIds.forEach((id) => {
    //   unloadStyleFileById(id);
    // });
    // styleIds = [];
  });
}

// function loadStyleFile(fileContent: string): number {
//   const style: HTMLStyleElement = document.createElement('style');
//   const id = Math.floor(Math.random() * 1000);
//   style.setAttribute('data-id', id.toString());
//   style.textContent = fileContent;
//   document.head.appendChild(style);
//   return id;
// }

// function unloadStyleFileById(id: number) {
//   const style: HTMLStyleElement | null = document.querySelector('style[data-id="' + id + '"]');
//   if (style) {
//     document.head.removeChild(style);
//   }
// }