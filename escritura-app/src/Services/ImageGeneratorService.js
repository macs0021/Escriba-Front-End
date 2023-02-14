async function postImg(postData) {
    const options = {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch('http://c028-34-141-250-205.ngrok.io/text2img', options);
        return response?.json();
    } catch (error) {
        return error;
    }
}
export default {
    postImg,
};