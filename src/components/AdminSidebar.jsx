import {
  Box,
  Collapse,
  Stack,
  Typography,
  ListItemText,
  MenuItem,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import { useState } from "react";

const AdminSidebar = () => {
  const [openProduct, setOpenProduct] = useState(false);
  const [openTransaction, setOpenTransaction] = useState(false);
  const [openSales, setOpenSales] = useState(false);

  const handleClickProduct = () => {
    setOpenProduct(!openProduct);
  };
  const handleClickTransaction = () => {
    setOpenTransaction(!openTransaction);
  };
  const handleClickSales = () => {
    setOpenSales(!openSales);
  };

  return (
    <Box
      boxShadow="10"
      sx={{
        width: "256px",
        height: "1024px",
        pr: 2,
      }}
    >
      <Typography textAlign="center" sx={{ p: 4 }}>
        Healthymed
      </Typography>

      <Stack spacing={5} sx={{ pl: 2 }}>
        {/* Dashboard */}

        <Box
          display="flex"
          sx={{
            color: "#52637A",
            "&:hover": {
              color: "#009B90",
              opacity: [0.9, 0.8, 0.7],
              cursor: "pointer",
            },
          }}
        >
          <HomeIcon />
          <Typography sx={{ pl: 1 }}>dashboard</Typography>
        </Box>

        {/* Product */}
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            color: "#52637A",
            "&:hover": {
              color: "#009B90",
              opacity: [0.9, 0.8, 0.7],
              cursor: "pointer",
            },
          }}
          onClick={handleClickProduct}
        >
          <Box display="flex">
            <LocalPharmacyIcon />
            <Typography sx={{ pl: 1 }}>Produk</Typography>
          </Box>

          {openProduct ? <ExpandMore /> : <ExpandLess />}
        </Box>

        <Collapse in={openProduct} timeout="auto" unmountOnExit>
          <MenuItem
            sx={{
              color: "#52637A",
              "&:hover": {
                color: "#009B90",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            Daftar Produk
          </MenuItem>
          <MenuItem
            sx={{
              color: "#52637A",
              "&:hover": {
                color: "#009B90",
                opacity: [0.9, 0.8, 0.7],
                cursor: "pointer",
              },
            }}
          >
            Tambah Produk
          </MenuItem>
        </Collapse>

        {/* Trasaction */}
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            color: "#52637A",
            "&:hover": {
              color: "#009B90",
              opacity: [0.9, 0.8, 0.7],
              cursor: "pointer",
            },
          }}
          onClick={handleClickTransaction}
        >
          <Box display="flex">
            <ReceiptIcon />
            <Typography sx={{ pl: 1 }}>transaksi</Typography>
          </Box>

          {openTransaction ? <ExpandMore /> : <ExpandLess />}
        </Box>
        <Collapse in={openTransaction} timeout="auto" unmountOnExit>
          <MenuItem
            sx={{
              color: "#52637A",
              "&:hover": {
                color: "#009B90",
                opacity: [0.9, 0.8, 0.7],
                cursor: "pointer",
              },
            }}
          >
            Semua Pesanan
          </MenuItem>
          <MenuItem
            sx={{
              color: "#52637A",
              "&:hover": {
                color: "#009B90",
                opacity: [0.9, 0.8, 0.7],
                cursor: "pointer",
              },
            }}
          >
            Pesanan Baru
          </MenuItem>
          <MenuItem
            sx={{
              color: "#52637A",
              "&:hover": {
                color: "#009B90",
                opacity: [0.9, 0.8, 0.7],
                cursor: "pointer",
              },
            }}
          >
            Siap Dikirim
          </MenuItem>
          <MenuItem
            sx={{
              color: "#52637A",
              "&:hover": {
                color: "#009B90",
                opacity: [0.9, 0.8, 0.7],
                cursor: "pointer",
              },
            }}
          >
            Dalam Pengiriman
          </MenuItem>
          <MenuItem
            sx={{
              color: "#52637A",
              "&:hover": {
                color: "#009B90",
                opacity: [0.9, 0.8, 0.7],
                cursor: "pointer",
              },
            }}
          >
            Selesai
          </MenuItem>
          <MenuItem
            sx={{
              color: "#52637A",
              "&:hover": {
                color: "#009B90",
                opacity: [0.9, 0.8, 0.7],
                cursor: "pointer",
              },
            }}
          >
            Dibatalkan
          </MenuItem>
        </Collapse>

        {/* Sales and Revenue */}
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            color: "#52637A",
            "&:hover": {
              color: "#009B90",
              opacity: [0.9, 0.8, 0.7],
              cursor: "pointer",
            },
          }}
          onClick={handleClickSales}
        >
          <Box display="flex">
            <SsidChartIcon />
            <Typography sx={{ pl: 1 }}>sales & revenue</Typography>
          </Box>

          {openSales ? <ExpandMore /> : <ExpandLess />}
        </Box>
        <Collapse in={openSales} timeout="auto" unmountOnExit>
          <MenuItem
            sx={{
              color: "#52637A",
              "&:hover": {
                color: "#009B90",
                opacity: [0.9, 0.8, 0.7],
                cursor: "pointer",
              },
            }}
          >
            Ringkasan Statistik
          </MenuItem>
          <MenuItem
            sx={{
              color: "#52637A",
              "&:hover": {
                color: "#009B90",
                opacity: [0.9, 0.8, 0.7],
                cursor: "pointer",
              },
            }}
          >
            Buku Kas
          </MenuItem>
          <MenuItem
            sx={{
              color: "#52637A",
              "&:hover": {
                color: "#009B90",
                opacity: [0.9, 0.8, 0.7],
                cursor: "pointer",
              },
            }}
          >
            Laba dan Rugi
          </MenuItem>
        </Collapse>
      </Stack>
    </Box>
  );
};

export default AdminSidebar;
