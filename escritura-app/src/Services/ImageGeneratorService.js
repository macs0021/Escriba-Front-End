import axios from 'axios';

const url = "https://e400-34-73-104-172.ngrok-free.app";

export async function generateImage(postData) {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios.post(`${url}/text2img`, postData, options);
    return response.data;
  } catch (error) {
    return error;
  }
}