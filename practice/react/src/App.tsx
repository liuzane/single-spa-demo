import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { add } from '@laboratory/common';
import { Link, Outlet } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount((count) => count + 1);
    console.log('add', add(1, count));
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={onClick}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Link to="/react" className="mr-2">Home</Link>
      <Link to="/react/bar" className="mr-2">Bar</Link>
      <Link to="/react/foo" className="mr-2">Foo</Link>
      <page-anchor href="/vue" class="mr-2">Vue</page-anchor>
      <Outlet />
    </>
  )
}

export default App;
