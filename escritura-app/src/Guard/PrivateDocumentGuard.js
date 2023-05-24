import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import DocumentService from '../Services/DocumentService';
import { Navigate } from 'react-router';
import GuardView from '../Views/GuardView/GuardView';

const PrivateDocumentGuard = ({ children }) => {
    const { id } = useParams();
    const [isDocumentMine, setIsDocumentMine] = useState(null);

    useEffect(() => {
        DocumentService.checkPublic(id).then((result) => {
            setIsDocumentMine(result);
            console.log("GUARD READING RECIBE " + result);
        });
    }, [id]);

    if (isDocumentMine === null) {
        return <div>Cargando...</div>;
    }

    if (!isDocumentMine) {
        //return <Navigate replace to="/" />;
        return <GuardView message={"This document is private, only the creator can read it"} icon={"lock"}></GuardView>
    }

    return children;
};

export default PrivateDocumentGuard;