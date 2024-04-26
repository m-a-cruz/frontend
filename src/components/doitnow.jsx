import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Button, Stack, Modal } from 'react-bootstrap';
import { MdEdit, MdDelete } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import axios from 'axios';

const doitnow = ({ handleViewModalShow }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const response = JSON.parse(localStorage.getItem('token'));
  const headers = {
    Authorization: response.token,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    fetchTask();
    fetchCategories();
  }, []);

  //START ~~FETCHING DATA~~
  const fetchTask = async () => {
    try {
      const { data } = await axios.get('https://personaltaskmanager-s8fw.onrender.com/tasks', { headers: headers });
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('https://personaltaskmanager-s8fw.onrender.com/categories', { headers: headers });
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }


  return (
    <div className='flex flex-wrap'>
      {tasks.map(task => (
        (task.user_id === response.user_id && task.status_id === 1 && new Date(task.due_date).toDateString() === new Date().toDateString()) ? (
          <TaskItem key={task.id} categories={categories} task={task} />
        ) : null
      ))}
      {tasks.every(task => new Date(task.due_date).toDateString() !== new Date().toDateString()) && (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mr-4 mb-4">
          THERE'S NO DUE FOR TODAY
        </div>
      )}
    </div>
  );
};
const TaskItem = ({ categories,task}) => {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mr-4 mb-4">
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task.title}</h2>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{task.description}</p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Category: 
      {categories.map((category) => (
        (category.id === task.category_id) && (
          <span key={category.id} value={category.id=task.category_id}>{category.category_description}</span>
        )
      ))}
      </p>
      </div>
  );
};
export default doitnow;
