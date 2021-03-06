import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { resolve } from 'path';
import bodyParser from 'body-parser';
import routes from './routes';
import './database/index';

class AppController {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(morgan('dev'));
    this.server.use('/files', express.static(resolve(__dirname, '..', 'tmp', 'uploads')));
    this.server.use(bodyParser.urlencoded({ extended: false }));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new AppController().server;
