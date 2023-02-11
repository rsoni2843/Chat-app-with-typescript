import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import {
  LoginDispatchTypes,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_NOT_EXIST,
  LOGIN_ERROR,
  LOGOUT,
} from "./login.actionType";
import { LoginForm } from "./../../component/Login/loginType";

const login =
  (creds: LoginForm) => async (dispatch: Dispatch<LoginDispatchTypes>) => {
    dispatch({ type: LOGIN_LOADING });
    console.log(creds);
    try {
      const { data } = await axios.post(
        "https://chat-app-backend-builded.vercel.app/user/login",
        creds
      );
      if (data.status === true) {
        console.log(data);
        localStorage.setItem("logged_user", JSON.stringify(data?.user?._id));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data?.user,
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        if (error?.response?.status === 409) {
          return dispatch({
            type: LOGIN_NOT_EXIST,
          });
        }
      }
      dispatch({ type: LOGIN_ERROR });
    }
  };

export const logout = () => ({ type: LOGOUT });

export default login;
