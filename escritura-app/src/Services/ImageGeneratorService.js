import axios from 'axios';

const url = "http://c8ea-34-86-131-171.ngrok.io";

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