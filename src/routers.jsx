

import {
    createBrowserRouter,
    RouterProvider
  
  } from 'react-router-dom';
  import Login from './components/login';
  import Dashboard from './components/dashboard';
  import AllTask from './components/allTask';
  import Completed from './components/completed';
  import DoItNow from './components/doitnow';
  import AddTask from './components/addtask';
import App from './App';
  
  const routers = createBrowserRouter([
  
    {
      path: '/',
      element: <Login/>
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/alltask",
      element: <AllTask />,
    },
    {
      path: "/addtask",
      element: <AddTask />,
    },
    {
      path: "/completed",
      element: <Completed />,
    },
    {
      path: "/doitnow",
      element: <DoItNow />,
    },
  ])
export default routers;