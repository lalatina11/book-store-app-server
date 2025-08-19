import {ENV} from "./env";

import type {Response} from "express"
import express from "express"
import cors from "cors"
import AuthRouter from "./router/AuthRouter.ts";

const allowedOrigin = ["http://localhost:8081"]

const app = express()

app.use(express.json())
app.use(cors({
    credentials: true, origin: (origin, callback) => {
        if (!origin || allowedOrigin.includes(origin)) {
            return callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }, allowedHeaders: "*"
}))

app.use('/api/auth', AuthRouter)

app.get("/", (_, res: Response) => {
    return res.json({error: false, message: "IT IS WORK, YOU DID IT!"})
})

app.listen(ENV.PORT, async () => {
    console.log("Server is running on port: " + ENV.PORT)
})