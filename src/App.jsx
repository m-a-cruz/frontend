import React from "react"
import Login from "./components/login"
import Dashboard from './components/dashboard';
import AllTask from './components/allTask';
import Completed from './components/completed';
import DoItNow from './components/doitnow';
import Register from './components/register';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation";


function App () {
  return (
    <>
    <div>
      <Navigation />
    </div>
    <div style={{marginLeft:"300px"}}>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/alltask" element={<AllTask />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/doitnow" element={<DoItNow />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </div>
      
    </>
  )
};

export default App