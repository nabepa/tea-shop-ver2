import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'express-async-errors';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

export async function register(req, res) {
  const { email, password, firstName, lastName } = req.body;
  const found = await userRepository.findByEmail(email);
  if (found) {
    return res.status(409).json({ message: `${email} already exists` });
  }
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await userRepository.createUser({
    email,
    password: hashed,
    firstName,
    lastName,
  });
  const token = await createJwtToken(userId);
  setToken(res, token);
  res.status(201).json({ token, email, role: 0 });
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
  setToken(res, token);
  res.status(200).json({ token, email, role: found.role });
}

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

function setToken(res, token) {
  const options = {
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  };
  res.cookie('token', token, options); // HTTP-ONLY cookie
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
