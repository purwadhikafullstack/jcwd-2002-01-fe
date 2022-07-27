import Link from "next/link";
import { Box, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import logo from "assets/logo.png";
import Image from "next/image";

import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SsidChartIcon from "@mui/icons-material/SsidChart";

import SidebarMenu from "./Sidebar/SidebarMenu";
import { useState } from "react";

const AdminSidebar = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        boxShadow: "0px 8px 20px -12px black",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box textAlign="center" sx={{ p: 4 }}>
        <Image src={logo} />
      </Box>

      <Stack>
        {/* Sidebar menu component */}

        <SidebarMenu
          menuTitle="Dashboard"
          href="/admin/dashboard"
          icon={<HomeIcon />}
          prefix="/admin/dashboard"
        />

        <SidebarMenu
          menuTitle="Produk"
          subMenus={[
            {
              submenuTitle: "Daftar Produk",
              href: "/admin/inventory/products",
            },
          ]}
          icon={<LocalPharmacyIcon />}
          prefix="/admin/inventory"
        />

        <SidebarMenu
          menuTitle="Transaction"
          subMenus={[
            {
              submenuTitle: "Semua Pesanan",
              href: "/admin/transaction/transactions",
            },
            {
              submenuTitle: "Pesanan Baru",
              href: "/admin/transaction/new",
            },
            {
              submenuTitle: "Siap Dikirim",
              href: "/admin/transaction/ready_delivery",
            },
            {
              submenuTitle: "Dalam Pengiriman",
              href: "/admin/transaction/delivery",
            },
            {
              submenuTitle: "Selesai",
              href: "/admin/transaction/finish",
            },
            {
              submenuTitle: "Dibatalkan",
              href: "/admin/transaction/cancel",
            },
          ]}
          icon={<ReceiptIcon />}
          prefix="/admin/transaction"
        />

        <SidebarMenu
          menuTitle="Sales & Revenue"
          subMenus={[
            {
              submenuTitle: "Ringkasan Statistik",
              href: "/admin/report/statistic",
            },
            {
              submenuTitle: "Buku Kas",
              href: "/admin/report/transaction_report",
            },
            {
              submenuTitle: "Laba dan Rugi",
              href: "/admin/report/profit",
            },
          ]}
          icon={<SsidChartIcon />}
          prefix="/admin/report"
        />
      </Stack>
    </Box>
  );
};

export default AdminSidebar;
