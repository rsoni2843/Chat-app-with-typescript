import { Reducer, AnyAction } from "redux";
import {
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_NOT_EXIST,
  LOGIN_SUCCESS,
  LoginDispatchTypes,
} from "./login.actionType";

interface InitState {
  isLoading: boolean;
  isError: boolean;
  incorrectUsernamePassword: boolean;
  res: null | unknown;
  status: boolean;
}
const initState: InitState = {
  isLoading: false,
  isError: false,
  incorrectUsernamePassword: false,
  res: null,
  status: false,
};

const loginReducer: Reducer<InitState, AnyAction> = (
  state: InitState = initState,
  action: LoginDispatchTypes
): InitState => {
  switch (action.type) {
    case LOGIN_LOADING: {
      return {
        ...state,
        isError: false,
        isLoading: true,
        status: false,
        incorrectUsernamePassword: false,
        res: null,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isError: false,
        isLoading: false,
        res: action.payload,
        incorrectUsernamePassword: false,
        status: action.status,
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        isError: true,
        isLoading: false,
        status: false,
        incorrectUsernamePassword: false,
        res: null,
      };
    }
    case LOGIN_NOT_EXIST: {
      return {
        ...state,
        isError: false,
        isLoading: false,
        status: false,
        incorrectUsernamePassword: true,
        res: null,
      };
    }
    default: {
      return state;
    }
  }
};
export default loginReducer;
