import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'express-async-errors';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

export async function register(req, res) {
  const { email, password, name, image } = req.body;
  const found = await userRepository.findByEmail(email);
  if (found) {
    return res.status(409).json({ message: `${email} already exists` });
  }
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await userRepository.createUser({
    email,
    password: hashed,
    name,
    image,
  });
  const token = await createJwtToken(userId);
  res.status(201).json({ token });
}

export async function signin(req, res) {
  const { email, password } = req.body;
  const found = await userRepository.findByEmail(email);
  if (!found) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const isValidPassword = await bcrypt.compare(password, found.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const token = createJwtToken(found.id);
  res.status(200).json({ token });
}

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

export async function me(req, res) {
  const found = await userRepository.findById(req.userId);
  if (!found) {
    return res.status(404), json({ message: 'User not found' });
  }
  res
    .status(200)
    .json({ token: req.token, email: found.email, role: found.role });
}
