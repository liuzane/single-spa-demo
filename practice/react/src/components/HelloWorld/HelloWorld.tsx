import { useState } from 'react'
import './HelloWorld.css';

function HelloWorld() {
  const [count, setCount] = useState(0)

  return (
    <div className='hello-world mr-2'>HelloWorld <button onClick={() => setCount((count) => count + 1)}>
    count is {count}
  </button></div>
  )
}

export default HelloWorld;
