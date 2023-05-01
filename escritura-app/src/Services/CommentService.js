import Interceptor from './Interceptor';

const url = 'comments';


export async function getReviewByID(reviewID) {
    try {
        const response = await Interceptor.get(`${url}/reviews/${reviewID}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getReplyByID(replyID) {
    try {
        const response = await Interceptor.get(`${url}/responses/${replyID}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
export async function getReviewsOfDocument(documentID) {
    try {
        const response = await Interceptor.get(`${url}/${documentID}/review`);
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

export async function deleteComment(commentId) {
    try {
        const response = await Interceptor.delete(`${url}/${commentId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getRepliesOfReview(reviewID) {
    try {
        const response = await Interceptor.get(`${url}/${reviewID}/replies`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}