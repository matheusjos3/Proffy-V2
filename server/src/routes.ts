import express from 'express';

import ClassesController from './controllers/ClassesController';
import UserController from './controllers/UserController';
import UserPasswordController from './controllers/UserPasswordController';
import FavoriteController from './controllers/favoritesController';
import ConnectionsController from './controllers/ConnectionsController';

import autenticate from './middlewares/auth'

const routes = express.Router()
const userController = new UserController()
const classesController = new ClassesController()
const userPasswordController = new UserPasswordController()
const favoriteControler = new FavoriteController()
const connectionsController = new ConnectionsController();

routes.post('/login', userController.login)
routes.post('/user', userController.create)
routes.get('/user', userController.getUserData)
routes.put('/user', userController.updateUser)

routes.post('/forgot_password', userPasswordController.forgotPassword)
routes.put('/reset_password', userPasswordController.resertPassword)

routes.get('/classes', classesController.index)
routes.post('/classes', classesController.create)

routes.get('/favorites', favoriteControler.index)
routes.post('/favorites', favoriteControler.add)
routes.delete('/favorites', favoriteControler.remove)

routes.get('/connections', connectionsController.index)
routes.post('/connections', connectionsController.create)

export default routes;