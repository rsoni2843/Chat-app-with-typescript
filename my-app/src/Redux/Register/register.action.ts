import axios, { AxiosError } from "axios";
import {
  REGISTER_ERROR,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_USER_EXIST,
} from "./register.actionType";
import { Dispatch } from "redux";
import { RegisterDispatchTypes } from "./register.actionType";
import { Form } from "../../pages/Register";

const register =
  (creds: Form) => async (dispatch: Dispatch<RegisterDispatchTypes>) => {
    dispatch({ type: REGISTER_LOADING });
    try {
      const { data } = await axios.post(
        "http://localhost:5000/user/register",
        creds
      );
      console.log(data);
      if (data.status === true) {
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch({ type: REGISTER_SUCCESS, payload: data });
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
