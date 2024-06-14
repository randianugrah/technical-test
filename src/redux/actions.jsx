import * as types from "./actionType";
import axios from "axios";

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

const userDeleted = () => ({
  type: types.DELETE_USER,
});

const userAdded = () => ({
  type: types.ADD_USER,
});

const getUser = (user) => ({
  type: types.GET_SINGLE_USER,
  payload: user,
});

const userUpdated = (user) => ({
  type: types.UPDATE_USER,
  payload: user,
});

const getProvinces = (provinces) => ({
  type: types.GET_PROVINCES,
  payload: provinces,
});

const getRegencies = (regencies) => ({
  type: types.GET_REGENCIES,
  payload: regencies,
});

const getDistricts = (districts) => ({
  type: types.GET_DISTRICTS,
  payload: districts,
});

const getVillages = (villages) => ({
  type: types.GET_VILLAGES,
  payload: villages,
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

export const addUser = (userData) => {
  return function (dispatch) {
    axios
      .post("https://61601920faa03600179fb8d2.mockapi.io/pegawai", userData)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(userAdded());
        dispatch(loadUsers());
      })
      .catch((error) => console.log(error));
  };
};

export const getSingleUser = (id) => {
  return function (dispatch) {
    axios
      .get(`https://61601920faa03600179fb8d2.mockapi.io/pegawai/${id}`)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(getUser(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const updateUser = (user, id) => {
  return function (dispatch) {
    axios
      .put(`https://61601920faa03600179fb8d2.mockapi.io/pegawai/${id}`, user)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(userUpdated());
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

export const loadRegencies = (province_id) => {
  return function (dispatch) {
    axios
      .get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${province_id}.json`
      )
      .then((resp) => {
        console.log("resp", resp);
        dispatch(getRegencies(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const loadDistricts = (regency_id) => {
  return function (dispatch) {
    axios
      .get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regency_id}.json`
      )
      .then((resp) => {
        console.log("resp", resp);
        dispatch(getDistricts(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const loadVillages = (district_id) => {
  return function (dispatch) {
    axios
      .get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${district_id}.json`
      )
      .then((resp) => {
        console.log("resp", resp);
        dispatch(getVillages(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
