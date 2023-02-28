
const url = "http://localhost:8080/documents";
const token = localStorage.getItem('token');

console.log(token);

async function getDocumentById(id) {

    const options = {
        headers: {
          'Authorization': "Bearer " + token
        }
      };

    const data = await fetch(url + `/${encodeURIComponent(id)}`,options);
    return data?.json();
}

async function putDocument(document) {
    const options = {
        method: 'PUT',
        body: JSON.stringify(document),
        headers: {
            'Authorization': "Bearer " + token,
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(url, options); 
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
            'Authorization': "Bearer " + token,
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(url, options);
        return response?.json();
    } catch (error) {
        return error;
    }
}

async function getAllDocuments() {

    const options = {
        headers: {
          'Authorization':"Bearer " + token
        }
      };

    try {
        const response = await fetch(url,options);
        return response?.json();
    } catch (error) {
        return [];
    }
}

export default {
    getDocumentById, putDocument, postDocument,getAllDocuments,
};