import * as types from "./actionType";

const initialStateProvince = {
  provinces: [],
  province: {},
  loading: false,
};

const initialStateRegency = {
  regencies: [],
  regency: {},
  loading: false,
};

const initialStateDistrict = {
  districts: [],
  district: {},
  loading: false,
};

const initialStateVillages = {
  villages: [],
  village: {},
  loading: false,
};

export const provinceReducers = (state = initialStateProvince, action) => {
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
export const regencyReducers = (state = initialStateRegency, action) => {
  switch (action.type) {
    case types.GET_REGENCIES:
      return {
        ...state,
        regencies: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const districtReducers = (state = initialStateDistrict, action) => {
  switch (action.type) {
    case types.GET_DISTRICTS:
      return {
        ...state,
        districts: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const villageReducers = (state = initialStateVillages, action) => {
  switch (action.type) {
    case types.GET_VILLAGES:
      return {
        ...state,
        villages: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
