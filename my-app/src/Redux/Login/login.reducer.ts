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
}
const initState: InitState = {
  isLoading: false,
  isError: false,
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
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isError: false,
        isLoading: false,
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    }
    case LOGIN_NOT_EXIST: {
      return {
        ...state,
        isError: false,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};
export default loginReducer;
