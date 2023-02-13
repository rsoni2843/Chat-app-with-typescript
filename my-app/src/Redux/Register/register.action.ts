import axios, { AxiosError } from "axios";
import {
  REGISTER_ERROR,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_USER_EXIST,
} from "./register.actionType";
import { Dispatch } from "redux";
import { RegisterDispatchTypes } from "./register.actionType";
import { RegisterForm } from "../../component/Register/registerType";

const register =
  (creds: RegisterForm) =>
  async (dispatch: Dispatch<RegisterDispatchTypes>) => {
    dispatch({ type: REGISTER_LOADING });
    try {
      const { data } = await axios.post(
        "https://chat-app-backend-builded-3ni5.vercel.app/user/register",
        creds
      );

      if (data.status === true) {
        localStorage.setItem("registered_user", JSON.stringify(data.user));
        dispatch({
          type: REGISTER_SUCCESS,
          payload: data?.user,
          status: data?.status,
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.status);
        if (error?.response?.status === 409) {
          return dispatch({
            type: REGISTER_USER_EXIST,
          });
        }
      }
      dispatch({ type: REGISTER_ERROR });
    }
  };
export default register;
