import type {Request, Response} from "express";

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
            return res.status(200).json({error: false, message: "Successfully SignUp User"})
        } catch (err) {
            console.log(err)
            return res.status(400).json({error: true, message: (err as Error).message || "Something went wrong!"})
        }
    },
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