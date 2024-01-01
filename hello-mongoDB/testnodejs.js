import jwt from "jsonwebtoken";
import dotenv from "../helpers/dotenvService.js";

const { sign, verify } = jwt;
const key = dotenv.JWT_KEY;

const generateAuthToken = (user) => {
  const { _id, authLevel } = user;
  const token = sign({ _id, authLevel }, key);
  return token;
};

const verifyToken = (tokenFromClient) => {
  try {
    const userDataFromPayload = verify(tokenFromClient, key);
    return userDataFromPayload;
  } catch (error) {
    return null;
  }
};

export { generateAuthToken, verifyToken };
