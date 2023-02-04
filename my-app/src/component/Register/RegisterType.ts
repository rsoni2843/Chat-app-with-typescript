import { ToastOptions } from "react-toastify";
export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const toastFeatures: ToastOptions = {
  autoClose: 8000,
  position: "bottom-center",
  draggable: true,
};
