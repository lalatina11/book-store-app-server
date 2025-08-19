import jwt from "jsonwebtoken";
import {ENV} from "../env.ts";
const AuthService = {
    generateToken: (userId:string) => {
        return jwt.sign({id:userId},ENV.SECRET_KEY,{
            expiresIn: '7d',
        })
    }
}

export default AuthService