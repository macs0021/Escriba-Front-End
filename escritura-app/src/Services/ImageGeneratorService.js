import axios from 'axios';

const url = "http://628c-35-240-162-130.ngrok.io";

async function postImg(postData) {
    const options = {
        headers: {
            'Content-Type': 'application/json'
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