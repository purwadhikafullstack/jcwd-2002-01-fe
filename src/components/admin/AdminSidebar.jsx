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
import Link from "next/link";
import SidebarMenu from "./Sidebar/SidebarMenu";

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
      sx={{
        height: "100vh",
        // pr: 2,
        boxShadow: "0px 8px 20px -12px black",
        bgcolor: "#FFFFFF",
      }}
    >
      <Typography textAlign="center" sx={{ p: 4 }}>
        Healthymed
      </Typography>

      <Stack>
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

        {/* Sidebar menu component */}
        <SidebarMenu
          menuTitle="Inventory"
          subMenus={[
            {
              submenuTitle: "Stock Produk",
              href: "/admin/inventory/products",
            },
            {
              submenuTitle: "Mutasi Stock",
              href: "/admin/inventory/mutation",
            },
          ]}
          icon={<LocalPharmacyIcon />}
        />

        <SidebarMenu
          menuTitle="Inventory"
          subMenus={[
            {
              submenuTitle: "Stock Produk",
              href: "/admin/inventory/products",
            },
            {
              submenuTitle: "Mutasi Stock",
              href: "/admin/inventory/mutation",
            },
          ]}
          icon={<LocalPharmacyIcon />}
        />
      </Stack>
    </Box>
  );
};

export default AdminSidebar;
