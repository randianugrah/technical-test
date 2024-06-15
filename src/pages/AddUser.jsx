import { useEffect, useState } from "react";
// import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
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
    console.log("State updated:", state);
    // eslint-disable-next-line
  }, [state]);

  useEffect(() => {
    dispatch(loadProvinces());
    if (selectedProvince) {
      dispatch(loadRegencies(selectedProvince));
    }
    if (selectedRegency) {
      dispatch(loadDistricts(selectedRegency));
    }
    if (selectedDistrict) {
      dispatch(loadVillages(selectedDistrict));
    }
  }, [dispatch, selectedProvince, selectedRegency, selectedDistrict]);

  const createProps = (getOptionLabel) => (options) => ({
    options: options,
    getOptionLabel: getOptionLabel,
  });

  const getOptionLabel = (option) => option.name;
  const provprops = createProps(getOptionLabel)(provinces);
  const regprops = createProps(getOptionLabel)(regencies);
  const disprops = createProps(getOptionLabel)(districts);
  const vilprops = createProps(getOptionLabel)(villages);

  //
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getProvince = (data) => {
    setSelectedProvince(data.id);
    setState((prevState) => ({
      ...prevState,
      provinsi: data,
    }));
  };

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

  const handleSubmit = () => {
    // e.preventDefault();
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

  return (
    <div>
      <h1 className="title">Tambah Pegawai</h1>
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <form action="" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "50ch" },
            }}
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
          <Box
            display="flex"
            justifyContent="center"
            sx={{
              "& > :not(style)": { m: 1, width: "50ch" },
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              {...provprops}
              // sx={{ width: "40ch" }}
              freeSolo
              isOptionEqualToValue={(options, value) =>
                options.valueOf === value.valueOf
              }
              renderInput={(params) => (
                <TextField {...params} label="Provinsi" />
              )}
              onChange={(event, value) => getProvince(value)}
              value={provinsi}
            />

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              freeSolo
              {...regprops}
              isOptionEqualToValue={(options, value) =>
                options.valueOf === value.valueOf
              }
              // options={regencies.map((regency) => regency.name)}
              // sx={{ width: "40ch" }}
              renderInput={(params) => (
                <TextField {...params} label="Kabupaten/Kota" />
              )}
              onChange={(event, value) => getRegency(value)}
              value={kabupaten}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            sx={{
              "& > :not(style)": { m: 1, width: "50ch" },
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              freeSolo
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
              value={kelurahan}
            />
            <Autocomplete
              disablePortal
              {...vilprops}
              id="combo-box-demo"
              freeSolo
              isOptionEqualToValue={(options, value) =>
                options.valueOf === value.valueOf
              }
              sx={{ width: "40ch" }}
              renderInput={(params) => (
                <TextField {...params} label="Kelurahan" />
              )}
              onChange={(event, value) => getVillages(value)}
              value={kelurahan}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            sx={{
              "& > :not(style)": { m: 1, width: "10ch", textTransform: "none" },
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => navigate("/")}
            >
              Kembali
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Simpan
            </Button>
          </Box>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
