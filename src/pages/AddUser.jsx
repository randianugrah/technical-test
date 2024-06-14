import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  loadProvinces,
  loadRegencies,
  loadDistricts,
  loadVillages,
  addUser,
} from "../redux/actions";

const AddUser = () => {
  let navigate = useNavigate();
  const [state, setState] = useState({
    nama: "",
    jalan: "",
    provinsi: {
      id: "",
      name: "",
    },
    kabupaten: {
      id: "",
      province_id: "",
      name: "",
    },
    kecamatan: {
      id: "",
      regency_id: "",
      name: "",
    },
    kelurahan: {
      id: "",
      district_id: "",
      name: "",
    },
  });

  const [error, setError] = useState("");

  const { nama, jalan, provinsi, kabupaten, kecamatan, kelurahan } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log(e);
    if (
      !nama ||
      !jalan ||
      !provinsi ||
      !kabupaten ||
      !kecamatan ||
      !kelurahan
    ) {
      setError("Please fill all fields");
    } else {
      dispatch(addUser(state));
      setError("");
      navigate("/");
    }
  };

  const dispatch = useDispatch();
  const { provinces } = useSelector((state) => state.provinceData);
  const { regencies } = useSelector((state) => state.regencyData);
  const { districts } = useSelector((state) => state.districtData);
  const { villages } = useSelector((state) => state.villageData);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedRegency, setSelectedRegency] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");

  useEffect(() => {
    dispatch(loadProvinces());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadRegencies(selectedProvince));
  }, [dispatch, selectedProvince]);

  useEffect(() => {
    dispatch(loadDistricts(selectedRegency));
  }, [dispatch, selectedRegency]);

  useEffect(() => {
    dispatch(loadVillages(selectedDistrict));
  }, [dispatch, selectedDistrict]);

  const provprops = {
    options: provinces,
    getOptionLabel: (options) => options.name,
  };

  const regprops = {
    options: regencies,
    getOptionLabel: (options) => options.name,
  };
  const vilprops = {
    options: villages,
    getOptionLabel: (options) => options.name,
  };

  const disprops = {
    options: districts,
    getOptionLabel: (options) => options.name,
  };
  //
  const getProvince = (data) => {
    setSelectedProvince(data.id);
    setState((prevState) => ({
      ...prevState,
      provinsi: data,
    }));
  };

  useEffect(() => {
    console.log("State updated:", state);
  }, [state]);

  const getRegency = (data) => {
    setSelectedRegency(data.id);
    setState((prevState) => ({
      ...prevState,
      kabupaten: data,
    }));
  };

  const getDistrict = (data) => {
    setSelectedDistrict(data.id);
    setState((prevState) => ({
      ...prevState,
      kecamatan: data,
    }));
  };

  const getVillages = (data) => {
    setSelectedVillage(data.id);
    setState((prevState) => ({
      ...prevState,
      kelurahan: data,
    }));
    console.log(selectedVillage);
  };

  return (
    <div>
      <h1 className="title">Tambah Anggota</h1>
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <form action="" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "40ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              label="Nama"
              variant="filled"
              defaultValue={state.nama}
              type="text"
              name="nama"
              onChange={handleInputChange}
            />
            <TextField
              id="standard-basic"
              label="Jalan"
              variant="filled"
              defaultValue={state.jalan}
              type="text"
              name="jalan"
              onChange={handleInputChange}
            />
          </Box>
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            <Autocomplete
              // disablePortal
              id="combo-box-demo"
              {...provprops}
              sx={{ width: "40ch" }}
              // freeSolo
              isOptionEqualToValue={(options, value) =>
                options.valueOf === value.valueOf
              }
              renderInput={(params) => (
                <TextField {...params} label="Provinsi" />
              )}
              onChange={(event, value) => getProvince(value)}
              defaultValue={provinsi}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              {...regprops}
              isOptionEqualToValue={(options, value) =>
                options.valueOf === value.valueOf
              }
              // options={regencies.map((regency) => regency.name)}
              sx={{ width: "40ch" }}
              renderInput={(params) => (
                <TextField {...params} label="Kabupaten/Kota" />
              )}
              onChange={(event, value) => getRegency(value)}
              defaultValue={kabupaten}
            />
          </div>
          <br />
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              gap: "16px",
              // marginTop: "4px",
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              {...disprops}
              isOptionEqualToValue={(options, value) =>
                options.valueOf === value.valueOf
              }
              // options={districts.map((district) => district.id)}
              sx={{ width: "40ch" }}
              renderInput={(params) => (
                <TextField {...params} label="Kecamatan" />
              )}
              onChange={(event, value) => getDistrict(value)}
              defaultValue={kelurahan}
            />
            <Autocomplete
              disablePortal
              {...vilprops}
              id="combo-box-demo"
              isOptionEqualToValue={(options, value) =>
                options.valueOf === value.valueOf
              }
              // options={villages.map((village) => village.name)}
              sx={{ width: "40ch" }}
              renderInput={(params) => (
                <TextField {...params} label="Kelurahan" />
              )}
              onChange={(event, value) => getVillages(value)}
              defaultValue={kelurahan}
            />
          </div>
        </div>
        <div style={{ marginTop: "16px", float: "center" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            // onClick={() => navigate("/add-user")}
          >
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
