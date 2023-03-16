
import Interceptor from './Interceptor';

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

export default {
    getDocumentById,
    putDocument,
    postDocument,
    getAllDocuments,
    getDocumentsByUsername,
    deleteDocument,
};