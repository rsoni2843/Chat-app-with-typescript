import {
  CURRENT_USER_ERROR,
  CURRENT_USER_LOADING,
  CURRENT_USER_SUCCESS,
} from "./chat.actionType";
import {
  ALL_USER_ERROR,
  ALL_USER_LOADING,
  ALL_USER_SUCCESS,
} from "./chat.actionType";
import {
  CurrentUserDispatchType,
  AllUserDispatchType,
} from "./chat.actionType";

export interface UserInfo {
  _id: string;
  username: string;
  email: string;
  avatarImage: string;
}

interface InitState {
  allUsersLoading: boolean;
  allUsersError: boolean;
  userLoading: boolean;
  userError: boolean;
  userInfo: null | UserInfo ;
  allUsers: null | UserInfo[];
}

const initState: InitState = {
  allUsersLoading: false,
  allUsersError: false,
  userLoading: false,
  userError: false,
  userInfo: null,
  allUsers: null,
};

function chatReducer(
  state = initState,
  action: CurrentUserDispatchType | AllUserDispatchType
) {
  switch (action.type) {
    case ALL_USER_LOADING: {
      return {
        ...state,
        allUsersLoading: true,
        allUsersError: false,
      };
    }
    case ALL_USER_SUCCESS: {
      return {
        ...state,
        allUsersLoading: false,
        allUsersError: false,
        allUsers: action.allUser,
      };
    }
    case ALL_USER_ERROR: {
      return {
        ...state,
        allUsersLoading: false,
        allUsersError: true,
      };
    }
    case CURRENT_USER_LOADING: {
      return {
        ...state,
        userLoading: true,
        userError: false,
      };
    }
    case CURRENT_USER_SUCCESS: {
      localStorage.setItem("user_info", JSON.stringify(action.payload));
      // console.log(localStorage.getItem("user_info"));
      // console.log(action.payload);
      return {
        ...state,
        userLoading: false,
        userError: false,
        userInfo: action.payload,
      };
    }
    case CURRENT_USER_ERROR: {
      return {
        ...state,
        userLoading: false,
        userError: true,
      };
    }

    default: {
      return state;
    }
  }
}
export default chatReducer;
