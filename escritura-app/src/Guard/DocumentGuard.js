import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import DocumentService from '../Services/DocumentService';
import { Navigate } from 'react-router';
import GuardView from '../Views/GuardView/GuardView';

const DocumentGuard = ({ children }) => {
    const { id } = useParams();
    const [isDocumentMine, setIsDocumentMine] = useState(null);

    useEffect(() => {
        DocumentService.checkOwner(id).then((result) => {
            setIsDocumentMine(result);
            console.log("GUARD DOCUMENTO RECIBE " + result);
        });
    }, [id]);

    if (isDocumentMine === null) {
        return <div>Cargando...</div>;
    }

    if (!isDocumentMine) {
        return <GuardView message={"Only the creator of the document is able to edit it"} icon={"lock"}></GuardView>
    }

    return children;
};

export default DocumentGuard;