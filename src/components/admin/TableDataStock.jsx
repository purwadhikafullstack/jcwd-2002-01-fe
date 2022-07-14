import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";
import moment from "moment";

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

const TableDataStock = ({
  rows = [],
  rowPerPage,
  page,
  handleChangeRowsPerPage,
  handleChangePage,
  totalData,
}) => {
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
          <TableCell align="center">
            {moment(val.date).format("DD MMMM YYYY") || "-"}
          </TableCell>
          <TableCell align="center">{val.activity || "-"}</TableCell>
          <TableCell align="center">{val.officer || "-"}</TableCell>
          <TableCell align="center">{val.out}</TableCell>
          <TableCell align="center">{val.in}</TableCell>
          <TableCell align="center">
            {moment(val.expried_date).format("DD MMMM YYYY") || "-"}
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">No</StyledTableCell>
              <StyledTableCell align="center">Tanggal</StyledTableCell>
              <StyledTableCell align="center">Aktivitas</StyledTableCell>
              <StyledTableCell align="center">Petugas</StyledTableCell>
              <StyledTableCell align="center">Keluar</StyledTableCell>
              <StyledTableCell align="center">Masuk</StyledTableCell>
              <StyledTableCell align="center">Tgl.Kadaluwarsa</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={totalData}
        rowsPerPage={rowPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableDataStock;
