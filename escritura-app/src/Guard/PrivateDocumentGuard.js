import React, { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import { checkOwner, checkPublic } from '../Services/DocumentService';
import GuardView from '../Views/GuardView/GuardView';
import Loader from '../Components/Loader/Loader';

const PrivateDocumentGuard = ({ children }) => {
    const { id } = useParams();
    const [isDocumentMine, setIsDocumentMine] = useState(null);
    const [isDocumentPublic, setIsDocumentPublic] = useState(null);

    useEffect(() => {
        checkPublic(id).then((result) => {
            setIsDocumentPublic(result);
        });

        checkOwner(id).then((result) => {
            setIsDocumentMine(result);
        });
    }, [id]);

    if (isDocumentPublic === null || isDocumentMine === null) {
        return <div className='center'><Loader /></div>;
    }

    if (!isDocumentPublic && !isDocumentMine) {
        return <GuardView message={"This document is private, only the creator can read it"} icon={"lock"}></GuardView>
    }

    return children;
};

export default PrivateDocumentGuard;