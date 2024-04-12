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
      };git 

      const { data } = await axios.get('https://personaltaskmanager-s8fw.onrender.com/tasks', { headers: headers });
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <>
      <div style={{ marginLeft: "300px" }}>All Task
        {tasks.map(task => (
          <h2 key={task.id}>{task.id}</h2>
        ))}
      </div>
    </>
  );
};

export default AllTask;
