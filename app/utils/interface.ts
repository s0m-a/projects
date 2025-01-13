export interface LoginResponse{
    token: string;
    userId: string
}

export interface UploadImageData {
    UserId: number;
    image_url:(url: string) => string;
    title: string;
    description: string;
}

export interface UploadImageResponse {
    status: string;
    message: string;
    data?: any; // Adjust based on your response structure
}

export interface RegisterUser {
    username: string;
    email: string; 
    password_hash: string;
}

export interface RegisterUserResponse {
    status: string;
    message: string;
    data?: any; // Adjust based on your response structure
}