import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import fotoObat from "assets/panadol.jpg";

const DaftarPemesananCard = () => {
  return (
    <Box
      sx={{
        p: "30px",
        width: "820px",
        height: "340px",
        boxShadow:
          "-1px -1px 5px 4px rgba(0, 12, 54, 0.01), 2px 2px 2px rgba(33, 51, 96, 0.04), 4px 4px 4px 6px rgba(0, 155, 144, 0.04)",
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontSize="14px" fontWeight="400">Jumat, 5 April 2022, 15:45</Typography>
        <Box
          sx={{
            backgroundColor: "rgba(255, 222, 107, 0.3)",
            border: "1px solid #FFDE6B",
            color: "#CBAF4E",
            padding: "5px",
          }}
        >
          <Typography fontSize="12px">Menunggu Pembayaran</Typography>
        </Box>
      </Box>
      <Divider variant="fullWidth" sx={{ my: "20px" }} />
      <Box sx={{ height: "180px", width: "740px" }}>
        <Grid container sx={{ width: "740px" }}>
          <Grid item sm={3} md={3}>
            <Box
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image width="70px" height="70px" src={fotoObat} />
            </Box>
          </Grid>
          <Grid item sm={9} md={9}>
            <Stack spacing="20px">
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography>Panadol Merah PDI</Typography>
                  <Typography fontSize="14px">1 strip</Typography>
                </Box>
                <Typography fontWeight="700">Rp13.000</Typography>
              </Box>
              <Link underline="hover" sx={{ ":hover": { cursor: "pointer" } }}>
                <Typography fontSize="12px">Tampilkan Detail</Typography>
              </Link>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Sub Total</Typography>
                <Typography fontWeight="700">Rp22.000</Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" sx={{ my: "15px" }} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography fontWeight="700">Chat Customer Service</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box textAlign="right" sx={{ mr: "15px" }}>
              <Typography fontSize="12px">Bayar Sebelum</Typography>
              <Typography fontSize="12px">6 April 2012, 12:23</Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                width: "157px",
                height: "30px",
                fontSize: "12px",
                fontWeight: "700",
              }}
            >
              Bayar Sekarang
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DaftarPemesananCard;
