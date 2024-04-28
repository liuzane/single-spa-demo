// Bases
// import 'vite/modulepreload-polyfill';
import React from 'react';
import ReactDOM from 'react-dom/client';

// Plugins
import { ManifestLoader } from '@laboratory/manifest-loader';

// Enums
import { ModeEnum } from '@laboratory/manifest-loader';

// Types
import type { ManifestLoader as IManifestLoader } from '@laboratory/manifest-loader';

// Loading
import PageAnchor from '@laboratory/components/page-anchor.js';

// Styles
import './styles/index.css';
import './styles/tailwind.css';

import Router from './Router.tsx';

// Variables
let manifestLoader: IManifestLoader;
let root: ReactDOM.Root;

export function bootstrap() {
  return Promise.resolve().then(() => {
    // One-time initialization code goes here
    console.log('react bootstrapped!');
    manifestLoader = new ManifestLoader({
      mode: import.meta.env.MODE as ModeEnum,
      origin: import.meta.env.VITE_DEPLOY_ORIGIN + import.meta.env.VITE_PUBLIC_PATH,
      dirname: __dirname,
      ignoreEntryFile: true
    });
    PageAnchor.define();
  });
}

export function mount() {
  return Promise.resolve().then(() => {
    console.log('react mounted!');
    console.log('manifestLoader:', manifestLoader);
    manifestLoader.mount();
    root = ReactDOM.createRoot(document.getElementById('single-spa-application:react')!);
    root.render(
      <React.StrictMode>
        <Router />
      </React.StrictMode>,
    );
    console.log('import.meta:', import.meta);
  });
}

export function unmount() {
  return Promise.resolve().then(() => {
    // Do framework UI unrendering here
    console.log('react unmounted!');
    manifestLoader.unmount();
    root.unmount();
  });
}