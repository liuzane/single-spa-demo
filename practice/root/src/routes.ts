// Types
import type { RoutesConfig } from 'single-spa-layout/dist/types/isomorphic/constructRoutes.d.ts';

const applicationNames: string[] = ['common', 'vue', 'react', 'platform'];

export const routesConfig: RoutesConfig = {
  mode: 'hash',
  base: '/',
  disableWarnings: false,
  containerEl: 'main',
  routes: applicationNames.map(name => ({
    type: 'route',
    path: name,
    routes: [
      {
        type: 'application',
        name,
      },
    ],
  }))
};