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

import { useDispatch, useSelector } from "react-redux";
import { deleteUser, loadUsers } from "../redux/actions";

// const useButtonStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
// }));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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
  // const classes = useStyles();
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDelete = (id) => {
    if (window.confirm("Apakah anda mau menghapus anggota?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div>
      <h2>Daftar Pegawai</h2>
      <TableContainer component={Paper}>
        <Table
          // className={classes.table}
          sx={{ minWidth: 1200 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>No.</StyledTableCell>
              <StyledTableCell align="center">Nama</StyledTableCell>
              <StyledTableCell align="center">Jalan</StyledTableCell>
              <StyledTableCell align="center">Provinsi</StyledTableCell>
              <StyledTableCell align="center">Kota/Kabupaten</StyledTableCell>
              <StyledTableCell align="center">Kecamatan</StyledTableCell>
              <StyledTableCell align="center">Kelurahan</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
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
                    {user.provinsi.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {user.kabupaten.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {user.kecamatan.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {user.kelurahan.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <ButtonGroup
                      variant="contained"
                      aria-label="contained primary button group"
                    >
                      <Button style={{ marginRight: "2px" }} color="info">
                        Edit
                      </Button>
                      <Button
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
