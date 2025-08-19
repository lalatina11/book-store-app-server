import type {UserFields} from "../types";
import User from "../db/models/User.ts";

const UserRepository = {
    create: async (fields: UserFields) => {
        const {username, email, password, avatar} = fields;
        const newUser = new User({email, password, username, avatar})
        const user= await newUser.save()
        return user.toObject()
    },
}

export default UserRepository