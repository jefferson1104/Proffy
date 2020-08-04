import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

//Acesso a api para as camadas de frontend e mobile
app.use(cors());

//plugin para entender request json e converter em JS
app.use(express.json());

//Rotas da aplicação
app.use(routes);

//http://localhost:3333
app.listen(3333);

