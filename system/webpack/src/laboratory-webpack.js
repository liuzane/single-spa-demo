console.log("The registered webpack application has been loaded!");

export function bootstrap(props) {
  return Promise.resolve().then(() => {
    // One-time initialization code goes here
    console.log("webpack bootstrapped!");
  });
}

export function mount(props) {
  return Promise.resolve().then(() => {
    console.log("webpack mounted!");
    document.getElementById('single-spa-application:@laboratory/webpack').innerHTML = '@laboratory/webpack is mounted!'
    // Do framework UI rendering here
  });
}

export function unmount(props) {
  return Promise.resolve().then(() => {
    // Do framework UI unrendering here
    console.log("webpack unmounted!");
  });
}