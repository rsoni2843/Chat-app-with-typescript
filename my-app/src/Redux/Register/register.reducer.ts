import { Reducer, AnyAction } from "redux";
import { RegisterDispatchTypes, Res } from "./register.actionType";
import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTER_USER_EXIST,
} from "./register.actionType";
// type Res = {
//   message: string;
//   status: boolean;
//   user: {
//     username: string;
//     email: string;
//   };
// };
interface InitState {
  isLoading: boolean;
  isError: boolean;
  reRegister: boolean;
  res?: Res | null;
  status?: boolean;
}
const initState: InitState = {
  isLoading: false,
  isError: false,
  reRegister: false,
  res: null,
  status: false,
};

const registerReducer: Reducer<InitState, AnyAction> = (
  state: InitState = initState,
  action: RegisterDispatchTypes
): InitState => {
  switch (action.type) {
    case REGISTER_LOADING: {
      return {
        ...state,
        isError: false,
        isLoading: true,
        reRegister: false,
        res: null,
        status: false,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        isError: false,
        isLoading: false,
        reRegister: false,
        res: action.payload,
        status: action.status,
      };
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        isError: true,
        isLoading: false,
        reRegister: false,
        res: null,
        status: false,
      };
    }
    case REGISTER_USER_EXIST: {
      return {
        ...state,
        isError: false,
        isLoading: false,
        reRegister: true,
        res: null,
        status: false,
      };
    }
    default: {
      return state;
    }
  }
};
export default registerReducer;
