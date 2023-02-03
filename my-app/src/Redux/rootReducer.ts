import { combineReducers } from "redux";
import registerReducer from "./Register/register.reducer";
import loginReducer from "./Login/login.reducer";
import chatReducer from "./Chat/chat.reducer";

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  chat: chatReducer,
});

export default rootReducer;
