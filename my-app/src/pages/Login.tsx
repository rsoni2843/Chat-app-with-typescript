import React, { useEffect } from "react";
import LoginComponent from "./../component/Login/LoginComponent";
import { useAppSelector } from "../Redux/hooks";
import { toast, ToastOptions } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { incorrectUsernamePassword, isError, status } = useAppSelector(
    (store) => store.login
  );
  const toastFeatures: ToastOptions = {
    autoClose: 8000,
    position: "bottom-center",
    draggable: true,
  };
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
    if (status) {
      navigate("/");
    }
  }, [incorrectUsernamePassword, isError, status]);
  return (
    <>
      <LoginComponent />
    </>
  );
};

export default Login;
