import jsonwebtoken from "jsonwebtoken";

const jwt_secret = process.env.JWT_TOKEN_SECRET;
const jwt_expirey = process.env.JWT_TOKEN_EXPIREY;

const sign_jwt = (payload) =>
  jsonwebtoken.sign(payload, jwt_secret, { expiresIn: jwt_expirey });

const verify_jwt = (token) => jsonwebtoken.verify(token, jwt_secret);

module.exports = { sign_jwt, verify_jwt };
