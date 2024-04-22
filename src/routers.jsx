import {
    createBrowserRouter,
    RouterProvider
  } from 'react-router-dom';
  import Login from './components/login';
  import Dashboard from './components/dashboard';
  import AllTask from './components/allTask';
  import Completed from './components/completed';
  import DoItNow from './components/doitnow';
  import Register from './components/register';
import App from './App';
  
  const routers = createBrowserRouter([
  
    {
      path: '/',
      element: <App/>,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/alltask",
          element: <AllTask />,
        },
        {
          path: "/completed",
          element: <Completed />,
        },
        {
          path: "/doitnow",
          element: <DoItNow />,
        },
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    
  ])
export default routers;