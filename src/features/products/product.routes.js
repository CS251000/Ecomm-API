// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import ProductController from './product.controller.js';
import {upload} from '../../middlewares/fileUpload.middleware.js';
// 2. Initialize Express router.
const productRouter = express.Router();
const productController = new ProductController();

productRouter.get(
    '/', 
productController.getAllProducts
);
productRouter.get("/filter",productController.filterProducts);
productRouter.post(
    '/', 
upload.single('imageUrl'), 
productController.addProduct);
productRouter.get('/:id',productController.getOneProduct);
productRouter.post('/rate',productController.rateProduct);
export default productRouter;