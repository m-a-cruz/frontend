import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavigationType, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Container } from "postcss";
import { Navbar, Nav } from "react-bootstrap";
import { Button } from "@material-tailwind/react";
import Navigation from "./navigation";


const dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = JSON.parse(localStorage.getItem("token"));
                setUser(response.data);
                navigate("/dashboard");
            } catch (error) {
                navigate("/login");
            }
        };
        fetchUser();
    }, []);

    const handleLogout = () => {
        try{
            localStorage.removeItem("token");
            navigate("/login");
        }catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <>
        <Navigation />
        <Navbar bg="primary" data-bs-theme="dark">
                <Button color="white" onClick={handleLogout}>
                    Logout
                </Button>
        </Navbar>
        </>
    )

};

export default dashboard;