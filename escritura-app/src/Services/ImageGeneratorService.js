import axios from 'axios';

const url = process.env.REACT_APP_IMAGE_GENERATOR_API_URL;

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