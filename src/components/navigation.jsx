import React, { useState, useEffect, useRef } from 'react';
import {  GiAbstract050, GiNotebook, } from "react-icons/gi";
import { FaClipboardCheck, } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Navigation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const op = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = JSON.parse(localStorage.getItem("token"));
                setUser(response.data);
                navigate("/dashboard");
            } catch (error) {
                navigate("/login");
            }
        };
        fetchUser();
    }, []);

  const handleLogout = () => {
    try{
        localStorage.removeItem("token");
        navigate("/login");
        toast.success(response.message);
    }catch (error) {
        console.error("Login failed:", error);
    }
};

  return (
    <div className='menu-container'>
  <button
    data-drawer-target="default-sidebar"
    data-drawer-toggle="default-sidebar"
    aria-controls="default-sidebar"
    type="button"
    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    onClick={toggleSidebar}
  >
    <span className="sr-only">Open sidebar</span>
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  </button>

  <aside
    id="default-sidebar"
    className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
      sidebarOpen ? '' : '-translate-x-full sm:translate-x-0'
    } bg-gray-200 dark:bg-gray-800 rounded-r-lg`}
    aria-label="Sidebar"
   
  >
    <div className="h-full px-3 py-4 flex flex-col justify-center items-center">
      <ul className="space-y-2 font-medium w-full">
        <li className="flex items-center justify-center">
          <Link to="/dashboard" className="flex flex-col items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <GiAbstract050 style={{width:"20px", height:"20px"}} />
            <span className="mt-1">Dashboard</span>
          </Link>
        </li>
        <li className="flex items-center justify-center">
          <Link to="/allTask" className="flex flex-col items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <BsListTask style={{width:"25px", height:"25px"}}/>
            <span className="mt-1">All Task</span>
          </Link>
        </li>
        <li className="flex items-center justify-center">
          <Link to="/completed" className="flex flex-col items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <FaClipboardCheck style={{width:"25px", height:"25px"}}/>
            <span className="mt-1">Completed</span>
          </Link>
        </li>
        <li className="flex items-center justify-center">
          <Link to="/doitnow" className="flex flex-col items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <GiNotebook style={{width:"25px", height:"25px"}}/>
            <span className="mt-1">Do It Now</span>
          </Link>
        </li>
      </ul>
      <div className="mt-auto">
        <Button color="red" onClick={handleLogout}>
          <ToastContainer/>
          Logout
        </Button>
      </div>
    </div>
  </aside>
</div>
  
  );
}

export default Navigation;
