
import express from 'express';
import productRouter from './src/features/products/product.routes.js';
import userRouter from './src/features/users/user.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cartItems/cartItem.routes.js';
import swagger from 'swagger-ui-express';
import apiDocs from './swagger.json' assert {type: 'json'};


const server = express();

server.use(express.json());
server.use("/api-docs", 
swagger.serve, 
swagger.setup(apiDocs))

server.use(
  '/api/products',
  jwtAuth,
  productRouter
);
server.use('/api/users', userRouter);
server.use('/api/cartItems',jwtAuth,cartRouter);

// 3. Default request handler
server.get('/', (req, res) => {
  res.send('Welcome to Ecommerce APIs');
});

// 4. Specify port.
server.listen(3200);

console.log('Server is running at 3200');
