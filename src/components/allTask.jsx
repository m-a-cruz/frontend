import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navigation from './navigation';
import { jwtDecode } from 'jwt-decode';

const AllTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const response = JSON.parse(localStorage.getItem('token'));
      const headers = {
        Authorization:  response.token,
        'Content-Type': 'application/json',
      };

      const { data } = await axios.get('https://personaltaskmanager-s8fw.onrender.com/tasks', { headers: headers });
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <>

<div className='flex justify-center flex-wrap'>
      {tasks.map(task => (
        <div key={task.id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mr-4 mb-4">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task.title}</h2>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{task.description}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Category: {task.category}</p>
          <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </a>
        </div>
      ))}
    </div>
      
    </>
  );
};

export default AllTask;
