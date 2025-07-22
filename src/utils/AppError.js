
function AppError(message, statusCode) {
  const error = new Error(message);

  error.statusCode = statusCode || 500;
  error.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
  error.isOperational = true;

  Error.captureStackTrace(error, AppError);

  return error;
}

export default AppError
