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
import ProductCheckoutContainer from "components/ProductCheckoutContainer";
import TotalCard from "components/TotalCard";

const cartPage = () => {
  return (
    <Box>
      <Grid container padding="56px 96px">
        <Grid item sm={8} md={8}>
          <ProductCheckoutContainer
            cardTitle={
              <FormControlLabel
                sx={{ fontSize: "14px" }}
                control={<Checkbox defaultChecked />}
                label="Pilih Semua"
              />
            }
          >
            <CartCard />
          </ProductCheckoutContainer>
        </Grid>
        <Grid item sm={4} md={4}>
          <TotalCard delivery={false}>
            <Button variant="contained">{"Bayar (1)"}</Button>
          </TotalCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default cartPage;
