exports.successResponse = (message = 'success', data = null) => ({
  type: "success",
  message,
  data,
});

exports.errorResponse = (message, loggedError = null) => ({
  type: "error",
  message,
  loggedError
}); 

exports.returnError = (message, statusCode = 500) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
};