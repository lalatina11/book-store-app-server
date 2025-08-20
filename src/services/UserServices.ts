import type { UserFields } from "../types";
import bcrypt from "bcryptjs";
import UserRepository from "../repositories/UserRepository.ts";

const UserServices = {
    create: async (fields: UserFields) => {
        const { username, email, password: passwordFromInput } = fields;
        if (!passwordFromInput) {
            throw new Error("Password is required!");
        }
        const regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])/;
        if (!regexPassword.test(passwordFromInput)) {
            throw new Error("Password must have at least one number and one special character!");
        }
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(passwordFromInput, salt); const avatar = "https://api.dicebear.com/9.x/adventurer/svg?seed=" + username;
        const { password: pass, ...allUserInformationWithoutPassword } = await UserRepository.create({
            username,
            email,
            password,
            avatar
        })
        return allUserInformationWithoutPassword;
    },
    findUserByUsername: async (username: string) => {
        const user = await UserRepository.findByUsername(username);
        if (!user) return null;
        const { password, ...allUserInformationWithoutPassword } = user
        return allUserInformationWithoutPassword;
    },
    findUserByEmail: async (email: string) => {
        const user = await UserRepository.findByEmail(email);
        if (!user) return null;
        const { password, ...allUserInformationWithoutPassword } = user
        return allUserInformationWithoutPassword;
    },
    findByUsernameOrEmail: async (identifier: string) => {
        const user = await UserRepository.findByUsernameOrEmail(identifier);
        if (!user) return null;
        const { password, ...allUserInformationWithoutPassword } = user
        return allUserInformationWithoutPassword;
    },
}

export default UserServices;