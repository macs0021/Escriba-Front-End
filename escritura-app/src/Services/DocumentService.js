import Interceptor from './Interceptor';
import TokenService from './TokenService';

const url = "documents";

async function getDocumentById(id) {

    try {
        const response = await Interceptor.get(`${url}/${encodeURIComponent(id)}`);
        return response.data;
    } catch (error) {
        console.log("Esperando al refresco del token");
    }
}

async function putDocument(document) {
    try {
        const response = await Interceptor.put(url, JSON.stringify(document));
        return response.data;
    } catch (error) {
        console.log("Esperando al refresco del token");
    }
}

async function postDocument(document) {
    try {
        const response = await Interceptor.post(url, JSON.stringify(document));
        return response.data;
    } catch (error) {
        console.log("Esperando al refresco del token");
    }
}

async function getAllDocuments() {
    try {
        const response = await Interceptor.get(url);
        return response.data;
    } catch (error) {
        return [];
    }
}

async function getDocumentsByUsername() {
    try {
        const response = await Interceptor.get(url + "/user/" + TokenService.getUsername());
        return response.data;
    } catch (error) {
        console.log("Esperando al refresco del token");
        return [];
    }
}

async function deleteDocument(documentId) {
    console.log("BORRANDO");
    try {
        const response = await Interceptor.delete(url + "/" + documentId);
        console.log("BORRANDO: " + documentId);
        return response;
    } catch (error) {
        console.log("Esperando al refresco del token");
    }
}

async function userSavesDocument(documentId) {
    try {
        const response = await Interceptor.post(url + "/saved/" + TokenService.getUsername() + "?savedDocument=" + documentId);
        return response;
    } catch (error) {
        console.log("Esperando al refresco del token");
    }
}
async function userUnsavesDocument(documentId) {
    try {
        const response = await Interceptor.delete(url + "/saved/" + TokenService.getUsername() + "?savedDocument=" + documentId);
        return response;
    } catch (error) {
        console.log("Esperando al refresco del token");
    }
}

async function getDocumentsSavedByUsername() {
    try {
        const response = await Interceptor.get(url + "/saved/" + TokenService.getUsername());
        return response.data;
    } catch (error) {
        console.log("Esperando al refresco del token");
        return [];
    }
}

async function getDocumentsReadByUsername() {
    try {
        const response = await Interceptor.get(url + "/read/" + TokenService.getUsername());
        return response.data;
    } catch (error) {
        console.log("Esperando al refresco del token");
        return [];
    }
}

export default {
    getDocumentById,
    putDocument,
    postDocument,
    getAllDocuments,
    getDocumentsByUsername,
    deleteDocument,
    userSavesDocument,
    getDocumentsSavedByUsername,
    userUnsavesDocument,
    getDocumentsReadByUsername,
};