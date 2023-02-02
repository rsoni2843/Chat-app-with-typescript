export const LOGIN_LOADING = "login/loading";
export const LOGIN_SUCCESS = "login/success";
export const LOGIN_ERROR = "login/error";
export const LOGIN_NOT_EXIST = "login/not_exist";

// export type Res = {
//   username: string;
//   email: string;
// };

export interface LoginLoading {
  type: typeof LOGIN_LOADING;
}
export interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: unknown;
  status: boolean;
}
export interface LoginError {
  type: typeof LOGIN_ERROR;
}
export interface LoginNotExist {
  type: typeof LOGIN_NOT_EXIST;
}

export type LoginDispatchTypes =
  | LoginLoading
  | LoginSuccess
  | LoginError
  | LoginNotExist;
