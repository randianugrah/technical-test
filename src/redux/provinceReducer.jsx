import * as types from "./actionType";

const initialStateProvince = {
  provinces: [],
  province: {},
  loading: false,
};

const provinceReducers = (state = initialStateProvince, action) => {
  switch (action.type) {
    case types.GET_PROVINCES:
      return {
        ...state,
        provinces: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default provinceReducers;
