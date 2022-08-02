import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  TablePagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import ModalAddStock from "./ModalAddStock";
import ModalEditData from "./ModalEditData";
import DeleteDialog from "../admin/DeleteDialog";
import Link from "next/link";

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

const TableData = ({
  rows = [],
  rowPerPage,
  page,
  handleChangeRowsPerPage,
  handleChangePage,
  totalData,
  fetchProduct,
}) => {
  const [editProduk, setEditProduk] = useState(false);
  const [deleteProduk, setDeleteProduk] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tambahStok, setTambahStok] = useState(false);
  const [productData, setProductData] = useState({});
  const [productImage, setProductImage] = useState([]);

  const open = (id) => {
    setSelectedId(id);
  };

  const handleClose = () => {
    setTambahStok(false);
    setEditProduk(false);
    setDeleteProduk(false);
    setSelectedId(0);
  };

  const [selectedId, setSelectedId] = useState(0);

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
            <IconButton
              onClick={(event) => {
                setSelectedId(val.productId);
                setAnchorEl(event.currentTarget);
              }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={val.productId === selectedId}
              onClose={() => open(0)}
            >
              <Link href={`/stock_detail/${val.productId}`}>
                <MenuItem>Lihat Detail</MenuItem>
              </Link>
              <MenuItem
                onClick={() => {
                  setTambahStok(true);
                  setProductData(val);
                  setSelectedId(val?.productId);
                }}
              >
                Tambah Stok
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setEditProduk(true);
                  setProductData(val);
                  setProductImage(val?.productImage);
                  setSelectedId(val?.productId);
                }}
              >
                Ubah Produk
              </MenuItem>
              <MenuItem
              onClick={() => {
                setDeleteProduk(true);
                setProductData(val);
                setSelectedId(0);
              }}
              >
                Hapus Produk
              </MenuItem>
            </Menu>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <>
      <ModalAddStock
        open={tambahStok}
        handleClose={handleClose}
        data={productData}
        fetchProduct={fetchProduct}
      ></ModalAddStock>
      <ModalEditData
        open={editProduk}
        handleClose={handleClose}
        data={productData}
        fetchProduct={fetchProduct}
        productImage={productImage}
      ></ModalEditData>
      <DeleteDialog
        open={deleteProduk}
        handleClose={handleClose}
        data={productData}
      />

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
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={totalData}
          rowsPerPage={rowPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};

export default TableData;
