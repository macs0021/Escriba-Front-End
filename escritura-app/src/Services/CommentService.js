import Interceptor from './Interceptor';

const url = 'comments';

export async function getReviewsOfDocument(documentID) {
    try {
        const response = await Interceptor.get(`${url}/${documentID}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function postComment(comment) {
    try {
        console.log(JSON.stringify(comment))
        const response = await Interceptor.post(`${url}`, JSON.stringify(comment));
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function putComment(commentId, updatedComment) {
    try {
        const response = await Interceptor.put(`${url}/${commentId}`, JSON.stringify(updatedComment));
        return response.data;
    } catch (error) {
        console.error(error);
    }
}