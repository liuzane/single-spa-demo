import { registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from 'single-spa-layout';

const routesConfig = {
  mode: 'hash',
  base: '/',
  disableWarnings: false,
  routes: [
    {
      type: 'route',
      path: 'vite',
      routes: [
        {
          type: 'application',
          name: 'vite'
        }
      ],
    },
    {
      type: 'route',
      path: 'rollup',
      routes: [
        {
          type: 'application',
          name: 'rollup'
        }
      ],
    },
  ],
};

/**
 * The constructRoutes API transforms your Layout Definition into an opaque 'resolved routes' object. We call it 'opaque' because the shape of the object is irrelevant, as you will only use it when calling other APIs within single-spa-layout.
 * @param {object} routesConfig: Routes config is a JSON Layout Definition, an HTMLElement, or a parse5 HTML element. If it is an HTMLElement, it must be a <single-spa-router> element or a <template> that contains a single-spa-router element.
 * @param {object} [layoutData]: Layout data is an optionally provided object that defines props and loaders for HTML Layouts. You can omit it if using a JSON Layout or if you do not need to define props or loaders in your HTML Layout. The layoutData object should have top level properties props and loaders that are each objects. Each of those objects' keys is the name of a prop or loader and its corresponding value.
 * @returns {object[]} An opaque resolvedRoutes object. It is opaque because you will only use the object when calling other single-spa-layout APIs and do not need to read or modify the resolvedRoutes.
 */
const routes = constructRoutes(routesConfig);

/**
 * The constructApplications API transforms your resolvedRoutes into single-spa application registration objects. These application registration objects are then used to call singleSpa.registerApplication().
 * @param {object[]} routes: The opaque resolvedRoutes object returned from constructRoutes.
 * @param {function} loadApp: A function that is given an application object and must return a loading function.
 * @returns {object[]} an array of single-spa registration objects.
 */
const applications = constructApplications({
  routes,
  loadApp: ({ name }) => import(`@laboratory/${name}`)
});

/** foreach register applications */
applications.forEach(registerApplication);

/**
 * The constructLayoutEngine API transforms your resolvedRoutes and applications into a layoutEngine object. The layout engine is responsible for creating, destroying, and rearranging dom elements during route transitions.
 * @param {object[]} routes: The opaque resolvedRoutes object returned from constructRoutes.
 * @param {object[]} applications: The array of application registration objects returned from constructApplications.
 * @param {boolean} [active]: A boolean that indicates whether the layout engine should start out active or not. Defaults to true.
 * @returns {object} A layoutEngine object, with the following properties:
 * - isActive: a function that accepts no arguments and returns a boolean indicating whether the layout engine is active or not. When active, the layout engine will change the DOM during route transitions.
 * - activate: a function that accepts no arguments and returns undefined. Calling this function activates the layout engine, which includes setting up routing event listeners so that the layout engine can change the DOM during route transitions.
 * - deactivate: a function that accepts no arguments and returns undefined. Calling this function deactivates the layout engine, which includes tearing down all routing event listeners so that the layout engine no longer changes the DOM during route transitions.
 */
const layoutEngine = constructLayoutEngine({ routes, applications });
console.log(`The layout engine is ${layoutEngine.isActive() ? 'actived' : 'inactived'}`);

/**
 * @param {boolean} urlRerouteOnly
 * A boolean that defaults to false.
 * If set to true, calls to history.pushState() and history.replaceState() will not trigger a single-spa reroute
 * unless the client side route was changed.
 * Setting this to true can be better for performance in some situations.
 */
start({ urlRerouteOnly: true });
