console.log('The registered rollup application has been loaded!');

export function bootstrap(props) {
  return Promise.resolve().then(() => {
    console.log('rollup bootstrapped!');
  });
}

export function mount(props) {
  return Promise.resolve().then(() => {
    console.log('rollup mounted!');
    document.getElementById('single-spa-application:@laboratory/rollup').innerHTML = '@laboratory/rollup is mounted!'
  });
}

export function unmount(props) {
  return Promise.resolve().then(() => {
    console.log('rollup unmounted!');
  });
}