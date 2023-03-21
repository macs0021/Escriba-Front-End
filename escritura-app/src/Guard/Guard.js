import { Token } from '@mui/icons-material';
import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from '../Components/NavBar/navBar';
import TokenService from '../Services/TokenService';
import { useEffect } from 'react';

const Guard = ({ children }) => {

    if (!TokenService.Logged()) {
        return <Navigate replace to="/authentication" />
    }
    return <>
        <NavBar />
        {children}
    </>
};

export default Guard;