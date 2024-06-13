import * as types from "./actionType";
import axios from "axios";

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

const userDeleted = () => ({
  type: types.DELETE_USERS,
});

const getProvinces = (provinces) => ({
  type: types.GET_PROVINCES,
  payload: provinces,
});

export const loadUsers = () => {
  return function (dispatch) {
    axios
      .get("https://61601920faa03600179fb8d2.mockapi.io/pegawai")
      .then((resp) => {
        console.log("resp", resp);
        dispatch(getUsers(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const deleteUser = (id) => {
  return function (dispatch) {
    axios
      .delete(`https://61601920faa03600179fb8d2.mockapi.io/pegawai/${id}`)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(userDeleted());
        dispatch(loadUsers());
      })
      .catch((error) => console.log(error));
  };
};

// Load Data API Emfisa

export const loadProvinces = () => {
  return function (dispatch) {
    axios
      .get("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((resp) => {
        console.log("resp", resp);
        dispatch(getProvinces(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
