import axios from "axios";
import { Dispatch } from "redux";
import {
  AllUserDispatchType,
  ALL_USER_LOADING,
  ALL_USER_SUCCESS,
  ALL_USER_ERROR,
  CurrentUserDispatchType,
  CURRENT_USER_ERROR,
  CURRENT_USER_SUCCESS,
  CURRENT_USER_LOADING,
} from "./chat.actionType";
export const getAllUsers =
  (id: string) => async (dispatch: Dispatch<AllUserDispatchType>) => {
    console.log(id);
    dispatch({ type: ALL_USER_LOADING });
    try {
      const { data } = await axios.get(
        `http://localhost:5000/user/getAllUsers/${id}`
      );
      console.log(data);
      dispatch({ type: ALL_USER_SUCCESS, allUser: data.users });
    } catch (err) {
      dispatch({ type: ALL_USER_ERROR });
    }
  };
export const getCurrentUser =
  (id: string) => async (dispatch: Dispatch<CurrentUserDispatchType>) => {
    dispatch({ type: CURRENT_USER_LOADING });
    try {
      let { data } = await axios.get(
        `http://localhost:5000/user/getCurrentUser/${JSON.parse(id as string)}`
      );
      // console.log(data);
      dispatch({ type: CURRENT_USER_SUCCESS, payload: data.user });
    } catch (err) {
      dispatch({ type: CURRENT_USER_ERROR });
    }
  };
