export const ADD_MESSAGE_LOADING = "add_message/loading";
export const ADD_MESSAGE_SUCCESS = "add_message/success";
export const ADD_MESSAGE_ERROR = "add_message/error";

export const GET_MESSAGE_LOADING = "get_message/loading";
export const GET_MESSAGE_SUCCESS = "get_message/success";
export const GET_MESSAGE_ERROR = "get_message/error";

export interface AddMessageLoading {
  type: typeof ADD_MESSAGE_LOADING;
}
export interface AddMessageSuccess {
  type: typeof ADD_MESSAGE_SUCCESS;
}
export interface AddMessageError {
  type: typeof ADD_MESSAGE_ERROR;
}

export type AddMessageDispatchType =
  | AddMessageLoading
  | AddMessageSuccess
  | AddMessageError;

export interface GetMessageLoading {
  type: typeof GET_MESSAGE_LOADING;
}
export interface GetMessageSuccess {
  type: typeof GET_MESSAGE_SUCCESS;
}
export interface GetMessageError {
  type: typeof GET_MESSAGE_ERROR;
}

export type CurrentUserDispatchType =
  | GetMessageLoading
  | GetMessageSuccess
  | GetMessageError;
