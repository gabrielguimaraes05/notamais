import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import userController from './app/controllers/UserController';
import sessionController from './app/controllers/SessionController';
import fileController from './app/controllers/FileController';
import orderController from './app/controllers/OrderController';
import offerController from './app/controllers/OfferController';

const routes = new Router();
const file = multer(multerConfig);

routes.get('/', (req, res) => {
  res.json({ response: 'UP' });
});

routes.post('/users', userController.store);
routes.post('/sessions', sessionController.store);

routes.use(authMiddleware);
routes.put('/users', userController.update);
routes.get('/users', userController.index);

routes.post('/files', file.single('file'), fileController.store);
routes.delete('/files/:id', fileController.delete);
routes.get('/files/:id', fileController.index);


routes.post('/orders', orderController.store);
routes.put('/orders/:orderId', orderController.update);
routes.delete('/orders/:orderId', orderController.delete);
// routes.get('/orders/:userId', orderController.index);
routes.get('/orders/:orderId', orderController.findOne);
routes.get('/orders', orderController.show);
routes.get('/orders/:orderId/user/:userId', orderController.canBid);

routes.post('/offers', offerController.store);
routes.get('/offers/:orderId', offerController.index);

export default routes;
