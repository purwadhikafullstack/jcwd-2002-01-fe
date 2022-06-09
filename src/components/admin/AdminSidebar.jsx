import Link from "next/link";
import { Box, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import logo from "assets/logo.png";
import Image from "next/image";

import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SsidChartIcon from "@mui/icons-material/SsidChart";

import SidebarMenu from "./Sidebar/SidebarMenu";

const AdminSidebar = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        // pr: 2,
        boxShadow: "0px 8px 20px -12px black",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box textAlign="center" sx={{ p: 4 }}>
        <Image src={logo} />
      </Box>

      <Stack>
        {/* Dashboard */}

        {/* Sidebar menu component */}

        <SidebarMenu
          menuTitle="Dashboard"
          href="/admin/dashboard"
          icon={<HomeIcon />}
        />

        <SidebarMenu
          menuTitle="Produk"
          subMenus={[
            {
              submenuTitle: "Daftar Produk",
              href: "/admin/inventory/products",
            },
            {
              submenuTitle: "Tambah Produk",
              href: "/admin/inventory/mutation",
            },
          ]}
          icon={<LocalPharmacyIcon />}
        />

        <SidebarMenu
          menuTitle="Transaction"
          subMenus={[
            {
              submenuTitle: "Semua Pesanan",
              href: "/admin/pesanan",
            },
            {
              submenuTitle: "Pesanan Baru",
              href: "/admin/inventory/mutation",
            },
            {
              submenuTitle: "Siap Dikirim",
              href: "/admin/inventory/mutation",
            },
            {
              submenuTitle: "Dalam Pengiriman",
              href: "/admin/inventory/mutation",
            },
            {
              submenuTitle: "Selesai",
              href: "/admin/inventory/mutation",
            },
            {
              submenuTitle: "Dibatalkan",
              href: "/admin/inventory/mutation",
            },
          ]}
          icon={<ReceiptIcon />}
        />

        <SidebarMenu
          menuTitle="Sales & Revenue"
          subMenus={[
            {
              submenuTitle: "Ringkasan Statistic",
              href: "/admin/inventory/products",
            },
            {
              submenuTitle: "Buku Kas",
              href: "/admin/inventory/mutation",
            },
            {
              submenuTitle: "Laba dan Rugi",
              href: "/admin/inventory/mutation",
            },
          ]}
          icon={<SsidChartIcon />}
        />
      </Stack>
    </Box>
  );
};

export default AdminSidebar;
