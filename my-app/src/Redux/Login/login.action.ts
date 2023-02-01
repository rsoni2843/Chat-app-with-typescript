import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import {
  LoginDispatchTypes,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_NOT_EXIST,
  LOGIN_ERROR,
} from "./login.actionType";
import { LoginForm } from "./../../component/Login/loginType";

const login =
  (creds: LoginForm) => async (dispatch: Dispatch<LoginDispatchTypes>) => {
    dispatch({ type: LOGIN_LOADING });
    try {
      const { data } = await axios.post(
        "http://localhost:5000/user/login",
        creds
      );

      if (data.status === true) {
        localStorage.setItem("logged_user", JSON.stringify(data.user));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data?.user,
          status: data?.status,
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.status);
        if (error?.response?.status === 409) {
          return dispatch({
            type: LOGIN_NOT_EXIST,
          });
        }
      }
      dispatch({ type: LOGIN_ERROR });
    }
  };
export default login;
