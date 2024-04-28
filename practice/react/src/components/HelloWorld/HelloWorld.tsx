import { useState } from 'react'
import './HelloWorld.css';
// Bases
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export function Component() {
  const [count, setCount] = useState(0)

  return (
    <div className='hello-world mr-2'>HelloWorld <button onClick={() => setCount((count) => count + 1)}>
    count is {count}
  </button></div>
  )
}

export function ErrorBoundary() {
  const error: any = useRouteError();
  return isRouteErrorResponse(error) ? (
    <h1>
      {error.status} {error.statusText}
    </h1>
  ) : (
    <h1>{error.message || error}</h1>
  );
}