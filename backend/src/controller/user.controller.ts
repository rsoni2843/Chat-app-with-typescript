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
      console.log(username, email, password);
      const newUser = await new UserModel({
        username: username,
        email: email,
        password: hashedPassword,
      });
      console.log(newUser);
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
      console.log(isPasswordValid);
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
}
export default UserController;
