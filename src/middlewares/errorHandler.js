export default (err, req, res, next) => {

    console.error('Error:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: err.status || 'error',
        message,
    });
}