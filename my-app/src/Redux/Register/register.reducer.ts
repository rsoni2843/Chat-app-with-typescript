import { RegisterDispatchTypes } from "./register.actionType";
import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTER_USER_EXIST,
} from "./register.actionType";
interface InitState {
  isLoading: boolean;
  isError: boolean;
  reRegister: boolean;
  res: unknown;
}
const initState: InitState = {
  isLoading: false,
  isError: false,
  reRegister: false,
  res: {},
};

function registerReducer(state = initState, action: RegisterDispatchTypes) {
  switch (action.type) {
    case REGISTER_LOADING: {
      return {
        ...state,
        isError: false,
        isLoading: true,
        reRegister: false,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        isError: false,
        isLoading: false,
        reRegister: false,
        res: action.payload,
      };
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        isError: true,
        isLoading: false,
        reRegister: false,
      };
    }
    case REGISTER_USER_EXIST: {
      
      return {
        ...state,
        isError: false,
        isLoading: false,
        reRegister: true,
      };
    }
    default: {
      return state;
    }
  }
}
export default registerReducer;
