const API_URL = 'http://localhost:5001/api/';
import { LoginResponse, UploadImageData, UploadImageResponse, RegisterUser, RegisterUserResponse } from "./interface";


export const loginUser = async (username:string, password:string): Promise<LoginResponse> =>{
    console.log('Request Body:', { username, password });
    const response = await fetch (`${API_URL}auth/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
    });

let respondData;
try {
    respondData = await response.json();
} catch (error) {
    console.error('failed to parse json respons:', error)
    throw new Error('invailed response from the server')
}
if(!response.ok){
    console.error('login failed', respondData);
    throw new Error(respondData?.message || 'failed to log in')
}
return respondData;
}

export const uploadImage = async (data:UploadImageData): Promise<UploadImageResponse> =>{
    const response = await fetch (`${API_URL}image/upload`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
        // Log raw response for debugging
        const rawText = await response.text();
        console.log("Raw server response:", rawText);
let respondData;
try {
    respondData = JSON.parse(rawText);

} catch (error) {
    console.error('failed to parse json respons:', error)
    throw new Error('invailed response from the server')
}
if(!response.ok){
    console.error('image upload failed', respondData);
    throw new Error(respondData?.message || 'failed to upload image')
}
return respondData;
}


export const registerUser = async (data:RegisterUser):Promise<RegisterUserResponse> => {
const response = await fetch (`${API_URL}auth/register`,{
    method: 'POST',
    headers:{
        'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
});
const rawText = await response.text();
let respondData;
try {
    respondData = JSON.parse(rawText);
} catch (error) {
    console.error('failed to parse json respons:', error)
    throw new Error('invailed response from the server')
}
if(!response.ok){
    console.error('registering user failed', respondData);
    throw new Error(respondData?.message || 'failed to register user')
}
return respondData;
}
