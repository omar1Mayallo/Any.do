import mongoose from "mongoose";
import bcrypt from "bcrypt";

//_____________CREATE_A_USER_SCHEMA__________//

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
    profileImg: String,
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
        message: "Passwords don't match",
      },
      select: false,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
