// import React from "react";
// import ReactDOMClient from "react-dom/client";
// import singleSpaReact from "single-spa-react";
// import Root from "./root.component";

// const lifecycles = singleSpaReact({
//   React,
//   ReactDOMClient,
//   rootComponent: Root,
//   errorBoundary(err, info, props) {
//     // Customize the root error boundary for your microfrontend here.
//     return null;
//   },
// });

// export const { bootstrap, mount, unmount } = lifecycles;

export function bootstrap() {
  return Promise.resolve().then(() => {
    console.log('base bootstrapped!');
  });
}

export function mount() {
  return Promise.resolve().then(() => {
    console.log('base mounted!');
    import("./bootstrap");
  });
}

export function unmount() {
  return Promise.resolve().then(() => {
    console.log('base unmounted!');
  });
}