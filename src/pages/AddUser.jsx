import { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useDispatch, useSelector } from "react-redux";
import { loadProvinces } from "../redux/actions";

// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

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

  useEffect(() => {
    dispatch(loadProvinces());
  }, [dispatch]);

  return (
    <div>
      {/* <TableContainer component={Paper}>
        <Table
          // className={classes.table}
          sx={{ minWidth: 1200 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>No.</StyledTableCell>
              <StyledTableCell align="center">Nama</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {provinces &&
              provinces.map((province, index) => (
                <StyledTableRow key={province.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell>{province.name}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      <h2 className="title">Tambah Anggota</h2>
      {/* <ul>
        {provinces.map((province) => (
          <li key={province.id}>{province.name}</li>
        ))}
      </ul> */}
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
            options={provinces.map((province) => province.name)}
            sx={{ width: "40ch" }}
            renderInput={(params) => <TextField {...params} label="Provinsi" />}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={provinces.map((province) => province.name)}
            sx={{ width: "40ch" }}
            renderInput={(params) => (
              <TextField {...params} label="Kabupaten/Kota" />
            )}
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
            options={provinsi.map((option) => option.name)}
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
