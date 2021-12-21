import express from 'express';
import UserController from './controllers/UserController';
import autenticate from './middlewares/auth'

const routes = express.Router()
const userController = new UserController()

routes.post('/login', userController.login)
routes.post('/user', userController.create)
routes.get('/user', autenticate, userController.get)

export default routes;