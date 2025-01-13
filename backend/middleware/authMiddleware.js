// middleware/authMiddleware.js
import  jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SECRET_KEY

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('please log in, error:', err);
                return { status: 'error', message: "you dont have access" };
            }
            req.user = decoded;
            next();
        });
    } else {
        console.error('you can not access this site, error:');
        return { status: 'error', message: "private section" };
    }
};

export default authenticateJWT;
