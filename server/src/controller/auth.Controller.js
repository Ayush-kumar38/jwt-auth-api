import { comparePassword, hashpassword } from "../../libs/hashPass.js";
import { genToken } from "../../libs/token.js";
import userModel from "../models/auth.Model.js";

export const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        message: "enter data properly ",
        success: false,
      });
    }

    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isUserAlreadyExist) {
      return res.status(409).json({
        message: "user already exist ",
        success: false,
      });
    }
    const hashpass = await hashpassword(password);
    const user = await userModel.create({
      name,
      username,
      email,
      password: hashpass,
    });
    const token = await genToken({
      id: user._id,
      username: user.username,
    });
    return res.status(201).json({
      message: "user created successfully ",
      success: true,
      user_token: token,
    });
  } catch (error) {
    console.log("error while creating user", error.message);
    return res.status(500).json({
      message: "server error ",
      success: false,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if ((!email && !username) || !password){
      return res.status(400).json({
        message: "enter data properly",
        success: false,
      });
    }

    const user = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      return res.status(401).json({
        message: "invalid credentials",
        success: false,
      });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "invalid credentials",
        success: false,
      });
    }
    const token = await genToken({
      id: user._id,
      username: user.username,
    });

    return res.status(200).json({
      message: "Logged In successfully ",
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("error while loggin in user", error.message);
    return res.status(500).json({
      message: "server error ",
      success: false,
    });
  }
};
