import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = JSON.parse(localStorage.getItem('token'))
        setUser(response.data);
        navigate("/dashboard");
      } catch (error) {
        navigate("/login");
      }
    };
    fetchUser();
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://personaltaskmanager-s8fw.onrender.com/login', {
        username,
        password,
      });
      localStorage.setItem('token', JSON.stringify(response.data));
      navigate("/dashboard");
      console.log('login successful');
      toast.success('🦄 Login success!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
      });
    }
  };

  return (
    <div className='flex justify-center items-center h-full'>
    <Card className="w-96 ">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input label="Username" size="lg" onChange={(e) => setUsername(e.target.value)}/>
        <Input label="Password" type='password' size="lg" onChange={(e) => setPassword(e.target.value)} />
        <div className="-ml-2.5">
          <Checkbox label="Remember Me" />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth onClick={handleLogin}>
          <ToastContainer/>
          Sign In
        </Button>
        <div className="mt-2">  {/* Added a separate div */}
          <ToastContainer/>
        </div>
        <Typography variant="small" className="mt-6 flex justify-center">
          Don&apos;t have an account?
          <Typography
            as="a"
            href="/register"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold text-gray-900"
            
            
          >
<<<<<<< HEAD
              Sign Up
=======
           Register here
>>>>>>> fa7f5ffa522d950198e67b213314c8af6a0cf0da
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
    </div>
  );
}

export default Login;
