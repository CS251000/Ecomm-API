import dotenv from "dotenv";
dotenv.config();
import express from 'express';

import productRouter from './src/features/products/product.routes.js';
import userRouter from './src/features/users/user.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cartItems/cartItem.routes.js';
import swagger from 'swagger-ui-express';
import apiDocs from './swagger.json' assert {type: 'json'};
import cors from "cors";
import {connectToMongoDB} from './src/config/mongodb.js';



const server = express();

server.use(cors());
// server.use((req,res,next)=>{
//   res.header('Access-Control-Allow-Origin','http://localhost:5500');
//   res.header('Acess-Control-Allow-Headers','*');
//   res.header('Acess-Control-Allow-Methods','*');
//   if(req.method=='OPTIONS'){
//     res.sendStatus(200);
//   }
//   next();
// })

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
server.use((req,res)=>{
  res.status(404).send('API not found');
})

// 4. Specify port.
server.listen(3200,()=>{
  console.log('Server at 3200');
  connectToMongoDB();
});


