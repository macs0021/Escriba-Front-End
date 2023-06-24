import Interceptor from './Interceptor';
import { getUsername } from './TokenService';

const url = "documents";

export async function getDocumentById(id) {
  try {
    const response = await Interceptor.get(`${url}/${encodeURIComponent(id)}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("El token expiró. Actualizando token...");
    } else {
      console.log("Ocurrió un error al obtener el documento:", error);
    }
  }
}

export async function postDocument(document) {
  try {
    const response = await Interceptor.post(url, JSON.stringify(document));
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("El token expiró. Actualizando token...");
    } else {
      console.log("Ocurrió un error al obtener el documento:", error);
    }
  }
}

export async function putDocument(documentId, document) {
  try {
    const response = await Interceptor.put(`${url}/${documentId}`, JSON.stringify(document));
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("El token expiró. Actualizando token...");
    } else {
      console.log("Ocurrió un error al obtener el documento:", error);
    }
  }
}

export async function getAllDocuments(page, pageSize) {
  try {
    console.log(`${url}/all?page=${page}&pageSize=${pageSize}`);
    const response = await Interceptor.get(`${url}/all?page=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function getDocumentsByUsername(username) {
  try {
    const response = await Interceptor.get(url + "/user/" + username);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("El token expiró. Actualizando token...");
    } else {
      console.log("Ocurrió un error al obtener el documento:", error);
    }
    return [];
  }
}

export async function deleteDocument(documentId) {
  console.log("BORRANDO");
  try {
    const response = await Interceptor.delete(url + "/" + documentId);
    console.log("BORRANDO: " + documentId);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("El token expiró. Actualizando token...");
    } else {
      console.log("Ocurrió un error al obtener el documento:", error);
    }
  }
}

export async function userSavesDocument(documentId) {
  try {
    const response = await Interceptor.post(url + "/saved/" + getUsername() + "?savedDocument=" + documentId);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("El token expiró. Actualizando token...");
    } else {
      console.log("Ocurrió un error al obtener el documento:", error);
    }
  }
}

export async function userUnsavesDocument(documentId) {
  try {
    const response = await Interceptor.delete(url + "/saved/" + getUsername() + "?savedDocument=" + documentId);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("El token expiró. Actualizando token...");
    } else {
      console.log("Ocurrió un error al obtener el documento:", error);
    }
  }
}

export async function getDocumentsSavedByUsername() {
  try {
    const response = await Interceptor.get(url + "/saved/" + getUsername());
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("El token expiró. Actualizando token...");
    } else {
      console.log("Ocurrió un error al obtener el documento:", error);
    }
    return [];
  }
}

export async function getDocumentsReadByUsername() {
  try {
    const response = await Interceptor.get(url + "/read/" + getUsername());
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("El token expiró. Actualizando token...");
    } else {
      console.log("Ocurrió un error al obtener el documento:", error);
    }
    return [];
  }
}

export async function getDocumentsByGenreAndPage(genres, tittleFragment, page, pageSize) {
  try {
    const response = await Interceptor.get(`${url}/genres?genres=${genres.join(',')}&tittleFragment=${tittleFragment}&page=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("El token expiró. Actualizando token...");
    } else {
      console.log("Ocurrió un error al obtener el documento:", error);
    }
    return [];
  }
}

export async function changeVisibility(documentId) {
  try {
    const response = await Interceptor.patch(`${url}/${documentId}/visibility`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("El token expiró. Actualizando token...");
    } else {
      console.log("Ocurrió un error al obtener el documento:", error);
    }
    return [];
  }
}

export async function getPrivateDocumentsByUsername(username) {
  try {
    const response = await Interceptor.get(url + "/private/" + username);
    return response.data;
  } catch (error) {
    console.log("Esperando al refresco del token");
    return [];
  }
}

export async function getPublicDocumentsByUsername(username) {
  try {
    const response = await Interceptor.get(url + "/public/" + username);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("El token expiró. Actualizando token...");
    } else {
      console.log("Ocurrió un error al obtener el documento:", error);
    }
    return [];
  }
}

export async function getRecommendation() {
  try {
    const response = await Interceptor.get(url + "/recommendation");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("El token expiró. Actualizando token...");
    } else {
      console.log("Ocurrió un error al obtener el documento:", error);
    }
    return [];
  }
}

export async function checkOwner(documentID) {
  try {
    const response = await Interceptor.get(url + "/checkOwner/" + documentID);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("El token expiró. Actualizando token...");
    } else {
      console.log("Ocurrió un error al obtener el documento:", error);
    }
    return [];
  }
}

export async function checkPublic(documentID) {
  try {
    const response = await Interceptor.get(url + "/checkPublic/" + documentID);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("El token expiró. Actualizando token...");
    } else {
      console.log("Ocurrió un error al obtener el documento:", error);
    }
    return [];
  }
}