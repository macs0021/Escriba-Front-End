import React from 'react';
import { Navigate } from "react-router-dom";
import NavBar from '../Components/NavBar/navBar';
import { Logged } from '../Services/TokenService';

const Guard = ({ children }) => {

    if (!Logged()) {
        return <Navigate replace to="/authentication" />
    }
    return <>
        <NavBar />
        {children}
    </>
};

export default Guard;