import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import fotoObat from "assets/panadol.jpg";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { borderRadius } from "@mui/system";

const TransactionCard = () => {
  return (
    <Box
      sx={{
        width: "1088px",
        borderRadius: "10px",
        margin: "20px",
        padding: "15px",
        boxShadow: "0px 8px 20px -12px black",
        alignItems: "center",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box display="flex" sx={{ alignItems: "center" }}>
        <Checkbox></Checkbox>
        <Typography sx={{ fontWeight: "bold" }}> Pesanan Baru </Typography>
        <Typography sx={{ margin: "5px", color: "#B4B9C7" }}> / </Typography>
        <Typography sx={{ fontWeight: "bold" }}> HTMED29X </Typography>
        <Typography sx={{ margin: "5px", color: "#B4B9C7" }}> / </Typography>
        <AccessTimeIcon
          sx={{ fontSize: "20px", color: "#B4B9C7" }}
        ></AccessTimeIcon>
        <Typography sx={{ margin: "5px", color: "#B4B9C7" }}>
          10 Jan 2022, 10:45 WIB
        </Typography>
      </Box>

      <Divider></Divider>
      <Grid container display="flex" sx={{ alignItems: "center" }}>
        <Grid item xs={4}>
          <Box display="flex" sx={{ alignItems: "center" }}>
            <Box
              sx={{
                m: 2,
                pt: 1,
                mr: "30px",
                border: "solid grey",
                width: "80px",
                height: "80px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image width="55px" height="55px" src={fotoObat} />
            </Box>

            <Box sx={{ mr: "32px" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                Panadol Banteng Merah
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#737A8D" }}>
                2 x 13.000
              </Typography>
              <Box
                display="flex"
                sx={{ color: "brand.500", alignItems: "center" }}
              >
                <Typography sx={{ fontSize: "12px" }}>
                  lihat 2 obat lainnya
                </Typography>
                <ExpandMore fontSize="24px"></ExpandMore>
              </Box>
            </Box>
            <Divider sx={{ my: "16px" }} orientation="vertical" flexItem />
          </Box>
        </Grid>

        <Grid item xs={8}>
          <Stack direction="row" spacing={4}>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                Pembeli
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>
                Alex Tuner Hernandas
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                Alamat
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>
                Jl . Tebet Barat Dalam 6K , Tebet, Kota Jakarta Selatan
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                Kurir
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>Grab-Same Day</Typography>
            </Grid>
          </Stack>
        </Grid>
      </Grid>

      <Box
        display="flex"
        sx={{
          height: "40px",

          borderRadius: "4px",
          bgcolor: "#F6FAFB",
          alignItems: "center",
          justifyContent: "space-between",
          px: "16px",
        }}
      >
        <Box display="inline-flex">
          <Typography sx={{ fontWeight: "Bold", mr: 2, fontSize: "14px" }}>
            Total Harga
          </Typography>
          <Typography sx={{ fontSize: "14px" }}>(4 Obat)</Typography>
        </Box>

        <Typography sx={{ fontWeight: "Bold", fontSize: "14px" }}>
          Rp 65.000
        </Typography>
      </Box>

      <Box
        display="flex"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          px: "16px",
          mt: "16px",
        }}
      >
        <Box display="flex" sx={{ color: "brand.500" }}>
          <Typography sx={{ pr: "32px", fontSize: "14px" }}>
            Chat Pembeli
          </Typography>
          <Typography sx={{ fontSize: "14px" }}>Detail Pesanan</Typography>
        </Box>

        <Box display="flex">
          <Button sx={{ mr: "32px" }}>Tolak Pesanan</Button>
          <Button sx={{ bgcolor: "brand.400" }}>Terima Pesanan</Button>
        </Box>
      </Box>
    </Box>
  );
};
export default TransactionCard;
