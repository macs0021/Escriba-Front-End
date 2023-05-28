import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { checkOwner } from '../Services/DocumentService';
import GuardView from '../Views/GuardView/GuardView';

const DocumentGuard = ({ children }) => {
    const { id } = useParams();
    const [isDocumentMine, setIsDocumentMine] = useState(null);

    useEffect(() => {
        checkOwner(id).then((result) => {
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