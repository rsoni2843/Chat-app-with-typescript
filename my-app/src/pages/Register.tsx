import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastOptions } from "react-toastify/dist/types";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "../Redux/hooks";
import RegisterComponent from "../component/Register/RegisterComponent";

const Register: FC = () => {
  const navigate = useNavigate();
  const { status, reRegister, isError } = useAppSelector(
    (store) => store.register
  );
  const toastFeatures: ToastOptions = {
    autoClose: 8000,
    position: "bottom-center",
    draggable: true,
  };
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
    if (status) {
      navigate("/login");
    }
  }, [reRegister, isError, status]);
  console.log(status);
  return (
    <>
      <RegisterComponent />
    </>
  );
};

export default Register;
