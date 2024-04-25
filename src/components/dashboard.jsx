import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import axios from 'axios';


const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const response = JSON.parse(localStorage.getItem('token'));
  const headers = {
    Authorization: response.token,
    'Content-Type': 'application/json',
  };

  
  useEffect(() => {

    const getChartOptions = () => {
      return {
        series: [(completed/tasks.length)*100, (inProgress/tasks.length)*100, (toDo/tasks.length)*100],
        colors: ["#1C64F2", "#16BDCA", "#FDBA8C"],
        chart: {
          height: "380px",
          width: "100%",
          type: "radialBar",
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          radialBar: {
            track: {
              background: '#E5E7EB',
            },
            dataLabels: {
              show: false,
            },
            hollow: {
              margin: 0,
              size: "32%",
            }
          },
        },
        grid: {
          show: false,
          strokeDashArray: 4,
          padding: {
            left: 2,
            right: 2,
            top: -23,
            bottom: -20,
          },
        },
        labels: ["Completed", "In progress", "To do"],
        legend: {
          show: true,
          position: "bottom",
          fontFamily: "Inter, sans-serif",
        },
        tooltip: {
          enabled: true,
          x: {
            show: false,
          },
        },
        yaxis: {
          show: false,
          labels: {
            formatter: function (value) {
              return value + '%';
            }
          }
        }
      }
    }
  
    if (document.getElementById("radial-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.querySelector("#radial-chart"), getChartOptions());
      chart.render();
    }
    fetchTask();
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
  }

  const fetchUsers = async () => {
    try {
      const {data} = await axios.get('https://personaltaskmanager-s8fw.onrender.com/users', { headers: headers });
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  const toDo = tasks.length;
  const inProgress = tasks.filter(task => task.status_id === 1).length;
  const completed = tasks.filter(task => task.status_id === 2).length;


  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between mb-3">
        <div className="flex items-center">
          <div className="flex justify-center items-center">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">Your team's progress</h5>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
        <div className="grid grid-cols-3 gap-3 mb-2">
          <dl className="bg-orange-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
            <dt className="w-8 h-8 rounded-full bg-orange-100 dark:bg-gray-500 text-orange-600 dark:text-orange-300 text-sm font-medium flex items-center justify-center mb-1">{toDo}</dt>
            <dd className="text-orange-600 dark:text-orange-300 text-sm font-medium">To do</dd>
          </dl>
          <dl className="bg-teal-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
            <dt className="w-8 h-8 rounded-full bg-teal-100 dark:bg-gray-500 text-teal-600 dark:text-teal-300 text-sm font-medium flex items-center justify-center mb-1">{inProgress}</dt>
            <dd className="text-teal-600 dark:text-teal-300 text-sm font-medium">In progress</dd>
          </dl>
          <dl className="bg-blue-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
            <dt className="w-8 h-8 rounded-full bg-blue-100 dark:bg-gray-500 text-blue-600 dark:text-blue-300 text-sm font-medium flex items-center justify-center mb-1">{completed}</dt>
            <dd className="text-blue-600 dark:text-blue-300 text-sm font-medium">Done</dd>
          </dl>
        </div>
      </div>

      {/* Radial Chart */}
      <div className="py-6" id="radial-chart"></div>
    </div>
  );
}

export default Dashboard;
