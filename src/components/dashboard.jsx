import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  CardFooter,
} from "@material-tailwind/react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


 



const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
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
    fetchUser();
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
  const fetchUser = async () => {
    try {
      const {data} = await axios.get('https://personaltaskmanager-s8fw.onrender.com/user/${response.user_id}', { headers: headers });
      setUser(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  
  const toDo = tasks.filter(task => task.user_id === response.user_id).length;
  const inProgress = tasks.filter(task => task.status_id === 1 && task.user_id === response.user_id).length;
  const completed = tasks.filter(task => task.status_id === 2 && task.user_id === response.user_id).length;
  const localizer = momentLocalizer(moment);
  const events = [
    {
      start: new Date(),
      end: new Date(),
      title: 'Sample Event'
    },
    // Add more events as needed
  ];



  return (
    
<>
  <div style={{backgroundColor: '#E5E7EB', alignContent: 'center'}}>

    <div className="flex justify-start">
      
    <div className="w-86 mr-4">
      <div className="container mx-auto ml-0 it">
        {/* User Card */}
        {users.map((user) => ( 
          user.id === response.user_id && (
            <Card
              style={{width: "100%"}}
              shadow={false}
              className="relative grid h-[15rem] w-full max-w-[80rem] items-end justify-center overflow-hidden text-center mb-8"
            >
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('./assets/peakpx.jpg')] bg-cover bg-center"
              >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
              </CardHeader>
              <CardBody className="relative py-14 px-6 md:px-12">
                <Typography
                  variant="h2"
                  color="white"
                  className="mb-6 font-medium leading-[1.5]"
                >
                  Welcome Back!
                </Typography>
                <Typography variant="h1" className="mb-4 text-gray-400">
                  {user.name}
                </Typography>
              </CardBody>
            </Card>
          )
        ))}
      </div>
      {/* Calendar Card */}
        <Card style={{width: '100%'}}>
          <CardBody className="flex flex-col justify-between">
            <div>
              {/* Content of the calendar card */}
            </div>
            <div className="w-full h-96 mt-auto">
              <Calendar
                localizer={localizer}
                // events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ margin: 'auto' }}
              />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Chart Card */}
      <div className="container max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 -mt-3">
        <div className="absolute top-0 right-0 -mt-4 -mr-4">
          <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 19a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 19a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>
        <div className="flex justify-between mb-3">
          <div className="flex items-center">
            <div className="flex justify-center items-center">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">Your progress⏳</h5>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <div className="grid grid-cols-3 gap-3 mb-2">
            {/* Content for the chart card */}
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
    </div>
  </div>
</>

  );
}

export default Dashboard;
