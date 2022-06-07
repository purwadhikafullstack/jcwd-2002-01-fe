import {
  Box,
  Collapse,
  ListItemButton,
  Stack,
  Typography,
  List,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import {
  ContentCopy,
  ContentCut,
  ExpandLess,
  ExpandMore,
  StarBorder,
} from "@mui/icons-material";
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

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        boxShadow: "0px 8px 20px -12px black",
        width: 250,
        height: "100vh",
        position: "absolute",
        pr: 2,
      }}
    >
      <Typography textAlign="center" sx={{ p: 4 }}>
        Healthymed
      </Typography>

      <Stack spacing={6} sx={{ pl: 2 }}>
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
          <MenuItem>
            <ListItemText
              sx={{
                color: "#52637A",
                "&:hover": {
                  color: "#009B90",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              Daftar Produk
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText
              sx={{
                color: "#52637A",
                "&:hover": {
                  color: "#009B90",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              Tambah Produk
            </ListItemText>
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
          <MenuItem>
            <ListItemText
              sx={{
                color: "#52637A",
                "&:hover": {
                  color: "#009B90",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              Semua Pesanan
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText
              sx={{
                color: "#52637A",
                "&:hover": {
                  color: "#009B90",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              Pesanan Baru
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText
              sx={{
                color: "#52637A",
                "&:hover": {
                  color: "#009B90",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              Siap Dikirim
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText
              sx={{
                color: "#52637A",
                "&:hover": {
                  color: "#009B90",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              Dalam Pengiriman
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText
              sx={{
                color: "#52637A",
                "&:hover": {
                  color: "#009B90",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              Selesai
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText
              sx={{
                color: "#52637A",
                "&:hover": {
                  color: "#009B90",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              Dibatalkan
            </ListItemText>
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
          <MenuItem>
            <ListItemText
              sx={{
                color: "#52637A",
                "&:hover": {
                  color: "#009B90",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              Ringkasan Statistik
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText
              sx={{
                color: "#52637A",
                "&:hover": {
                  color: "#009B90",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              Buku Kas
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText
              sx={{
                color: "#52637A",
                "&:hover": {
                  color: "#009B90",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              Laba dan Rugi
            </ListItemText>
          </MenuItem>
        </Collapse>
      </Stack>
    </Box>
  );
};

export default AdminSidebar;
