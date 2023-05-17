import asyncHandler from "express-async-handler";
import User from "../user.model.js";
import ApiError from "../../../utils/apiError.js";
import {generateSendToken} from "../../../utils/tokenHandler.js";
import env from "../../../config/envValidation.js";

// ---------------------------------
// @desc    Register
// @route   POST  /auth/register
// @access  Public
// ---------------------------------
export const register = asyncHandler(async (req, res, next) => {
  const {username, email, password, confirmPassword} = req.body;
  //_A) CHECK _//
  // 1) If all data entered
  if (!username || !email || !password || !confirmPassword) {
    return next(new ApiError("Please fill all fields", 400));
  }
  // 2) If email is already exist
  const userExist = await User.findOne({email});
  if (userExist) {
    return next(
      new ApiError("Email is already exist , please enter new email", 400)
    );
  }

  //_B) CREATE_NEW_USER_//
  const newUser = await User.create({
    username,
    email,
    password,
    confirmPassword,
  });

  //_C) GENERATE_AND_SEND_TOKEN_TO_RESPONSE_//
  generateSendToken(res, newUser, 201);
});

// ---------------------------------
// @desc    login
// @route   POST  /auth/login
// @access  Public
// ---------------------------------
export const login = asyncHandler(async (req, res, next) => {
  const {email, password} = req.body;
  //_A) CHECK_//
  // 1) If all data entered
  if (!email || !password) {
    return next(new ApiError("Please fill all fields", 400));
  }
  // 2) If user exists and password is true
  const user = await User.findOne({email}).select("+password");
  if (!user || !(await user.isCorrectPassword(password, user.password))) {
    return next(new ApiError("Invalid email or password", 400));
  }

  //_B) GENERATE_AND_SEND_TOKEN_TO_RESPONSE_//
  generateSendToken(res, user, 200);
});

// ---------------------------------
// @desc    logout
// @route   POST  /auth/logout
// @access  Protected
// ---------------------------------
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()), // expires now
    httpOnly: true,
    secure: env.NODE_ENV === "production" ? true : false,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// ---------------------------------
// @desc    google logging
// @route   POST  /auth/google-login
// @access  Public
// ---------------------------------

// export const googleLogin = asyncHandler(async (req, res, next) => {});
