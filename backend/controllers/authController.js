import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt, { decode } from 'jsonwebtoken'




class AuthController{
    static SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';
    static EXPIRATION = process.env.EXPIRATION || '1h'
    static REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY || 'your_refresh_secret_key';
    static REFRESH_EXPIRATION = process.env.REFRESH_EXPIRATION || '7d'
    static generateToken(userId) {
        const refreshtoken = jwt.sign({id:userId}, this.REFRESH_SECRET_KEY, {expiresIn: this.REFRESH_EXPIRATION})
        const accesstoken = jwt.sign({ id: userId }, this.SECRET_KEY, { expiresIn: this.EXPIRATION });
        return {accesstoken, refreshtoken}
    }
    
    

    static async signUp(data){
            const { username, email, password_hash } = data;

          for (const key of ['username','email','password_hash']){
                if(!data[key]){
                    return ({status: 'error', message:`feild ${key} is required`});
                }
            }
            if (await User.findOne({where: {username}})){
                return ({status: 'error', message:`username already exists`});
            }
    

           if (await User.findOne({where: {email}})){
            return ({status: 'error', message:`email already exists`});
           }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
        if(!passwordRegex.test(password_hash))
        {
            return ({status: 'error', message:`password must be 8-20 characters long and contain at least one letter and one number`});
        }
    
        const hashedPassword = await bcrypt.hash(password_hash, 10);
           const createData = {
            username,
            email,
            password_hash : hashedPassword,
           };
           
    
           try {
    
            const user = await User.create(createData);
            return ({status: 'success', message:`user created`, id: user.id});
    
           } catch (error) {
            console.error('error creating user, error:',error);
            return ({status: 'error', message:"failed to create user"});
           }
    }
    
    static async logIn(data){
        const {username, password} = data;
        for(const key of ['username', 'password']){
            if(!data[key]){
                return ({status: 'error', message:`feild ${key} is required`});
            }
        }
        const user = await User.findOne({where: {username}});
        if(!user){
            return ({status: 'error', message:`username or password is not correct`});
        };
    
        const comparePassword = await bcrypt.compare(password, user.password_hash);
        if(!comparePassword){
            return ({status: 'error', message:`username or password is not correct`});
        };
    /**
     * generating token
     */
    const token = this.generateToken(user.id);
    return ({ status: 'success', 
        message: `Welcome back ${user.username},`, 
        token,
        userId: user.id });
            
    }
    


}

export default AuthController;