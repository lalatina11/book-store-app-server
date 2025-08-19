import jwt from "jsonwebtoken";
import {ENV} from "../env.ts";
import UserRepository from "../repositories/UserRepository.ts";
import {compareSync} from "bcrypt-ts";
import type {UserFields} from "../types";

const AuthService = {
    generateToken: (userId: string) => {
        return jwt.sign({id: userId}, ENV.SECRET_KEY, {
            expiresIn: '7d',
        })
    },
    checkCredentials: async ({identifier, password}: Partial<UserFields & { identifier: string }>) => {
        if (!identifier || !identifier.trim().length || !password || !password.trim().length) {
            throw new Error(`Please Provide the required credentials.`)
        }
        const findUser = await UserRepository.findByUsernameOrEmail(identifier)
        if (!findUser) {
            throw new Error(`User Not found!`)
        }
        if (!findUser.password) {
            throw new Error(`It seems like you registered using Google, please login with Google`)
        }
        const validatedPassword = compareSync(password, findUser.password)
        if (!validatedPassword) {
            throw new Error(`Invalid Password!`)
        }
        const {password: pass, ...allUserInformationWithoutPassword} = findUser
        return allUserInformationWithoutPassword
    }
}

export default AuthService