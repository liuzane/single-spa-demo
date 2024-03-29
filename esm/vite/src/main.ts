import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

let app: any = null;

export function bootstrap(props) {
  return Promise.resolve().then(() => {
    // One-time initialization code goes here
    app = createApp(App);
    console.log('vite bootstrapped!');
  });
}

export function mount(props) {
  return Promise.resolve().then(() => {
    console.log('vite mounted!');
    // Do framework UI rendering here
    app.mount('#single-spa-application\\:\\@laboratory\\/vite')
  });
}

export function unmount(props) {
  return Promise.resolve().then(() => {
    // Do framework UI unrendering here
    console.log('vite unmounted!');
    app.unmount();
  });
}