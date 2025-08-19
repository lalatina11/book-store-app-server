import type {Request, Response} from "express";
import type {UserFields} from "../types";
import User from "../db/models/User.ts";
import AuthService from "../services/AuthServices.ts";

import emailValidator from "email-validator"
import UserServices from "../services/UserServices.ts";

const UserController = {
    getCurrentUser: async (req: Request, res: Response,) => {
        try {
            return res.status(200).json({error: false, message: "Successfully Current User"})
        } catch (err) {
            console.log(err)
            return res.status(400).json({error: true, message: (err as Error).message || "Something went wrong!"})
        }
    },
    signUp: async (req: Request, res: Response,) => {
        try {
            const {username, email, password} = await req.body as UserFields;
            if (!username && !password && !email) {
                throw new Error("Needs all required fields!");
            }
            if (!username.trim().length) {
                throw new Error("Username are required!");
            }
            const usernameRegex = /[^a-zA-Z0-9_-]/

            if (usernameRegex.test(username)) {
                throw new Error("Username cannot using special character except _ and -");
            }

            if (!email.trim().length) {
                throw new Error("Email are required!");
            }

            if (!emailValidator.validate(email)) {
                throw new Error("Invalid email address!");
            }

            if (!password || password.trim().length < 6) {
                throw new Error("Password must be at least 6 characters or more!");
            }
            const usedUsername = await User.findOne({username})

            if (usedUsername) {
                throw new Error("Username is already in use!");
            }
            const existingEmail = await User.findOne({email})
            if (existingEmail) {
                throw new Error("Email is already in use!");
            }

            const {password: pass, ...allUserInfoWithoutPassword} = await UserServices.create({
                username,
                email,
                password
            });
            const token = AuthService.generateToken(allUserInfoWithoutPassword._id.toString());
            return res.status(200).json({
                error: false,
                data: {user: allUserInfoWithoutPassword, token},
                message: "Successfully SignUp User"
            })
        } catch
            (err) {
            console.log(err)
            return res.status(400).json({error: true, message: (err as Error).message || "Something went wrong!"})
        }
    }
    ,
    signIn: async (req: Request, res: Response,) => {
        try {
            return res.status(200).json({error: false, message: "Successfully SignIn User"})
        } catch (err) {
            console.log(err)
            return res.status(400).json({error: true, message: (err as Error).message || "Something went wrong!"})
        }
    },
}

export default UserController