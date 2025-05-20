
import jwt from 'jsonwebtoken';
import usersModel from '../models/user.model.js';

export const register = async (req, res) => {
  const { username, email, password } = req.body || {};

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await usersModel.findByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const existingUsername = await usersModel.findByUsername(username);
  if (existingUsername) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const newUser = await usersModel.create({ username, email, password });

  const token = jwt.sign(
    { uid: newUser.id, username: newUser.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.status(201).json({ username: newUser.username, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await usersModel.findByEmail(email);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await usersModel.comparePasswords(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const token = jwt.sign(
    { uid: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.status(200).json({ username: user.username, token });
};
