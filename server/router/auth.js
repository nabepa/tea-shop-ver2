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
    .isLength({ min: 6, max: 14 })
    .withMessage(
      'Password should be at least 6 but no more than 14 characters'
    ),
  validate,
];

const validateRegister = [
  ...validateCredential,
  body('firstName').trim().notEmpty().withMessage('First name is missing'),
  body('lastName').trim().notEmpty().withMessage('Last name is missing'),
  validate,
];

router.post('/register', validateRegister, authController.register);

router.post('/signin', validateCredential, authController.signin);

router.get('/me', isAuth, authController.me);

export default router;
