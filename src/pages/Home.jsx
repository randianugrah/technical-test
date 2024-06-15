import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { deleteUser, loadUsers } from "../redux/actions";

const columnHeaders = [
  "No.",
  "Nama",
  "Jalan",
  "Provinsi",
  "Kota/Kabupaten",
  "Kecamatan",
  "Kelurahan",
  "Action",
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 15,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Home = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userData);

  const capitalize = (str) => {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Apakah anda mau menghapus anggota?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div>
      <h1 className="title">Daftar Pegawai</h1>
      <div style={{ marginBottom: "8px", float: "left" }}>
        <Button
          style={{ textTransform: "none", fontWeight: "bold" }}
          variant="contained"
          color="primary"
          onClick={() => navigate("/add-user")}
        >
          Tambah
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {columnHeaders.map((header) => (
                <StyledTableCell
                  key={header}
                  style={{ textAlign: "center", fontWeight: "bold" }}
                >
                  {header}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {users &&
              users.map((user, index) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell>{user.nama}</StyledTableCell>
                  <StyledTableCell align="center">{user.jalan}</StyledTableCell>
                  <StyledTableCell align="center">
                    {capitalize(user.provinsi.name)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {capitalize(user.kabupaten.name)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {capitalize(user.kecamatan.name)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {capitalize(user.kelurahan.name)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <ButtonGroup
                      variant="contained"
                      aria-label="contained primary button group"
                      sx={{
                        "& > :not(style)": {
                          width: "7ch",
                          fontSize: "12px",
                        },
                      }}
                    >
                      <Button
                        style={{ marginRight: "2px", textTransform: "none" }}
                        color="info"
                        onClick={() => navigate(`/edit-user/${user.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        style={{ textTransform: "none" }}
                        color="error"
                        onClick={() => handleDelete(user.id)}
                      >
                        Hapus
                      </Button>
                    </ButtonGroup>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
