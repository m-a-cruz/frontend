import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoAddCircleOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';


import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingTask, setEditingTask] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isAddingTask, setIsAddingTask] = useState(false); 
  const [validationErrors, setValidationErrors] = useState('');
  const response = JSON.parse(localStorage.getItem('token'));
  const headers = {
    Authorization: response.token,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    fetchTask();
    fetchCategories();
    fetchUsers();
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

  const fetchUsers = async () => {
    try {
      const {data} = await axios.get('https://personaltaskmanager-s8fw.onrender.com/users', { headers: headers });
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  //END ~~FETCHING DATA~~

  //START ~~BUTTON FUNCITONS~~
  const handleEdit = (task) => {
    setEditingTask(task);
    setSelectedDate(task.due_date);
    console.log(task);
    setIsAddingTask(false);
    setIsModalOpen(true);
  };

  const handleAddTask = () => {
    setTitle('');
    setDescription('');
    setCategoryId(1);
    setStatusId(1);
    setUserId(response.user_id);
    setDueDate(new Date());
    
    setIsAddingTask(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingTask(null);
    setIsAddingTask(false);
    setIsModalOpen(false);
  };
  //END ~~BUTTON FUNCTIONS~~

  //~~CREATE TASK~~
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [status_id, setStatusId] = useState('');
  const [user_id, setUserId] = useState('');
  const [due_date, setDueDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleSubmitAddingTask = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category_id', category_id);
    formData.append('status_id', status_id);
    formData.append('user_id', response.user_id);
    formData.append('due_date', due_date.toISOString());


    await axios.post('https://personaltaskmanager-s8fw.onrender.com/task', formData, { headers: headers }).then(({data}) => {
      fetchTask();
      setTitle('');
      setDescription('');
      setCategoryId('');
      setStatusId('');
      setUserId('');
      setDueDate('');
      setIsModalOpen(false);

      Swal.fire({
        title: 'Task created successfully',
        icon: 'success',
        text: data.message
      })
    }).catch(({response}) => {
      if (response.status === 422) {
        setValidationErrors(response.data.errors);
      } else {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: response.data.message
        })
      }
    })
  };

  //~~UPDATE TASK~~
  const handleUpdateTask = async (event) => {
    event.preventDefault();
    const id = editingTask.id;
    const status_id = editingTask.status_id;
    console.log(editingTask);

    const formData = new FormData();

    formData.append('title', editingTask.title);
    formData.append('description', editingTask.description);
    formData.append('category_id', editingTask.category_id);
    formData.append('status_id', editingTask.status_id);
    formData.append('user_id', editingTask.user_id);
    formData.append('due_date', selectedDate.toISOString());
    console.log(editingTask);

    await axios.put(`https://personaltaskmanager-s8fw.onrender.com/task/${id}`, formData, { headers: headers }).then(({data}) => {
      Swal.fire({
        title: 'Task updated successfully',
        icon: 'success',
        text: data.message
      })
      setSelectedDate('');
      fetchTask();
      setIsModalOpen(false);
    }).catch((response) => {
      if (response.status === 422) {
        setValidationErrors(response.data.errors);
      } else {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: response.data.message
        })
      }
    })
  }

  //~~DELETE TASK~~
  const handleDeleteTask = async (id) => {
    const isConfirmed = await Swal.fire({
      title: 'Are you sure?',
      text: "Di mo na mababalik ang nakaraan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      Swal.fire({
        title: 'Deleted Successfully!',
        text: 'Makakamove-on ka na!',
        icon: 'success'
      })
      return result.isConfirmed;
    });

    if(!isConfirmed){
      Swal.fire({
        title: 'Cancelled',
        text: 'Marupok ka parin!',
        icon: 'error'
      })
    }else{
      await axios.delete(`https://personaltaskmanager-s8fw.onrender.com/task/${id}`, { headers: headers });
      fetchTask();
    }
  }

  const handleDone = async (task) => {
    console.log(task);
    const id = task.id;
    const isConfirmed = await Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      Swal.fire({
        title: 'Done Successfully!',
        icon: 'success'
      })
      return result.isConfirmed;
    });

    if(!isConfirmed){
      Swal.fire({
        title: 'Cancelled',
        icon: 'error'
      })
    }else{
      const status_id = 2;
      const formData = new FormData();

      formData.append('title', task.title);
      formData.append('description', task.description);
      formData.append('category_id', task.category_id);
      formData.append('status_id', status_id);
      formData.append('user_id', task.user_id);
      formData.append('due_date', task.due_date);

      await axios.put(`https://personaltaskmanager-s8fw.onrender.com/task/${id}`, formData, { headers: headers }).then(({data}) => {
        fetchTask();
      });
    };
    
  }

  return (
    <>
      <div className='flex flex-wrap'>
        {tasks.map(task => (
          (task.user_id === response.user_id && task.status_id === 1) && (
          <TaskItem key={task.id} categories={categories} task={task} onEdit={handleEdit} onDelete={handleDeleteTask} onDone={handleDone}/>
        )))}
        <button type="button" onClick={handleAddTask} className="flex items-center justify-center focus:outline-none rounded-lg p-0.5 me-2 mb-2">
          <IoAddCircleOutline className="text-gray-900 dark:text-white" style={{ fontSize: '2.5rem' }} />
          <span className="ms-2 text-gray-900 dark:text-white">Add New Task</span>
        </button>
      </div>

      {/* Modal */}
      {(editingTask || isAddingTask) && (
        <div className={`fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75 ${isModalOpen ? 'visible' : 'hidden'}`}>
          <div className="bg-white p-6 rounded-lg shadow-lg" style={{backgroundImage: `url(https://i.pinimg.com/564x/2f/16/8a/2f168a6dc3c6c21f3708f8f02b989849.jpg)`,  backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', alignItems:"center"}}>
            {/* Modal content */}
            <div className="flex items-center justify-between mb-4">
              <h3 style={{marginTop: '20px'}} className="text-lg font-semibold text-gray-900">{isAddingTask ? 'Add New Task' : 'Edit Task'}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center focus:outline-none">
                <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
              </button>
            </div>
            <form className="grid gap-4" >
              {/* Your form fields */}
              {/* Modify form fields based on whether adding or editing */}
              {isAddingTask && (
                <>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><strong>Title:</strong></label>
                      <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Title" required />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><strong>Category:</strong></label>
                      <select id="category_id" defaultValue={category_id} value={category_id} onChange={(event) => setCategoryId(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>{category.category_description}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><strong>Description:</strong></label>
                      <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description"></textarea>
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><strong>Due Date:</strong></label>
                      <DatePicker
                        id="date"
                        selected={due_date || new Date()}
                        onChange={event => setDueDate(event)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholderText="Select date"
                      />
                    </div>
                    <div>
                      <button type="submit" onClick={handleSubmitAddingTask} className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                        </svg>
                        Confirm
                      </button>
                    </div>
                  </div>

                </>
              )}
              {editingTask && (
                <>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><strong>Title:</strong></label>
                      <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type task title" value={editingTask.title} onChange={event => setEditingTask({ ...editingTask, title: event.target.value })} required />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><strong>Category:</strong></label>
                      <select id="update_category_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={editingTask.category_id} onChange={event => setEditingTask({ ...editingTask, category_id: event.target.value })}>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>{category.category_description}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><strong>Description:</strong></label>
                      <textarea id="update_description" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write task description here" value={editingTask.description} onChange={event => setEditingTask({ ...editingTask, description: event.target.value })}></textarea>
                    </div>
                    <div className="col-span-2">
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><strong>Deu Date:</strong></label>
                      <DatePicker
                        id="date"
                        selected={selectedDate || new Date()}
                        onChange={event => setSelectedDate(event )}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholderText="Select date"
                      />
                    <div>
                      <button type="submit" style={{ marginTop: "10px" }} onClick={handleUpdateTask} className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                        Confirm
                      </button>
                    </div>
                  </div>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
        
      )}
    </>
  );
};

const TaskItem = ({ categories,task, onEdit, onDelete, onDone }) => {
  return (
    <div style={{backgroundImage: `url(https://i.pinimg.com/564x/78/4f/e6/784fe6931a8e97bf989d562a91ffbb39.jpg)`, width: '250px', height: '300px', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', alignItems:"center"}} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mr-4 mb-4">
      <div className='header' style={{marginLeft: '10px'}}>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{marginTop: '30px'}}>{task.title}</h2>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{task.description}</p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Category: 
      {categories.map((category) => (
        (category.id === task.category_id) && (
          <span key={category.id} value={category.id=task.category_id}>{category.category_description}</span>
        )
      ))}
      </p>
      <div className="footer flex items-center">
        {/* Edit button */}
        <button onClick={() => onEdit(task)} className="inline-flex items-center justify-center w-8 h-8 mr-2 text-black-500 rounded-full bg-transparent hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600">
          <CiEdit size={25} />
        </button>
        {/* Trash button */}
        <button onClick={() => onDelete(task.id)} className="inline-flex items-center justify-center w-8 h-8 text-purple-500 rounded-full bg-transparent hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600">
          <MdDelete size={25} />
        </button>
        {/* Checkbox for done */}
        <div className="flex items-center">
          <input type="checkbox" onClick={() => onDone(task)} className="form-checkbox h-5 w-5 text-purple-600" />
          <label htmlFor="default-checkbox" style={{fontSize: '12px'}} className="ms-1 text-sm text-gray-900 dark:text-gray-300">Mark as Completed</label>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AllTask;
