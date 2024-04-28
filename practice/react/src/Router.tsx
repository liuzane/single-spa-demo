// Bases
import { createHashRouter, RouterProvider } from "react-router-dom";

import App from './App.tsx';

const baseUrl: string = '/react'

const router = createHashRouter([
  {
    path: baseUrl + "/",
    element: <App />,
    children: [
      {
        index: true,
        lazy: () => import('./components/Test'),
      },
      {
        path: baseUrl + "/bar",
        lazy: () => import('./components/HelloWorld'),
      },
      {
        path: baseUrl + "/foo",
        async lazy() {
          const { Foo } = await import('./components/Foo');
          return { Component: Foo };
        },
      }
    ]
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}