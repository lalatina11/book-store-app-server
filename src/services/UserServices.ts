import type {UserFields} from "../types";
import {hashSync} from "bcrypt-ts";
import UserRepository from "../repositories/UserRepository.ts";

const UserServices = {
    create: async (fields: UserFields) => {
        const {username, email, password: passwordFromInput} = fields;
        if (!passwordFromInput) {
            throw new Error("Password is required!");
        }
        const password = hashSync(passwordFromInput, 10);
        const avatar = "https://api.dicebear.com/9.x/adventurer/svg?seed=" + username;
        return await UserRepository.create({username, email, password, avatar});
    },
}

export default UserServices;