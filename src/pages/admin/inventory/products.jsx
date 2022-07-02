import {
  Box,
  Button,
  Container,
  Divider,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import TableData from "components/admin/TableData";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ModalAddProduct from "components/admin/ModalAddProduct";
import { useState } from "react";
import ModalAddStock from "components/admin/ModalAddStock";

const Products = () => {
  const [Open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const [OpenStock, setOpenStock] = useState(false);
  const handleOpenStock = () => setOpenStock(true);
  const handleCloseStock = () => {
    setOpenStock(false);
  };
  return (
    <Container
      sx={{
        p: "20px",
        marginTop: "16px",
      }}
    >
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Daftar Obat
          </Typography>
          <Box display="flex">
            <Button
              sx={{ marginRight: "15px" }}
              variant="outlined"
              startIcon={<DownloadIcon />}
            >
              Unduh PDF
            </Button>
            <Button variant="outlined" startIcon={<InsertDriveFileIcon />}>
              Excel
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          mt: "38px",
          borderRadius: "8px",
          height: "73vh",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="24px"
          >
            <OutlinedInput
              placeholder="Cari nama obat"
              sx={{ width: "328px", height: "42px" }}
              endAdornment={
                <InputAdornment>
                  <SearchIcon />
                </InputAdornment>
              }
            />
            <Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenStock}
                sx={{ mr: 2 }}
              >
                Tambah Stock
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
              >
                Tambah Obat
              </Button>
            </Box>
          </Box>
          <Divider />
          <ModalAddProduct open={Open} handleClose={handleClose} />
          <ModalAddStock open={OpenStock} handleClose={handleCloseStock} />
          {/* <TableData columns={columns} rows={rows}></TableData> */}
        </Box>
      </Box>
    </Container>
  );
};

export default Products;
