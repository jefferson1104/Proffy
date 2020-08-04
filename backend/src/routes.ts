import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';


const routes = express.Router();
const classesControllers = new ClassesController();
const connectionsController = new ConnectionsController();

//Rota de listagem de aula http://localhost:3333/classes
routes.get('/classes', classesControllers.index);

//Rota de criação de aula http://localhost:3333/classes
routes.post('/classes', classesControllers.create);

//Rota para criação de conexões
routes.post('/connections', connectionsController.create);

//Rota para Listar o total de conexões
routes.get('/connections', connectionsController.index);

export default routes;