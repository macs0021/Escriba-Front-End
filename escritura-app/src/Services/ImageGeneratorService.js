import axios from 'axios';

const url = "https://e400-34-73-104-172.ngrok-free.app";

async function postImg(postData) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try {
        const response = await axios.post(url + '/text2img', postData, options);
        return response.data;
    } catch (error) {
        return error;
    }
}

export default {
    postImg,
};