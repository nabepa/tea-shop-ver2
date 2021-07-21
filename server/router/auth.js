import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const validateCredential = [
  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Password should be at least 5 characters'),
  validate,
];

const validateRegister = [
  ...validateCredential,
  body('name').notEmpty().withMessage('Name is missing'),
  body('url')
    .isURL()
    .withMessage('Invalid URL')
    .optional({ nullable: true, checkFalsy: true }),
  validate,
];

router.post('/register', validateRegister, authController.register);

router.post('/signin', validateCredential, authController.signin);

router.get('/me', isAuth, authController.me);

export default router;
