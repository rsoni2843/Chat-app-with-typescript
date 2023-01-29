// import styles from "./Styles/RegisterStyles";
import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import Logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import { ToastOptions } from "react-toastify/dist/types";
import "react-toastify/dist/ReactToastify.css";
interface Form {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const Register: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Form>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastFeatures: ToastOptions = {
    autoClose: 8000,
    position: "bottom-center",
    draggable: true,
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { username, email, password } = user;
    if (handleValidation()) {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/user/register",
          {
            username,
            email,
            password,
          }
        );

        if (data.status === true) {
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error?.response?.status);
          if (error?.response?.status === 409) {
            return toast.error(
              "User already registered. Please use the same username to login",
              toastFeatures
            );
          }
        }
        console.log(error);
      }
    }
  }

  function handleValidation() {
    const { username, password, confirmPassword } = user;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastFeatures
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastFeatures
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be greater than 8 characters.",
        toastFeatures
      );
      return false;
    }
    return true;
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="brand  border-solid border-2 flex m-auto items-center justify-start gap-3 p-3">
          <img src={Logo} alt="Logo" className="h-10 " />
          <h1>Chit Chat</h1>
        </div>
        <div className="flex rounded-2xl mt-4 p-6 gap-4 flex-col m-auto w-1/3 bg-formBg">
          <div className="flex flex-col text-left">
            <label htmlFor="name">UserName</label>
            <input
              value={user.username}
              className="bg-transparent focus:border-solid focus:border-2 focus:outline-none focus:border-primary p-2 border-2 border-tertiary border-solid rounded-lg"
              required
              type="text"
              placeholder="Enter Username"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col text-left">
            <label htmlFor="name">Email</label>
            <input
              value={user.email}
              className="bg-transparent focus:border-solid focus:border-2 focus:outline-none focus:border-primary p-2 border-2 border-tertiary border-solid rounded-lg"
              required
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col text-left">
            <label htmlFor="name">Password</label>
            <input
              value={user.password}
              required
              className="bg-transparent focus:border-solid focus:border-2 focus:outline-none focus:border-primary p-2 border-2 border-tertiary border-solid rounded-lg"
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col text-left">
            <label htmlFor="name">Confirm Password</label>
            <input
              value={user.confirmPassword}
              required
              className="bg-transparent focus:border-solid focus:border-2 focus:outline-none focus:border-primary p-2 border-2 border-tertiary border-solid rounded-lg"
              type="password"
              placeholder="Enter Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-tertiary hover:bg-primary rounded-lg p-2"
            type="submit"
          >
            SUBMIT
          </button>
          <span>
            Already have an account ? <Link to={"/login"}>Login</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default Register;
