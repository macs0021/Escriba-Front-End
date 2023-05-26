import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import DocumentService from '../Services/DocumentService';
import { Navigate } from 'react-router';
import GuardView from '../Views/GuardView/GuardView';

const PrivateDocumentGuard = ({ children }) => {
    const { id } = useParams();
    const [isDocumentMine, setIsDocumentMine] = useState(null);
    const [isDocumentPublic, setIsDocumentPublic] = useState(null);

    useEffect(() => {
        DocumentService.checkPublic(id).then((result) => {
            setIsDocumentPublic(result);
        });

        DocumentService.checkOwner(id).then((result) => {
            setIsDocumentMine(result);
        });
    }, [id]);

    if (isDocumentPublic === null || isDocumentMine === null) {
        return <div>Cargando...</div>;
    }

    if (!isDocumentPublic && !isDocumentMine) {
        return <GuardView message={"This document is private, only the creator can read it"} icon={"lock"}></GuardView>
    }

    return children;
};

export default PrivateDocumentGuard;