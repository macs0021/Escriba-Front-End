
const url = "http://10e7-35-245-209-14.ngrok.io";

async function postImg(postData) {
    const options = {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch( url +'/text2img', options);
        return response?.json();
    } catch (error) {
        return error;
    }
}
export default {
    postImg,
};