import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ThemeProvider } from '@material-tailwind/react'
import { RouterProvider } from 'react-router-dom'
import routers from './routers.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = { routers }/>
    {/* <ThemeProvider>
    <App />
    </ThemeProvider> */}
  </React.StrictMode>
)