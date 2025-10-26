import React from "react";
import ReactDOMClient from "react-dom/client";
import Root from "./root.component";

console.log("React", React);
console.log("ReactDOMClient", ReactDOMClient);

export function bootstrap() {
  return Promise.resolve().then(() => {
    console.log('base bootstrapped!');
  });
}

export function mount() {
  return Promise.resolve().then(() => {
    console.log('base mounted!');
    console.log('Root', Root);
  });
}

export function unmount() {
  return Promise.resolve().then(() => {
    console.log('base unmounted!');
  });
}
