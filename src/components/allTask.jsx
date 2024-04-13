import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoAddCircleOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // To store the task being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // To manage the visibility of the modal
  const [isAddingTask, setIsAddingTask] = useState(false); // To track if modal is for adding task

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const response = JSON.parse(localStorage.getItem('token'));
      const headers = {
        Authorization: response.token,
        'Content-Type': 'application/json',
      };

      const { data } = await axios.get('https://personaltaskmanager-s8fw.onrender.com/tasks', { headers: headers });
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsAddingTask(false);
    setIsModalOpen(true);
  };

  const handleAddTask = () => {
    setIsAddingTask(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingTask(null);
    setIsAddingTask(false);
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    // Logic to submit form data (adding or editing task)
  };

  return (
    <>
      <div className='flex justify-center flex-wrap'>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} onEdit={handleEdit} />
        ))}
        <button type="button" onClick={handleAddTask} className="flex items-center justify-center focus:outline-none rounded-lg p-0.5 me-2 mb-2">
          <IoAddCircleOutline className="text-gray-900 dark:text-white" style={{ fontSize: '2.5rem' }} />
          <span className="sr-only">Add Task</span>
        </button>
      </div>

      {/* Modal */}
      {(editingTask || isAddingTask) && (
        <div className={`fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75 ${isModalOpen ? 'visible' : 'hidden'}`}>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* Modal content */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{isAddingTask ? 'Add New Task' : 'Edit Task'}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center focus:outline-none">
                <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
              </button>
            </div>
            <form className="grid gap-4">
              {/* Your form fields */}
              {/* Modify form fields based on whether adding or editing */}
              {isAddingTask && (
                <>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                      <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type task title" required />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                      <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option value="sample1">Sample 1</option>
                        <option value="sample2">Sample 2</option>
                        <option value="sample3">Sample 3</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                      <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write task description here"></textarea>
                    </div>
                  </div>
                </>
              )}
              {editingTask && (
                <>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                      <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type task title" value={editingTask.title} onChange={e => setEditingTask({ ...editingTask, title: e.target.value })} required />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                      <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={editingTask.category} onChange={e => setEditingTask({ ...editingTask, category: e.target.value })}>
                        <option value="sample1">Sample 1</option>
                        <option value="sample2">Sample 2</option>
                        <option value="sample3">Sample 3</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                      <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write task description here" value={editingTask.description} onChange={e => setEditingTask({ ...editingTask, description: e.target.value })}></textarea>
                    </div>
                  </div>
                </>
              )}
              <button type="submit" onClick={handleSubmit} className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                Confirm
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const TaskItem = ({ task, onEdit }) => {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mr-4 mb-4">
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task.title}</h2>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{task.description}</p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Category: {task.category}</p>
      <div className="footer">
        {/* Edit button */}
        <button onClick={() => onEdit(task)} className="inline-flex items-center justify-center w-8 h-8 mr-2 text-black-500 rounded-full bg-transparent hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600">
          <CiEdit size={18} />
        </button>
        {/* Trash button */}
        <button className="inline-flex items-center justify-center w-8 h-8 text-purple-500 rounded-full bg-transparent hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600">
          <MdDelete size={18} />
        </button>
      </div>
    </div>
  );
};

export default AllTask;
