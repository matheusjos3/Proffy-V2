import express from 'express';

import ClassesController from './controllers/ClassesController';
import UserController from './controllers/UserController';
import UserPasswordController from './controllers/UserPasswordController';

import autenticate from './middlewares/auth'

const routes = express.Router()
const userController = new UserController()
const classesController = new ClassesController()
const userPasswordController = new UserPasswordController()

routes.post('/login', userController.login)
routes.post('/user', userController.create)
routes.get('/user', userController.getUserData)
routes.put('/user', userController.updateUser)

routes.post('/forgot_password', userPasswordController.forgotPassword)
routes.put('/reset_password', userPasswordController.resertPassword)

routes.get('/classes', classesController.index)
routes.post('/classes', classesController.create)

export default routes;