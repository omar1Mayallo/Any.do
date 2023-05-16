import ApiError from "../utils/apiError.js";

// @type 404_Routes
export const routeNotFoundError = (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
};

// @type CAST_ERROR
// @desc handle invalid mongoDB id error
const handleCastError = (err) => {
  return new ApiError(`Invalid ${err.path}: ${err.value}.`, 400);
};

// @type DUPLICATION_ERROR
// @desc handle duplication error from duplicate a unique field
const handleDuplicationError = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  return new ApiError(
    `Duplicate field value: ${value}. Please use another value!`,
    400
  );
};

// @type VALIDATION_ERROR
// @desc handle validation error from mongoose schema validation
const handleValidationError = (err) => {
  /* 
  - example on Object.values(obj) : 
  const object1 = {
  a: 'something',
  b: 42,
  c: false
  };
  console.log(Object.values(object1));
  // Expected output: Array ["something", 42, false]
  */
  const errors = Object.values(err.errors).map((el) => el.message);
  return new ApiError(`Invalid input data. ${errors.join(" , ")}`, 400);
};

// @type INVALID_TOKEN_ERROR
const handleJwtInvalidError = () =>
  new ApiError("Invalid token, please login again", 401);

// @type EXPIRED_TOKEN_ERROR
const handleJwtExpiredError = () =>
  new ApiError("Expired token, please login again", 401);

const sendErrorToDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

//In Production Mode show operational(predicted) errors only, programming and other bugs or errors ==> let user show generic message
const sendErrorToProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("🔴_ERROR_🔴", err);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

const globalErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  //________DEVELOPMENT_ERRORS________//
  if (process.env.NODE_ENV === "development") {
    sendErrorToDev(err, res);
    //________PRODUCTION_ERRORS________//
  } else if (process.env.NODE_ENV === "production") {
    // NOT good practice to override an argument (ex: err = handleCastError(err)) of function
    let error = {...err, name: err.name, message: err.message};

    if (error.name === "CastError") error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicationError(error);
    if (error.name === "ValidationError") error = handleValidationError(error);
    if (error.name === "JsonWebTokenError") error = handleJwtInvalidError();
    if (error.name === "TokenExpiredError") error = handleJwtExpiredError();

    sendErrorToProd(error, res);
  }
};

export default globalErrorMiddleware;
