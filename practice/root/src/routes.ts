// Types
import type { RoutesConfig } from 'single-spa-layout/dist/types/isomorphic/constructRoutes.d.ts';

const applications: { path: string; name: string }[] = [
  // { path: '/', name: 'common' },
  { path: '/vue', name: 'vue' },
  { path: '/react', name: 'react' },
  { path: '/platform', name: 'platform' }
];

export const routesConfig: RoutesConfig = {
  mode: 'hash',
  base: '/',
  disableWarnings: false,
  containerEl: 'main',
  routes: applications.map(application => ({
    type: 'route',
    path: application.path,
    routes: [
      {
        type: 'application',
        name: application.name
      }
    ]
  }))
};
