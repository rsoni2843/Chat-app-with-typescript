import React, { ChangeEvent, FC, FormEvent, useState, useEffect } from "react";
import Logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ToastOptions } from "react-toastify/dist/types";
import "react-toastify/dist/ReactToastify.css";
import register from "../Redux/Register/register.action";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
export interface Form {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: FC = () => {
  const dispatch = useAppDispatch();
  const { res, reRegister, isLoading, isError } = useAppSelector(
    (store) => store.register
  );
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

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (handleValidation()) {
      dispatch(register(user));
    }
  };

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
  useEffect(() => {
    if (reRegister) {
      toast.error(
        "User already registered. Please use the same username or email to login",
        toastFeatures
      );
    }
    if (isError) {
      toast.error(
        "Some error occured. Kindly refresh the page.",
        toastFeatures
      );
    }
  }, [reRegister, isError]);
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
            {isLoading ? "SUBMITTING" : "SUBMIT"}
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
