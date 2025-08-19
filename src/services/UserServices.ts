import type {UserFields} from "../types";
import {hashSync} from "bcrypt-ts";
import UserRepository from "../repositories/UserRepository.ts";

const UserServices = {
    create: async (fields: UserFields) => {
        const {username, email, password: passwordFromInput} = fields;
        if (!passwordFromInput) {
            throw new Error("Password is required!");
        }
        const regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])/;
        if (!regexPassword.test(passwordFromInput)) {
            throw new Error("Password must have at least one number and one special character!");
        }
        const password = hashSync(passwordFromInput, 10);
        const avatar = "https://api.dicebear.com/9.x/adventurer/svg?seed=" + username;
        const {password: pass, ...allUserInformationWithoutPassword} = await UserRepository.create({
            username,
            email,
            password,
            avatar
        })
        return allUserInformationWithoutPassword;
    },
}

export default UserServices;