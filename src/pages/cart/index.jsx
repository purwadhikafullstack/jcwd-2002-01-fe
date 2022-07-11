import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CartCard from "components/CartCard";
import Footer from "components/Footer";
import ProductCheckoutContainer from "components/ProductCheckoutContainer";
import TotalCard from "components/TotalCard";
import axiosInstance from "configs/api";
import { reduce } from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const cartPage = () => {
  const userCart = useSelector((state) => state.cart);
  const userSelector = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState(userCart.cartItems);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    // fetchCart();
    if (userCart.cartItems) {
      setCartItems(userCart.cartItems);
    }
  }, [userCart.cartItems]);

    return (
      <>
        <Container maxWidth="xl">
          <Typography
            sx={{ m: "50px 100px", fontSize: "24px", fontWeight: "700" }}
          >
            Keranjang Saya
          </Typography>
          <Grid container spacing={1}>
            <Grid item sm={8} md={8}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <ProductCheckoutContainer
                  cardTitle={
                    <FormControlLabel
                      sx={{ fontSize: "14px" }}
                      control={
                        <Checkbox
                          onChange={({ target: { checked } }) => {
                            let dupItems = [...checkedItems];
                            if (checked) {
                              cartItems?.forEach((val, idx) =>
                                dupItems.push(idx)
                              );
                            } else {
                              dupItems = [];
                            }
                            setCheckedItems(dupItems);
                          }}
                        />
                      }
                      label="Pilih Semua"
                    />
                  }
                >
                  {cartItems?.map((val, idx) => {
                    return (
                      <CartCard
                        index={idx}
                        val={val}
                        setCartChecked={() => {
                          let dupItems = [...checkedItems];

                          if (dupItems.includes(idx)) {
                            dupItems = dupItems.filter(
                              (oldItems) => oldItems !== idx
                            );
                          } else {
                            dupItems.push(idx);
                          }
                          setCheckedItems(dupItems);
                        }}
                        checked={checkedItems.includes(idx)}
                      />
                    );
                  })}
                </ProductCheckoutContainer>
              </Box>
            </Grid>
            <Grid item sm={4} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TotalCard
                  delivery={false}
                  checkedItems={checkedItems}
                  cartItems={cartItems}
                >
                  <Button variant="contained">{`Bayar (${userCart.cartCount})`}</Button>
                </TotalCard>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </>
    );
};

export default cartPage;
