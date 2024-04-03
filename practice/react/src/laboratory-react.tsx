import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Styles
// import './styles/index.css';
// import './styles/tailwind.css';

let root: ReactDOM.Root | null = null;

export function bootstrap() {
  return Promise.resolve().then(() => {
    // One-time initialization code goes here
    console.log('react bootstrapped!');
    
  });
}

export function mount() {
  return Promise.resolve().then(() => {
    console.log('react mounted!', root);

    // Styles
    import('./styles/index.css');
    import('./App.css');
    import('./styles/tailwind.css');

    root = ReactDOM.createRoot(document.getElementById('single-spa-application:react')!);
    if (root) {
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      );
    }
    console.log('import.meta:', import.meta);
  });
}

export function unmount() {
  return Promise.resolve().then(() => {
    // Do framework UI unrendering here
    console.log('react unmounted!');
    if (root) {
      root.unmount();
    }
  });
}