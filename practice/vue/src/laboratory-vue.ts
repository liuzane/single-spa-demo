// Bases
// import 'vite/modulepreload-polyfill';
import { createApp } from 'vue';

// Plugins
import { router } from './router';
import { ManifestLoader } from '@laboratory/manifest-loader';

// Enums
import { ModeEnum } from '@laboratory/manifest-loader';

// Types
import type { App as IApp } from 'vue';
import type { ManifestLoader as IManifestLoader } from '@laboratory/manifest-loader';

// Styles
import './styles/style.css';
import './styles/tailwind.css';

import App from './App.vue';

// Variables
let manifestLoader: IManifestLoader;
let app: IApp;

export function bootstrap() {
  return Promise.resolve().then(() => {
    // One-time initialization code goes here
    console.log('vue bootstrapped!');
    manifestLoader = new ManifestLoader({
      mode: import.meta.env.MODE as ModeEnum,
      origin: import.meta.env.VITE_DEPLOY_ORIGIN + import.meta.env.VITE_PUBLIC_PATH,
      dirname: __dirname,
      ignoreEntryFile: true
    });
  });
}

export function mount() {
  return Promise.resolve().then(() => {
    console.log('vue mounted!');
    // Do framework UI rendering here
    manifestLoader.mount();
    app = createApp(App);
    // For each app instance, mount() can only be called once.
    app.use(router).mount('#single-spa-application\\:vue');
    console.log('manifestLoader:', manifestLoader);
    console.log('import.meta:', import.meta);
    console.log('import.meta.env:', import.meta.env);
    console.log('import.meta.url:', import.meta.url);
    console.log('__dirname:', __dirname);
    // console.log('url:', new URL('./static/css', import.meta.url));
  });
}

export function unmount() {
  return Promise.resolve().then(() => {
    // Do framework UI unrendering here
    console.log('vue unmounted!');
    manifestLoader.unmount();
    app.unmount();
  });
}