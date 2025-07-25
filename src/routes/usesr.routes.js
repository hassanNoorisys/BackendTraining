import { Router } from 'express';
import {
  registerUser,
  loginUser,
  sendEmail,
  verifyEmail,
} from '../controllers/user.controller.js';
import verifyUser from '../middlewares/verifyUser.js';

const route = Router();

route.post('/register', registerUser).post('/login', loginUser);

route.post('/send-email', verifyUser, sendEmail);

route.get('/verify-email', verifyEmail);

export default route;
