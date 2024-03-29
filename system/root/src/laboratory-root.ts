import { registerApplication, start, LifeCycles } from 'single-spa';

registerApplication({
  name: '@laboratory/common',
  app: () => System.import<LifeCycles>('@laboratory/common'),
  activeWhen: ['/'],
});

registerApplication({
  name: '@laboratory/react',
  app: () => System.import<LifeCycles>('@laboratory/react'),
  activeWhen: ['/react']
});

registerApplication({
  name: '@laboratory/vite',
  app: () => System.import<LifeCycles>('@laboratory/vite'),
  activeWhen: ['/vite']
});

registerApplication({
  name: '@laboratory/vue',
  app: () => System.import<LifeCycles>('@laboratory/vue'),
  activeWhen: ['/vue']
});

registerApplication({
  name: '@laboratory/nginx',
  app: () => System.import<LifeCycles>('@laboratory/nginx'),
  activeWhen: ['/nginx']
});

registerApplication({
  name: '@laboratory/webpack',
  app: () => System.import<LifeCycles>('@laboratory/webpack'),
  activeWhen: ['/webpack']
});

start({
  urlRerouteOnly: true,
});
