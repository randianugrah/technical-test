import { combineReducers } from "redux";
import userReducers from "./reducer";
import {
  provinceReducers,
  regencyReducers,
  districtReducers,
  villageReducers,
} from "./regionReducer";
// import regencyReducers from "./regencyReducer";
// import districtReducers from "./districtReducer";

const rootReducer = combineReducers({
  userData: userReducers,
  provinceData: provinceReducers,
  regencyData: regencyReducers,
  districtData: districtReducers,
  villageData: villageReducers,
});

export default rootReducer;
