import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import Calendar from 'react-calendar'; // Import Calendar component from react-calendar
import 'react-calendar/dist/Calendar.css';


const Dashboard = () => {
  // State for managing the selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

  

  return (
    <>
      <Card
        shadow={false}
        className="relative grid h-[25rem] w-full max-w-[60rem] items-end justify-center overflow-hidden text-center mb-8"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('./assets/Wall.jpg')] bg-cover bg-center"
        >
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
        </CardHeader>
        <CardBody className="relative py-14 px-6 md:px-12">
          <Typography
            variant="h2"
            color="white"
            className="mb-6 font-medium leading-[1.5]"
          >
            Hello!
          </Typography>
          <Typography variant="h5" className="mb-4 text-gray-400">
            Tania Andrew
          </Typography>
          <Avatar
            size="xl"
            variant="circular"
            alt="tania andrew"
            className="border-2 border-white"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
        </CardBody>
      </Card>
      <Card
  shadow={false}
  className="relative grid h-[25rem] w-full max-w-[60rem] items-end justify-center overflow-hidden text-center"
>
  
  <CardBody className="relative p-0 flex justify-center items-center">
  {/* Calendar component */}
  <div className="h-full w-full flex justify-center items-center">
    <Calendar
      onChange={setSelectedDate} // Function to handle date change
      value={selectedDate} // Current selected date
      className="w-full h-full max-w-full max-h-full" // Make the calendar fill the available space
    />
  </div>
</CardBody>


</Card>

    </>
  );
}

export default Dashboard;
