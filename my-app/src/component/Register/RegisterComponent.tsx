import React, { FC, useState, FormEvent, ChangeEvent } from "react";
import { ToastContainer } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import register from "../../Redux/Register/register.action";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { handleValidation } from "./handleValidation";
import { Form } from "./RegisterType";

const RegisterComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.register);
  const [user, setUser] = useState<Form>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (handleValidation(user)) {
      dispatch(register(user));
    }
  };

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

export default RegisterComponent;
