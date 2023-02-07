import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../model/user.model";

class UserController {
  static userRegister = async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      const usernameCheck = await UserModel.findOne({ username });
      if (usernameCheck) {
        return res.status(409).send({
          message:
            "User already registered. Kindly use the same username to login.",
          status: false,
        });
      }
      const emailCheck = await UserModel.findOne({ email });
      if (emailCheck) {
        return res.status(409).send({
          message:
            "Email already registered. Kindly use the same email to login.",
          status: false,
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await new UserModel({
        username: username,
        email: email,
        password: hashedPassword,
      });
      await newUser.save();
      return res.status(201).send({
        message: "User registered successfully",
        status: true,
        user: { username: username, email: email },
      });
    } catch (err) {
      return res
        .status(400)
        .send({ message: "Some error occured", status: false });
    }
  };
  static userLogin = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });
      if (!user) {
        return res.status(409).send({
          message: "Incorrect username or password",
          status: false,
        });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(409).send({
          message: "Incorrect username or password",
          status: false,
        });
      }

      return res.status(201).send({
        message: "User login successfully",
        status: true,
        user: user,
      });
    } catch (err) {
      return res
        .status(400)
        .send({ message: "Some error occured", status: false });
    }
  };

  static getAllUsers = async (req: Request, res: Response) => {
    try {
      // Getting all users here except the logged user
      const users = await UserModel.find({
        _id: { $ne: req.params.id },
      }).select(["email", "username", "avatarImage", "_id"]);
      return res.send({ users: users });
    } catch (err) {
      res.status(400).send({ message: "Some error occured" });
    }
  };
  static getCurrentUser = async (req: Request, res: Response) => {
    try {
      const user = await UserModel.findOne(
        { _id: req.params.id },
        { _id: 1, username: 1, email: 1, avatarImage: 1 }
      );
      // console.log(user);
      return res.send({ user: user });
    } catch (err) {
      res.status(400).send({ message: "Some error occured" });
    }
  };
  static setAvatar = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const avatarImage = req.body.image;

      const userData = await UserModel.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage,
        },
        { new: true }
      );
      return res.status(201).send({ isSet: userData?.isAvatarImageSet });
    } catch (err) {
      return res.send({ message: "Cant set" });
    }
  };
}
export default UserController;
