import mongoose from "mongoose"
import {ENV} from "../env.ts";

export const DbConnection = async () => {
    try {
        const connection = await mongoose.connect(ENV.DATABASE_URL)
        console.log('Database connected on HOST: '+connection.connection.host)
        return connection

    } catch (err) {
        console.log(err)
        return null
    }
}
