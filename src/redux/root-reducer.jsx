import { combineReducers } from "redux";
import userReducers from "./reducer";
import provinceReducers from "./provinceReducer";

const rootReducer = combineReducers({
  userData: userReducers,
  provinceData: provinceReducers,
});

export default rootReducer;
