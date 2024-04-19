import { add as lc } from '@laboratory/common';

export function bootstrap() {
  return Promise.resolve().then(() => {
    // One-time initialization code goes here
    console.log('platform bootstrapped!');
  });
}

export function mount() {
  return Promise.resolve().then(() => {
    console.log('platform mounted!');
    console.log('platform add1', lc(1, 2));
  });
}

export function unmount() {
  return Promise.resolve().then(() => {
    // Do framework UI unrendering here
    console.log('platform unmounted!');
  });
}