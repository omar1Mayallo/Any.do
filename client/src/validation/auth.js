import {object, string, ref} from "yup";

const loginSchema = object({
  email: string().email().required("Email is required"),
  password: string()
    .min(6, "Password minimum length 6 characters long")
    .max(25, "Password maximum length 25 characters long")
    .required("Password is required"),
});

const registerSchema = object({
  username: string()
    .min(3, "Username minimum length 3 characters long")
    .max(30, "Username maximum length 30 characters long")
    .required("Username is required"),
  email: string().email().required("Email is required"),
  password: string()
    .min(6, "Password minimum length 6 characters long")
    .max(25, "Password maximum length 25 characters long")
    .required("Password is required"),
  confirmPassword: string().oneOf(
    [ref("password"), null],
    "Passwords must match"
  ),
});
export {loginSchema, registerSchema};
