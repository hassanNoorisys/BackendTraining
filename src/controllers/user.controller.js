import {
  checkUserService,
  loginUserService,
  registerUserService,
  verifyUserSevice,
} from '../services/user.sesrvice.js';
import expressAsyncHandler from 'express-async-handler';
import AppError from '../utils/AppError.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const registerUser = expressAsyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return next(new AppError('All Fields are mandatory', 400));

  const user = await registerUserService(req.body);

  res.status(201).json({ message: 'User created' });
});

const loginUser = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError('All Fields are mandatory', 400));

  const { token } = await loginUserService(req.body);

  res.status(200).json({ message: 'Logged in', token });
});

const sendEmail = expressAsyncHandler(async (req, res, next) => {
  const id = req.user;
  const { email } = req.body;

  if (!id) return next(new AppError('Something went wrong', 500));

  const isVerified = await checkUserService(id);

  if (isVerified)
    return res.status(200).json({ message: 'User is Already Verified' });

  const SECRET_KEY = process.env.SECRET_KEY;

  const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: '10m' });

  const verificationLink = `${process.env.BASE_URL}/api/user/verify-email?token=${token}`;

  // send email to verify
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_HOST = process.env.EMAIL_HOST;

  // console.log(EMAIL_HOST, EMAIL_PASS, EMAIL_USER)
  const transporter = nodemailer.createTransport({
    service: EMAIL_HOST,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Verify Email" <${EMAIL_USER}>`,
    to: email,
    subject: 'Email Verification',
    html: `<p>Please click the link to verify your email:</p>

           <a href="${verificationLink}">click to verify</a>`,
  });

  // console.log('send email -->', info)

  res.status(200).json({ message: 'Verification email sent', info });
});

const verifyEmail = expressAsyncHandler(async (req, res, next) => {
  const token = req.query.token;

  if (!token) return next(new AppError('Something went wrong', 500));

  const SECRET_KEY = process.env.SECRET_KEY;
  const decode = jwt.verify(token, SECRET_KEY);

  await verifyUserSevice(decode);

  res.status(200).json({ message: 'Email Verified successfully' });
});

export { registerUser, loginUser, sendEmail, verifyEmail };
