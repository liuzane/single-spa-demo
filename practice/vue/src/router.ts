import { createMemoryHistory, createRouter } from 'vue-router';

const routes = [
  { path: '/', component: () => import('./Home.vue') },
  { path: '/foo', component: () => import('./components/Foo.vue') },
  { path: '/bar', component: () => import('./components/Bar.vue') },
]

export const router = createRouter({
  history: createMemoryHistory('/#/vue'),
  routes,
});

router.beforeEach((to, from) => {
  // ...
  // explicitly return false to cancel the navigation
  console.log('to', to);
  console.log('from', from);
  // history.replaceState(null, `/#/vue${from.path}`, `/#/vue${to.path}`);
  return true
})