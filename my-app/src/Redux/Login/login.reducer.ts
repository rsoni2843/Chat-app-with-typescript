import { Reducer, AnyAction } from "redux";
import {
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_NOT_EXIST,
  LOGIN_SUCCESS,
  LOGOUT,
  LoginDispatchTypes,
  LogoutDispatchTypes,
} from "./login.actionType";

interface InitState {
  isLoading: boolean;
  isError: boolean;
  incorrectUsernamePassword: boolean;
  res: null | unknown;
}
const initState: InitState = {
  isLoading: false,
  isError: false,
  incorrectUsernamePassword: false,
  res: null,
};

const loginReducer: Reducer<InitState, AnyAction> = (
  state: InitState = initState,
  action: LoginDispatchTypes | LogoutDispatchTypes
): InitState => {
  switch (action.type) {
    case LOGIN_LOADING: {
      return {
        ...state,
        isError: false,
        isLoading: true,
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
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        isError: true,
        isLoading: false,
        incorrectUsernamePassword: false,
        res: null,
      };
    }
    case LOGIN_NOT_EXIST: {
      return {
        ...state,
        isError: false,
        isLoading: false,
        incorrectUsernamePassword: true,
        res: null,
      };
    }
    case LOGOUT: {
      localStorage.removeItem("logged_user");
      localStorage.removeItem("user_info");
      return {
        ...state,
        isError: false,
        isLoading: false,
        incorrectUsernamePassword: false,
        res: null,
      };
    }
    default: {
      return state;
    }
  }
};
export default loginReducer;
