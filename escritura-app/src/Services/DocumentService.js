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

async function putDocument(documentId, document) {
    try {
        const response = await Interceptor.put(`${url}/${documentId}`, JSON.stringify(document));
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

async function getAllDocuments(page, pageSize) {
    try {

        console.log(`${url}/all?page=${page}&pageSize=${pageSize}`);
        const response = await Interceptor.get(`${url}/all?page=${page}&pageSize=${pageSize}`);
        
        return response.data;
    } catch (error) {
        return [];
    }
}

async function getDocumentsByUsername(username) {
    try {
        const response = await Interceptor.get(url + "/user/" + username);
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

async function getDocumentsByGenreAndPage(genres,tittleFragment, page, pageSize) {
    try {
        const response = await Interceptor.get(`${url}/genres?genres=${genres.join(',')}&tittleFragment=${tittleFragment}&page=${page}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        console.log("Esperando al refresco del token");
        return [];
    }
}
async function changeVisibility(documentId) {
    try {
        const response = await Interceptor.patch(`${url}/${documentId}/visibility`);
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
    getDocumentsByGenreAndPage,
    changeVisibility,
};