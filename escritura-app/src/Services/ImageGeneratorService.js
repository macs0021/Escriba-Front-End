import axios from 'axios';

const url = "http://10e7-35-245-209-14.ngrok.io";

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