import express from 'express'
import AuthController from "../controller/AuthController.ts";

const route = express.Router()

route.get('/current-user', AuthController.getCurrentUser)
route.post('/sign-up', AuthController.signUp)
route.post('/sign-in', AuthController.signIn)

export default route