// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import ProductController from './product.controller.js';
import {upload} from '../../middlewares/fileUpload.middleware.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';
// 2. Initialize Express router.
const productRouter = express.Router();
const productController = new ProductController();

productRouter.get(
    '/', 
(req,res)=>{
    productController.getAllProducts(req,res);
}
);
productRouter.get(
    '/filter',
    (req, res)=>{
      productController.filterProducts(req, res)
   }
  );
productRouter.post(
    '/', 
upload.single('imageUrl'), 
(req,res)=>{
    productController.addProduct(req,res);
});
productRouter.get('/:id',(req,res)=>{
    productController.getOneProduct(req,res);
});
productRouter.post(
    '/rate',jwtAuth,
    (req, res, next)=>{
      productController.rateProduct(req, res, next)
   }
  );
productRouter.get('/averageprice',(req,res)=>{
    productController.averagePrice(req,res)
});


export default productRouter;