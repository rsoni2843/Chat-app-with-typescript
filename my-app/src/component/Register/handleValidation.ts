import { toast, ToastOptions } from "react-toastify";
import { Form } from "./RegisterType";

const toastFeatures: ToastOptions = {
  autoClose: 8000,
  position: "bottom-center",
  draggable: true,
};
export function handleValidation(user: Form) {
  const { username, password, confirmPassword } = user;
  if (password !== confirmPassword) {
    toast.error("Password and confirm password should be same.", toastFeatures);
    return false;
  } else if (username.length < 3) {
    toast.error("Username should be greater than 3 characters.", toastFeatures);
    return false;
  } else if (password.length < 8) {
    toast.error("Password should be greater than 8 characters.", toastFeatures);
    return false;
  }
  return true;
}
