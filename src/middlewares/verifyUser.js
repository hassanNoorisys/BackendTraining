import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';

const verifyUser = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  // console.log(token)

  if (!token) return next(new AppError('Unauthorized', 401));

  const SECRET_KEY = process.env.SECRET_KEY;

  const valid = jwt.verify(token, SECRET_KEY);

  if (!valid) return next(new AppError('Unauthorized', 401));

  req.user = valid;

  next();
};

export default verifyUser;
