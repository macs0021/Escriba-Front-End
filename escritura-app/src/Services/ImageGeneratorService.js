async function postImg(postData) {
    const options = {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch('http://3391-34-126-131-38.ngrok.io/text2img', options);
        return response?.json();
    } catch (error) {
        return error;
    }
}
export default {
    postImg,
};