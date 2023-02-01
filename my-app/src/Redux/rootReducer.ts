import { combineReducers } from "redux";
import registerReducer from "./Register/register.reducer";
import loginReducer from "./Login/login.reducer";

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
});

export default rootReducer;
