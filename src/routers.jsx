

import {
    createBrowserRouter,
    RouterProvider
  
  } from 'react-router-dom';
  import Login from './components/login';
  //import Dashboard from './components/dashboard';
  
  const routers = createBrowserRouter([
  
    {
      path: '/login',
      element: <Login/>
  
    },
    // {
    //   path: '/dashboard',
    //   element: <Dashboard/>
    // }
  
  ])
export default routers;