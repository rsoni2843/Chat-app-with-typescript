import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "../Redux/hooks";
import RegisterComponent from "../component/Register/RegisterComponent";
import { toastFeatures } from "../component/Register/registerType";

const Register: FC = () => {
  const navigate = useNavigate();
  const { status, reRegister, isError } = useAppSelector(
    (store) => store.register
  );

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
  }, [reRegister, isError, status, navigate]);
  console.log(status);
  return (
    <>
      <RegisterComponent />
    </>
  );
};

export default Register;
