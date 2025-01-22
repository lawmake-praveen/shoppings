import * as UserModel from "../models/usersModal.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { format } from "date-fns";

export const login = async (req, res) => {
  try {
    const body = req.body;
    console.log(`body in backend : ${JSON.stringify(body)}`)
    const username = body.username;
    const password = body.password;
    const [userExist] = await UserModel.getUserByname(username);

    if (userExist.length > 0) {
      const hashedPassword = userExist[0].password;
      const passwordVerified = await verifyPassword(password, hashedPassword);
      if (passwordVerified) {
        const toBeEncryptedBody = {
          username,
        };
        const accessToken = await generateJWToken(toBeEncryptedBody);
        const lastLoginDateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");

        await UserModel.updateTokenAndLastlogin(
          username,
          accessToken,
          lastLoginDateTime
        );

        res.status(200).json({
          message: "User logged in successfully",
          username,
          lastLoginDateTime,
          accessToken,
        });
      } else {
        res.status(409).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Could not complete the request", error });
  }
};

export const register = async (req, res) => {
  try {
    const body = req.body;
    const username = body.username;
    const password = body.password;
    console.log(`request body for register : ${JSON.stringify(body)}`);
    const [existingUser] = await UserModel.getUserByname(username);
    console.log(`existing user : ${JSON.stringify(existingUser)}`);

    if (existingUser.length == 0) {
      const hashedPassword = await generateHashPassword(password);
      const [addNewUser] = await UserModel.addNewUser(username, hashedPassword);

      console.log(`add new user : ${JSON.stringify(addNewUser)}`);
      if (addNewUser.affectedRows == 1) {
        res
          .status(200)
          .json({ message: `User ${username} created successfully` });
      } else {
        res
          .status(409)
          .json({ message: "Something went wrong when creating a new user" });
      }
    } else {
      res.status(409).json({ message: "Username already exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Could not complete the request", error });
  }
};

const generateHashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

const generateJWToken = async (body) => {
  const key = process.env.SECRETKEY;
  const token = jwt.sign(body, key, { expiresIn: "10m" });
  return token;
};
