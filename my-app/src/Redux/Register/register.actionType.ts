export const REGISTER_LOADING = "register/loading";
export const REGISTER_SUCCESS = "register/success";
export const REGISTER_ERROR = "register/error";
export const REGISTER_USER_EXIST = "register/user_exist";

export type Res = {
  username: string;
  email: string;
};

export interface RegisterLoading {
  type: typeof REGISTER_LOADING;
}
export interface RegisterSuccess {
  type: typeof REGISTER_SUCCESS;
  payload: Res;
  status: boolean;
}
export interface RegisterError {
  type: typeof REGISTER_ERROR;
}
export interface RegisterUserExist {
  type: typeof REGISTER_USER_EXIST;
}

export type RegisterDispatchTypes =
  | RegisterLoading
  | RegisterSuccess
  | RegisterError
  | RegisterUserExist;
