const catchError = ({ res, err }) => {
  let statusCode = 500;
  let error = "Server Error";

  if (err.statusCode) {
    ({ statusCode } = err);
  }

  if (err.message) {
    error = err.message;
  }

  if (err.error) {
    ({ error } = err);
  }

  res.status(statusCode).json({
    success: false,
    error,
  });
};

export default catchError;
