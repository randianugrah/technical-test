import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  loadProvinces,
  loadRegencies,
  loadDistricts,
  loadVillages,
  getSingleUser,
  updateUser,
} from "../redux/actions";

const EditUser = () => {
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
  let { id } = useParams();
  const { user } = useSelector((state) => state.userData);
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
  }, [state]);

  useEffect(() => {
    dispatch(getSingleUser(id));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user) {
      setState({ ...user });
    }
  }, [user]);

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
      dispatch(updateUser(state, id));
      setError("");
      navigate("/");
    }
  };

  return (
    <div>
      <h1 className="title">Edit Pegawai</h1>
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
              // defaultValue={nama}
              value={nama || ""}
              type="text"
              name="nama"
              onChange={handleInputChange}
            />
            <TextField
              id="standard-basic"
              label="Jalan"
              variant="filled"
              value={jalan || ""}
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
              freeSolo
              isOptionEqualToValue={(options, value) =>
                options.valueOf === value.valueOf
              }
              renderInput={(params) => (
                <TextField {...params} label="Provinsi" />
              )}
              onChange={(event, value) => getProvince(value)}
              value={provinsi || null}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              {...regprops}
              freeSolo
              isOptionEqualToValue={(options, value) =>
                options.valueOf === value.valueOf
              }
              renderInput={(params) => (
                <TextField {...params} label="Kabupaten/Kota" />
              )}
              onChange={(event, value) => getRegency(value)}
              value={kabupaten || null}
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
              renderInput={(params) => (
                <TextField {...params} label="Kecamatan" />
              )}
              onChange={(event, value) => getDistrict(value)}
              value={kecamatan || null}
            />
            <Autocomplete
              disablePortal
              {...vilprops}
              freeSolo
              id="combo-box-demo"
              isOptionEqualToValue={(options, value) =>
                options.valueOf === value.valueOf
              }
              // options={villages.map((village) => village.name)}

              renderInput={(params) => (
                <TextField {...params} label="Kelurahan" />
              )}
              onChange={(event, value) => getVillages(value)}
              value={kelurahan || null}
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
              onClick={() => navigate(-1)}
              // onClick={() => history.goBack()}
            >
              Batal
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Update
            </Button>
          </Box>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
