/* eslint-disable */
console.log("The registered vue application has been loaded!");

export function bootstrap(props) {
  return Promise.resolve().then(() => {
    // One-time initialization code goes here
    console.log("vue bootstrapped!");
  });
}

export function mount(props) {
  return Promise.resolve().then(() => {
    console.log("vue mounted!");
    document.getElementById('single-spa-application:@laboratory/vue').innerHTML = '@laboratory/vue is mounted!'
    // loadScript('http://localhost:9005/js/app.js')
    // Do framework UI rendering here
    // createApp(App).mount('#single-spa-application:@laboratory/vue');
  });
}

export function unmount(props) {
  return Promise.resolve().then(() => {
    // Do framework UI unrendering here
    console.log("vue unmounted!");
  });
}

function loadScript(url) {
  const script = document.createElement('script');
  script.type = 'module'
  script.setAttribute('crossorigin')
  script.setAttribute('defer')
  script.src = url
  document.head.appendChild(script)
}