import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Username is required"],
      minlength: [3, "Username minimum length 3 characters"],
      maxlength: [30, "Username maximum length 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password is too short"],
      maxlength: [25, "Password is too long"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      //only work in create ,save not update
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Passwords don't matches",
      },
      select: false,
    },
    // passwordChangedAt: Date,
    // profileImg: String,
    // role: {
    //   type: String,
    //   enum: ["user", "admin"],
    //   default: "user",
    // },
    // active: {
    //   type: Boolean,
    //   default: true,
    //   select: false,
    // },
  },
  {timestamps: true}
);

// _PASSWORD_HASHING_[Document-Middleware]_//
userSchema.pre("save", async function (next) {
  // Only Run if password is modified
  if (!this.isModified("password")) return next();
  // HashingPassword
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field from database
  this.confirmPassword = undefined;
  next();
});

// @NOTE Model middleware is supported for the following model functions. Don't confuse model middleware and document middleware: model middleware hooks into static functions on a Model class (used by model itself not the instances of the model), document middleware hooks into methods on a Model class (used by the instance or documents from the model). In model middleware functions, this refers to the model.
//_CHECK_IS_CORRECT_PASSWORD_[Instance-method]_//
userSchema.methods.isCorrectPassword = async function (
  enteredPassword,
  userPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

//_CHECK_IS_PASSWORD_CHANGED_AFTER_JWT_CREATED_[Instance-method]_//
userSchema.methods.isPasswordChangedAfterJwtIat = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const passwordChangedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // console.log(passwordChangedTimestamp + " - " + jwtTimestamp);

    // password changed
    return passwordChangedTimestamp > jwtTimestamp;
  }
  // password not changed
  return false;
};
const User = mongoose.model("User", userSchema);

export default User;
