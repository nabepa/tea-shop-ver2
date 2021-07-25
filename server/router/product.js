import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as productController from '../controller/product.js';
import { isAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateProduct = [
  body('category')
    .custom(
      (value) => value === 'green' || value === 'rooibos' || value === 'herbal'
    )
    .withMessage('Undefined category.'),
  body('name') //
    .trim()
    .notEmpty()
    .withMessage('Name is missing.'),
  body('price')
    .isFloat({ min: 0.99 })
    .withMessage('Price should be at least $0.99.'),
  body('stock')
    .isFloat({ min: 0 })
    .custom((value) => value % 500 === 0)
    .withMessage('Stock should be in 500g increments.'),
  body('description') //
    .trim()
    .notEmpty()
    .withMessage('Description is missing.'),
  body('image') //
    .isURL()
    .withMessage('Invalid Image URL.'),
  validate,
];

router.get('/', productController.getProducts);

router.get('/:id', productController.getProduct);

router.post('/', isAuth, validateProduct, productController.createProduct);

router.put('/:id', isAuth, validateProduct, productController.updateProduct);

router.delete('/:id', isAuth, productController.removeProduct);

export default router;
