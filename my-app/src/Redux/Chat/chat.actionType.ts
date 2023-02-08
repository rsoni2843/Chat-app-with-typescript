export const CURRENT_USER_LOADING = "current/loading";
export const CURRENT_USER_SUCCESS = "current/success";
export const CURRENT_USER_ERROR = "current/error";

export const ALL_USER_LOADING = "all/loading";
export const ALL_USER_SUCCESS = "all/success";
export const ALL_USER_ERROR = "all/error";

export interface User {
  _id: string;
  username: string;
  email: string;
  avatarImage: string;
  isAvatarImageSet?: boolean;
}

export interface UserLoading {
  type: typeof CURRENT_USER_LOADING;
}
export interface UserSuccess {
  type: typeof CURRENT_USER_SUCCESS;
  payload: User;
}
export interface UserError {
  type: typeof CURRENT_USER_ERROR;
}

export type CurrentUserDispatchType = UserLoading | UserSuccess | UserError;

export interface AllUsersLoading {
  type: typeof ALL_USER_LOADING;
}
export interface AllUsersSuccess {
  type: typeof ALL_USER_SUCCESS;
  allUser: User[];
}
export interface AllUsersError {
  type: typeof ALL_USER_ERROR;
}

export type AllUserDispatchType =
  | AllUsersLoading
  | AllUsersSuccess
  | AllUsersError;
