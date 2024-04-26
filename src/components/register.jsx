import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import ParticlesComponent from './particles';



const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role_id, setRoleId] = useState('2');
  const navigate = useNavigate();
  const [registrationFailed, setRegistrationFailed] = useState(false); // State to track registration failure

  const handleRegister = async (e) => {
    e.preventDefault();
    const status_id = 1;

    try {
      const response = await axios.post('https://personaltaskmanager-s8fw.onrender.com/register', {
        name,
        email,
        username,
        password,
        role_id,
        status_id,
      });
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.log('Registration failed. Please try again!', error);
      setRegistrationFailed(true); // Set registrationFailed state to true
    }
  };

  return (
    
    <div className='flex justify-center items-center h-full'>
      <ParticlesComponent id="particles" />
      <Card color="transparent" shadow={false}>
        <Typography variant="h1" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        {/* Wrap the form inside a div with a white background */}
        <div className="bg-white rounded-lg p-6">
          <form className="mt-2">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Name
              </Typography>
              <Input
                size="lg"
                placeholder="name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={name}
                onChange={(e) => setName(e.target.value)}
                labelProps={{
                  className: "before:content-none after:content-none"
                }}
                required
              />
               <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <Input
              size="lg"
              required
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={email} onChange={(e) => setEmail(e.target.value)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Username
            </Typography>
            <Input
              size="lg"
              required
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={username} onChange={(e) => setUsername(e.target.value)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
             <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={password} onChange={(e) => setPassword(e.target.value)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
              {/* Other form inputs */}
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button className="mt-6" fullWidth onClick={handleRegister}>
              Sign Up
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account? Sign In
            </Typography>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Register;