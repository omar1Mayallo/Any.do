import jwt from "jsonwebtoken";
import env from "../config/envValidation.js";

//_SIGN_TOKEN_//
function signToken(payload) {
  return jwt.sign({userId: payload}, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRE_IN,
  });
}

//_VERIFY_TOKEN_//
function verifyToken(token) {
  return jwt.verify(token, env.JWT_SECRET);
}

//_GENERATE_AND_SEND_TOKEN_TO_RESPONSE_//
function generateSendToken(res, user, statusCode) {
  const token = signToken(user._id);
  //_[SECURITY]-{CROSS_SITE_SCRIPTING(XSS)}_STORE_JWT_TO_COOKIES_//
  // @descOfAttack Attacker try to inject scripts to run a malicious code
  // @problem If we store jwt to local storage and If attacker inject code to read the local storage
  // @protection Jwt stored only in http-only cookies, so the browser receive and send cookie but cannot access or modified it, so we prevent attacker to steal jwt
  const cookieOptions = {
    expires: new Date(
      Date.now() + env.JWT_COOKIE_EXPIRE_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: env.NODE_ENV === "production" ? true : false,
  };

  // res.cookie [https://expressjs.com/en/5x/api.html#res.cookie]
  res.cookie("token", token, cookieOptions);
  // Delete password field from output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
}

export {signToken, verifyToken, generateSendToken};
