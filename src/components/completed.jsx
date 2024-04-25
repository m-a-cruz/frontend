import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";

const Completed = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [active, setActive] = useState(1);
  const [pageTasks, setPageTasks] = useState([]);
  const response = JSON.parse(localStorage.getItem('token'));
  const headers = {
    Authorization: response.token,
    'Content-Type': 'application/json',
  };

  const fetchAllData = async () => {
    try {
      if (!response || !response.token) {
        throw new Error("Invalid token in local storage.");
      }
      const tasksResponse = await axios.get('https://personaltaskmanager-s8fw.onrender.com/tasks', { headers });
      const categoriesResponse = await axios.get('https://personaltaskmanager-s8fw.onrender.com/categories', { headers });
      const usersResponse = await axios.get('https://personaltaskmanager-s8fw.onrender.com/users', { headers });
      setTasks(tasksResponse.data);
      setCategories(categoriesResponse.data);
      setUsers(usersResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    const startIndex = (active - 1) * 5;
    const endIndex = startIndex + 5;
    setPageTasks(tasks.slice(startIndex, endIndex));
  }, [tasks, active]);

  const next = () => {
    if (active < Math.ceil(tasks.length / 5)) {
      setActive(active + 1);
    }
  };

  const prev = () => {
    if (active > 1) {
      setActive(active - 1);
    }
  };

  const onDelete = async (id) => {
    await axios.delete(`https://personaltaskmanager-s8fw.onrender.com/task/${id}`, { headers: headers });
    fetchAllData();
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Title
                </th>
                <th scope="col" class="px-6 py-3">
                    Description
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Deadline
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
          </thead>
          <tbody>
            {pageTasks.map((task) => (
              (task.status_id === 2) && (
                <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {task.title}
                  </th>
                  <td class="px-6 py-4">
                    {task.description}
                  </td>
                  <td class="px-6 py-4">
                    {categories.map((category) => (
                      (category.id === task.category_id) && (
                        <span key={category.id} value={category.id=task.category_id}>{category.category_description}</span>
                      )
                    ))}
                  </td>
                  <td class="px-6 py-4">
                    {new Date(task.due_date).toLocaleDateString()}
                  </td>
                  <td class="px-6 py-4">
                  <button onClick={() => onDelete(task.id)} className="inline-flex items-center justify-center w-8 h-8 text-purple-500 rounded-full bg-transparent hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600">
                    <MdDelete size={25} />
                  </button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={prev}
          disabled={active === 1 || tasks.length === 0}
        >
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {Array.from({ length: Math.ceil(tasks.length / 5) }, (_, index) => (
            <Button
              key={index + 1}
              onClick={() => setActive(index + 1)}
              variant={active === index + 1 ? "filled" : "text"}
              color="gray"
              className="rounded-full"
            >
              {index + 1}
            </Button>
          ))}
        </div>
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={next}
          disabled={active === Math.ceil(tasks.length / 5) || tasks.length === 0}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Completed;
