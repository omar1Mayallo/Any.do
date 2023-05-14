import asyncHanler from "express-async-handler";
import User from "./user.model.js";

// ----------------------------
// @desc    Create A User
// @route   POST  /api/v1/user
// @access  Private
// ----------------------------
export const createUser = asyncHanler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});
