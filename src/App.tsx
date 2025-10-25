// import { useState } from 'react'
// import MockApp from './MockApp'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <MockApp />
//     </>
//   )
// }

// export default App








import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {path: "/", element:<HomePage />}
])


function App() {

  return(
    <RouterProvider router={router} />
  )
}

export default App