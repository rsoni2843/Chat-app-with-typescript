import React, { useEffect } from "react";
import LoginComponent from "./../component/Login/LoginComponent";
import { useAppSelector } from "../Redux/hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { toastFeatures } from "../component/Register/registerType";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { incorrectUsernamePassword, isError } = useAppSelector(
    (store) => store.login
  );
  const loggedUser = localStorage.getItem("logged_user");

  useEffect(() => {
    if (incorrectUsernamePassword) {
      toast.error("Incorrect username or password.", toastFeatures);
    }
    if (isError) {
      toast.error(
        "Some error occured. Kindly refresh the page.",
        toastFeatures
      );
    }
    if (loggedUser) {
      navigate("/setAvatar");
    }
  }, [incorrectUsernamePassword, isError, loggedUser, navigate]);
  return (
    <>
      <LoginComponent />
    </>
  );
};

export default Login;
