// Bases
import { useLoaderData, useRouteError, isRouteErrorResponse } from "react-router-dom";

// export async function loader() {
//   return { a: 1};
// }

export function Component() {
  const data: any = useLoaderData();

  return (
    <>
      <h1>You made it!</h1>
      <p>{ data }</p>
    </>
  );
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