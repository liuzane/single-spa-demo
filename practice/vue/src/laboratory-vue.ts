import { createApp } from 'vue';
// import style from './style.css?inline';

// Styles
// import './styles/style.css';
// import './styles/tailwind.css';

import { router } from './router';
import App from './App.vue';

const href = new URL('./static/css', import.meta.url).href;
let app: any = null;
let stylesheets: any = []
// let styleIds: number[] = [];

export function bootstrap() {
  return Promise.resolve().then(() => {
    // One-time initialization code goes here
    console.log('vue bootstrapped!');
  });
}

export function mount() {
  return Promise.resolve().then(() => {
    console.log('vue mounted!', stylesheets);
    // Do framework UI rendering here
    if (stylesheets.length > 0) {
      stylesheets.forEach((element: any) => document.head.appendChild(element));
    }

    // Styles
    import('./styles/style.css');
    import('./styles/tailwind.css');
    
    app = createApp(App);
    // For each app instance, mount() can only be called once.
    app.use(router).mount('#single-spa-application\\:vue');

    // import('./style.css');
    // stylecss.then((module) => {
    //   console.log('module:', module);
    // });
    // console.log('stylecss:', stylecss);
    // console.log('tailwindcss:', tailwindcss);
    console.log('window.location:', window.location);
    console.log('import.meta:', import.meta);
    console.log('import.meta.env:', import.meta.env);
    // console.log('url:', new URL('./static/css', import.meta.url));
    // styleIds.push(loadStyleFile(style));
  });
}

export function unmount() {
  return Promise.resolve().then(() => {
    // Do framework UI unrendering here
    console.log('vue unmounted!');
    switch (import.meta.env.MODE) {
      case 'development':
        stylesheets = document.querySelectorAll(`style[type="text/css"][data-vite-dev-id]`);
        break;
      
      case 'production':
        stylesheets = document.querySelectorAll(`link[rel="stylesheet"][href^="${href}"][href$=".css"]`);
        break;
    }
    console.log('href:', href);
    console.log('stylesheets:', stylesheets);
    stylesheets.forEach((element: any) => element.remove());
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