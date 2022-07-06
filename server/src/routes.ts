import express from 'express';

import ClassesController from './controllers/ClassesController';
import UserController from './controllers/UserController';
import UserPasswordController from './controllers/UserPasswordController';
import FavoriteController from './controllers/favoritesController';
import ConnectionsController from './controllers/ConnectionsController';
import AuthenticationController from './controllers/AuthenticationController';

import autenticate from './middlewares/auth'
import ScheduleController from './controllers/ScheduleController';

const routes = express.Router()
const userController = new UserController()
const classesController = new ClassesController()
const userPasswordController = new UserPasswordController()
const favoriteControler = new FavoriteController()
const scheduleController = new ScheduleController();
const connectionsController = new ConnectionsController();
const authenticationController = new AuthenticationController();

routes.post('/login', authenticationController.login)
routes.post('/user', userController.create)
routes.get('/user', autenticate, userController.getUserData)
routes.put('/user', autenticate, userController.updateUser)

routes.post('/forgot_password', userPasswordController.forgotPassword)
routes.put('/reset_password', userPasswordController.resetPassword)

routes.get('/classes', autenticate, classesController.index)
routes.post('/classes', autenticate, classesController.create)
routes.get('/count-classes', autenticate, classesController.numberOfclasses)

routes.get('/favorites', autenticate, favoriteControler.index)
routes.post('/favorites', autenticate, favoriteControler.add)
routes.delete('/favorites', autenticate, favoriteControler.remove)

routes.get('/connections', autenticate, connectionsController.index)
routes.post('/connections', autenticate, connectionsController.create)

routes.put('/refresh-token', authenticationController.refreshToken)

routes.post('/schedule', autenticate, scheduleController.addSchedule)
routes.delete('/schedule', autenticate, scheduleController.removeSchedule)

export default routes;