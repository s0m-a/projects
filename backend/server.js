import dbStorage from "./lib/db.js";
import express  from 'express';
import {User, Image} from './models/assoModel.js'
import AuthController from './controllers/authController.js'
import ImageController from './controllers/imageController.js'
import authenticateJWT  from './middleware/authMiddleware.js'
import  cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.post('/api/auth/register',async (req, res)=>{
    const { username, email, password_hash} = req.body;
    try {
        const response = await AuthController.signUp({username, email, password_hash});
        if(response.status === "success"){
            res.status(201).json(response);
        }else{
            res.status(400).json(response);
        }

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({status: 'false', message: 'server error'});
    }
} )


app.post('/api/auth/login',async (req, res)=>{
    const { username, password} = req.body;
    try {
        const response = await AuthController.logIn({username, password});
        if(response.status === "success"){
            res.cookie('refreshToken', response.token.refreshtoken, 
                { httpOnly: true, secure: process.env.NODE_ENV === 'production', 
                    maxAge: 7 * 24 * 60 * 60 * 1000 }); 
                       // Create a response object including accessToken and message
                       const responseData = {
                        accessToken: response.token.accesstoken,
                        message: response.message, // Include the welcome message
                        userId: response.userId // Optionally include the user ID if needed
                    };
            res.status(201).json(responseData);
        }else{
            const message = response.message;
            res.status(400).json(response);
            return message;
        }

    } catch (error) {
        console.error('login error:', error);
        res.status(500).json({status: 'false', message: 'server error'});
    }
} )

app.post('/api/image/upload',async (req, res)=>{
    const { UserId, image_url, title, description} = req.body;
    try {
        const response = await ImageController.addImage({ UserId,image_url, title, description});
        if(response.status === "success"){
            res.status(201).json(response);
        }else{
            res.status(400).json(response);
        }

    } catch (error) {
        console.error('image uplaod error error:', error);
        res.status(500).json({status: 'false', message: 'server error'});
    }
} )



app.get('/api/image/retrieve',authenticateJWT,async (req, res)=>{
    const userId =  req.user.id;
    try {
        const response = await ImageController.retrieve(userId);
        if(response.status === "success"){
            res.status(200).json(response);
        }else{
            res.status(400).json(response);
        }

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({status: 'false', message: 'server error'});
    }
} )


app.post('/refresh-token', (req, res) => {
    const { refreshToken } = req.cookies; // Get refresh token from cookie
    if (!refreshToken) return res.sendStatus(401); // Unauthorized

    jwt.verify(refreshToken, AuthController.REFRESH_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('Invalid refresh token', err);
            return res.sendStatus(403); // Forbidden
        }
        // Generate a new access token
        const accessToken = AuthController.generateTokens(decoded.id).accessToken;
        res.json({ accessToken });
    });
});

app.listen(PORT, async ()=>{
    const isAlive = await  dbStorage.checklife();
    if(!isAlive){
        console.error('database connection failed, server can not start')
        return
    }
    try {
        await dbStorage.sync(false);
        console.log('database and tables created successfully')
    } catch (error) {
        console.error('Erroor syncing the database:', error);
    }
    console.log(`server running at port ${PORT}`)
} )