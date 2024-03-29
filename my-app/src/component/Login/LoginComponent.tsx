import React, { FC, useState, FormEvent, ChangeEvent } from "react";
import { ToastContainer } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { Link } from "react-router-dom";
import { handleLoginValidation } from "./handleLoginValidation";
import { LoginForm } from "./loginType";
import login from "./../../Redux/Login/login.action";

const LoginComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.login);
  const [user, setUser] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (handleLoginValidation(user)) {
      dispatch(login(user));
    }
  };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex rounded-2xl mt-4 p-6 gap-4 flex-col m-auto w-1/3  max-[780px]:w-[90%]  bg-formBg">
          <div className="flex flex-col text-left">
            <label htmlFor="name">UserName</label>
            <input
              value={user.username}
              className="bg-transparent focus:border-solid focus:border-2 focus:outline-none focus:border-primary p-2 border-2 border-tertiary border-solid rounded-lg"
              required
              type="text"
              min={"3"}
              placeholder="Enter Username"
              name="username"
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

          <button
            className="bg-tertiary hover:bg-primary rounded-lg p-2"
            type="submit"
          >
            {isLoading ? "SUBMITTING" : "SUBMIT"}
          </button>
          <span>
            Don't have an account ? <Link to={"/register"}>Register</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default LoginComponent;
