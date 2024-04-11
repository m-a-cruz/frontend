import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavigationType, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Navbar, Nav } from "react-bootstrap";
import { Button } from "@material-tailwind/react";
import Navigation from "./navigation";
import App from "../App";


const dashboard = () => {

    return (
        <>
        {/* <Navigation /> */}
        <App />
        <main>
            <div style={{marginLeft:"300px"}}>Dashboard</div>
        {/* <Navbar bg="primary" data-bs-theme="dark" style={{marginLeft:"300px"}}>
            <div>Dashboard</div>
                <Button color="white" onClick={handleLogout}>
                    Logout
                </Button>
        </Navbar> */}
        </main>
        </>
    )

};

export default dashboard;