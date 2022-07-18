import { Box, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import fotoObat from "assets/panadol.jpg";

const CheckoutCard = ({ productName, price, quantity, productImage }) => {
  return (
    <Box sx={{ mb: "50px" }}>
      <Grid container spacing={1}>
        <Grid item sx={3} md={3}>
          <Box sx={{ maxWidth: "120px" }}>
            <Box
              component="img"
              sx={{ maxWidth: "120px" }}
              src={productImage}
            />
          </Box>
        </Grid>
        <Grid item sm={8} md={8} sx={{ fontSize: "16px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography>{productName}</Typography>
                <Typography>1 Strip</Typography>
              </Box>
              <Typography fontWeight="700">
                Rp. {`${price?.toLocaleString()} x ${quantity}`}
              </Typography>
            </Box>
            <Grid sm={12} md={12}>
              <Divider sx={{ mb: "12px", mt: "61px" }} />
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Sub Total</Typography>
              <Typography fontWeight="700">
                Rp. {(price * quantity)?.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{my: "20px"}} />
    </Box>
  );
};

export default CheckoutCard;
