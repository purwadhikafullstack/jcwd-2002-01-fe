import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import CartCard from "components/CartCard";
import CheckoutCard from "components/CheckoutCard";
import Footer from "components/Footer";
import PaymentMethod from "components/PaymentMethod";
import ProductCheckoutContainer from "components/ProductCheckoutContainer";
import TemplateModal from "components/TemplateModal";
import TotalCard from "components/TotalCard";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { useEffect } from "react";

const UserAddress = ({
  name,
  phone,
  address,
  kecamatan,
  kota,
  provinsi,
  kodepos,
  addressLabel,
  setOpen,
}) => {
  const handleOpenAddress = () => setOpen(true);
  return (
    <ProductCheckoutContainer
      cardTitle={
        <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
          Alamat Pengiriman
        </Typography>
      }
    >
      <Stack spacing={2}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Jamal, +62098392123</Typography>
          <Link underline="hover">
            <Typography
              onClick={handleOpenAddress}
              sx={{
                color: "brand.500",
                fontWeight: "700",
                fontSize: "12px",
                ":hover": {
                  cursor: "pointer",
                },
              }}
            >
              Pilih Alamat Lain
            </Typography>
          </Link>
        </Box>
        <Typography>Rumah Maling</Typography>
        <Typography>
          Jl. Erlangga XII No.25, RT.5/RW.3, Selong, Kec. Kby. Baru, Kota
          Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12110
        </Typography>
        <Divider />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="small"
            sx={{
              mr: "16px",
              color: "brand.500",
              boxShadow:
                "4px 0px 2px rgba(32, 51, 96, 0.01), 0px 4px 4px rgba(0, 0, 0, 0.03), 2px 2px 2px rgba(190, 190, 190, 0.08), -2px -2px 2px rgba(190, 190, 190, 0.08), -4px -4px 4px rgba(190, 190, 190, 0.06), 8px 8px 4px rgba(190, 190, 190, 0.06);",
            }}
          >
            {<BsPlusLg />}
          </IconButton>
          <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>
            Tambahkan Alamat Baru
          </Typography>
        </Box>
      </Stack>
    </ProductCheckoutContainer>
  );
};

export default UserAddress;
