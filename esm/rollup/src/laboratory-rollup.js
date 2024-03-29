console.log('The registered rollup application has been loaded!');

export function bootstrap(props) {
  return Promise.resolve().then(() => {
    // One-time initialization code goes here
    console.log('rollup bootstrapped!');
  });
}

export function mount(props) {
  return Promise.resolve().then(() => {
    console.log('rollup mounted!');
    document.getElementById('single-spa-application:@laboratory/rollup').innerHTML = '@laboratory/rollup is mounted!'
    // Do framework UI rendering here
  });
}

export function unmount(props) {
  return Promise.resolve().then(() => {
    // Do framework UI unrendering here
    console.log('rollup unmounted!');
  });
}