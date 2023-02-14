async function getDocumentById(id) {
    const data = await fetch(`http://localhost:8080/api/documents/${encodeURIComponent(id)}`);
    return data?.json();
}

async function putDocument(document) {
    const options = {
        method: 'PUT',
        body: JSON.stringify(document),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch('http://localhost:8080/api/documents', options);
        return response?.json();
    } catch (error) {
        return error;
    }
}

async function postDocument(document) {
    const options = {
        method: 'POST',
        body: JSON.stringify(document),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch('http://localhost:8080/api/documents', options);
        return response?.json();
    } catch (error) {
        return error;
    }
}

export default {
    getDocumentById, putDocument,postDocument,
};