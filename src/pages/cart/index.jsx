import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CartCard from "components/CartCard";

const cartPage = () => {
  return (
    <Box>
      <Grid container padding="96px">
        <Grid item sm={8} md={8}>
          <Box
            sx={{
              width: "783px",
              height: "258px",
              boxShadow:
                "0px 2px 3px 2px rgba(33, 51, 96, 0.02), 0px 4px 12px 4px rgba(0, 155, 144, 0.08)",
              borderRadius: "8px",
              p: "28px 40px",
            }}
          >
            <FormControlLabel
              sx={{ fontSize: "14px" }}
              control={<Checkbox defaultChecked />}
              label="Pilih Semua"
            />
            <Divider />
            <CartCard />
          </Box>
        </Grid>
        <Grid item sm={4} md={4}>
          <Box
            sx={{
              width: "405px",
              height: "299px",
              boxShadow:
                "0px 2px 3px 2px rgba(33, 51, 96, 0.02), 0px 4px 12px 4px rgba(0, 155, 144, 0.08)",
              borderRadius: "8px",
              p: "28px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography fontWeight="700" fontSize="20px">
              Total
            </Typography>
            <Box
              color="gray"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography fontWeight="400">Sub Total</Typography>
              <Typography fontWeight="700"> Rp. 13.000</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontWeight="700">Total</Typography>
              <Typography fontWeight="700">Rp. 22.000</Typography>
            </Box>
            <Button variant="contained">{"Bayar (1)"}</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default cartPage;
