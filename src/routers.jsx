

import {
    createBrowserRouter,
    RouterProvider
  
  } from 'react-router-dom';
  import Login from './components/login';
  import Dashboard from './components/dashboard';
import App from './App';
  
  const routers = createBrowserRouter([
  
    {
      path: '/',
      element: <Login/>,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ])
export default routers;