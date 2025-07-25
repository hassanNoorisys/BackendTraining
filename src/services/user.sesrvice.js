import AppError from '../utils/AppError.js';
import prisma from '../../config/db.config.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuid4 } from 'uuid';

const registerUserService = async (userData) => {
  const { name, email, password } = userData;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    throw new AppError('User Already Registered', 400);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      id: uuid4(),
      name,
      email,
      password: hashPassword,
    },
  });
  return newUser;
};

const loginUserService = async (userData) => {
  const { email, password } = userData;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError('User not present', 404);
  }

  const valid = bcrypt.compare(password, user.password);

  if (!valid) {
    throw new AppError('Invalid Credentals', 402);
  }

  const SECRET_KEY = process.env.SECRET_KEY;
  const token = jwt.sign(user.id, SECRET_KEY);

  return { token };
};

const checkUserService = async (userData) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userData,
    },
  });

  if (!user) throw new AppError('User not present', 404);

  if (user.isVerified) return true;

  return false;
};

const verifyUserSevice = async (userData) => {
  const { id } = userData;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) throw new AppError('User not present', 404);

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      isVerified: true,
    },
  });
};

export {
  registerUserService,
  loginUserService,
  checkUserService,
  verifyUserSevice,
};
