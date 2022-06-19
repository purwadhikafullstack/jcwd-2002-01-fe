import { Box, Divider, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineNavigateNext } from "react-icons/md";

const PaymentMethod = ({ logo, title, payment }) => {

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          my: "5px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ mr: "30px", ml: "20px" }}>
            <Image width="50px" height="50px" objectFit="contain" src={logo} />
          </Box>

          <Typography fontWeight="400">{title}</Typography>
        </Box>
        <IconButton onClick={payment}>
          {<MdOutlineNavigateNext />}
        </IconButton>
      </Box>
      <Divider variant="middle" />
    </Box>
  );
};

export default PaymentMethod;
