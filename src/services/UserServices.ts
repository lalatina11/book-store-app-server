import type {UserFields} from "../types";

const UserServices = {
    create: async (fields: UserFields) => {
        const {username, email, password} = fields;
        return {username, email, password};
    },
}

export default UserServices;