import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

const TableData = ({ rows = [] }) => {
  console.log(rows);

  const renderTableBody = () => {
    return rows.map((val) => {
      return (
        <TableRow
          sx={{
            ":nth-of-type(even)": {
              backgroundColor: "#D3D3D3",
            },
          }}
        >
          <TableCell align="center" component="th" scope="row">
            {val.no}
          </TableCell>
          <TableCell align="center">{val.namaObat || "-"}</TableCell>
          <TableCell align="center">{val.noObat || "-"}</TableCell>
          <TableCell align="center">{val.noBpom || "-"}</TableCell>
          <TableCell align="center">{val.kategori || "-"}</TableCell>
          <TableCell align="center">{val.stok || "-"}</TableCell>
          <TableCell align="center">{val.satuan || "-"}</TableCell>
          <TableCell align="center">
            Rp. {val.nilaiJual.toLocaleString() || "-"}
          </TableCell>
          <TableCell align="center">
            <Button>Edit</Button>
            <Button>Delete</Button>
            <Button>Tambah Stock</Button>
          </TableCell>
        </TableRow>
      );
    });
  };
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="center">Nama Obat</StyledTableCell>
              <StyledTableCell align="center">No.Obat</StyledTableCell>
              <StyledTableCell align="center">No.BPOM</StyledTableCell>
              <StyledTableCell align="center">Kategori</StyledTableCell>
              <StyledTableCell align="center">Stok</StyledTableCell>
              <StyledTableCell align="center">Satuan</StyledTableCell>
              <StyledTableCell align="center">Nilai Jual</StyledTableCell>
              <StyledTableCell align="center">Atur</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableData;
