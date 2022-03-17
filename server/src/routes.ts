import express from 'express';
import ClassesController from './controllers/ClassesController';
import UserController from './controllers/UserController';
import autenticate from './middlewares/auth'

const routes = express.Router()
const userController = new UserController()
const classesController = new ClassesController()

routes.post('/login', userController.login)
routes.post('/user', userController.create)
routes.get('/user', userController.getUserData)
routes.put('/user', userController.updateUser)

routes.get('/classes', classesController.index)
routes.post('/classes', classesController.create)

export default routes;