import Interceptor from './Interceptor';

const url = "activity"

export async function getActivityOfUsers(pageSize, page, users) {
    try {
        const response = await Interceptor.get(`${url}/recent?pageSize=${pageSize}&pageNumber=${page}&usernames=${users}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}