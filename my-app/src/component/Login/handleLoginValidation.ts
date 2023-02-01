import { toast, ToastOptions } from "react-toastify";
import { LoginForm } from "./loginType";

const toastFeatures: ToastOptions = {
  autoClose: 8000,
  position: "bottom-center",
  draggable: true,
};
export function handleLoginValidation(user: LoginForm) {
  const { username, password } = user;
  if (username === "" || password === "") {
    toast.error("Email and password is required", toastFeatures);
    return false;
  }
  //   else if (password === "") {
  //     toast.error("Password should be greater than 8 characters.", toastFeatures);
  //     return false;
  //   }
  return true;
}
