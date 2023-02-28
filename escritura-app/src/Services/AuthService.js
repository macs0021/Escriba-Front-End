
const registerUrl = "http://localhost:8080/user";
const loginUrl = "http://localhost:8080/login";

async function registerUser(user) {
    const options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(registerUrl, options);
        return response?.json();
    } catch (error) {
        return error;
    }
}
async function loginUser(user) {
    const options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {

        const response = await fetch(loginUrl, options);
        const bearerToken = response.headers.get('Authorization');
        console.log("token: " + bearerToken)
        const token = bearerToken.replace("Bearer ","");

        localStorage.setItem('token',token);
        
        return response;
        
    } catch (error) {
        return error;
    }
}


export default {
    registerUser, loginUser,
};