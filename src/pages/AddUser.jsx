import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useDispatch, useSelector } from "react-redux";
import { loadProvinces, loadRegencies, loadDistricts } from "../redux/actions";

const provinsi = [
  { id: 1, name: "Riau" },
  { id: 2, name: "Sumbar" },
  { id: 3, name: "Sumsel" },
  { id: 4, name: "Jakarta" },
  { id: 5, name: "Jabar" },
];

const AddUser = () => {
  const dispatch = useDispatch();
  const { provinces } = useSelector((state) => state.provinceData);
  const { regencies } = useSelector((state) => state.regencyData);
  const { districts } = useSelector((state) => state.districtData);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedRegency, setSelectedRegency] = useState("");

  useEffect(() => {
    dispatch(loadProvinces());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadRegencies(selectedProvince));
  }, [dispatch, selectedProvince]);

  useEffect(() => {
    dispatch(loadDistricts(selectedRegency));
  }, [dispatch, selectedRegency]);

  // useEffect(() => {
  //   if (selectedProvince) {
  //     console.log("Selected Regencyyy:", selectedProvince); // Logging selectedRegency
  //     dispatch(loadRegencies(selectedProvince));
  //   }
  // }, [dispatch, selectedProvince]);

  const provprops = {
    options: provinces,
    getOptionLabel: (options) => options.name,
  };

  const regprops = {
    options: regencies,
    getOptionLabel: (options) => options.name,
  };

  const disprops = {
    options: districts,
    getOptionLabel: (options) => options.name,
  };

  const getProvince = (data) => {
    setSelectedProvince(data.id);
  };

  const getRegency = (data) => {
    setSelectedRegency(data.id);
  };

  return (
    <div>
      <h2 className="title">Tambah Anggota</h2>
      <div>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "40ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="" label="Nama" variant="filled" />
          <TextField id="" label="Jalan" variant="filled" />
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
            disablePortal
            id="combo-box-demo"
            {...provprops}
            sx={{ width: "40ch" }}
            renderInput={(params) => <TextField {...params} label="Provinsi" />}
            onChange={(event, value) => getProvince(value)}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            {...regprops}
            // options={regencies.map((regency) => regency.name)}
            sx={{ width: "40ch" }}
            renderInput={(params) => (
              <TextField {...params} label="Kabupaten/Kota" />
            )}
            onChange={(event, value) => getRegency(value)}
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
            // options={districts.map((district) => district.id)}
            sx={{ width: "40ch" }}
            renderInput={(params) => (
              <TextField {...params} label="Kecamatan" />
            )}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={provinsi.map((option) => option.name)}
            sx={{ width: "40ch" }}
            renderInput={(params) => (
              <TextField {...params} label="Kelurahan" />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default AddUser;
