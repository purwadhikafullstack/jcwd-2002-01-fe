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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedItems, totalCart } from "redux/reducers/cart";

const cartPage = () => {
  const userCart = useSelector((state) => state.cart);
  const userSelector = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState(userCart.cartItems);
  const dispatch = useDispatch();
  const [checkedItems, setCheckedItems] = useState([]);
  const router = useRouter();

  const calculateTotalPrice = () => {
    return cartItems.reduce((init, obj, idx) => {
      if (!checkedItems.includes(obj.id)) {
        return init;
      }
      return init + obj.Product.price * obj.quantity;
    }, 0);
  };

  const checkout = () => {
    dispatch(totalCart(calculateTotalPrice()));
    dispatch(selectedItems(checkedItems));

    localStorage.setItem("user-cart", JSON.stringify(checkedItems))

    router.push("/checkout");
  }

  useEffect(() => {
    // fetchCart();
    if (!userSelector.id) {
      router.push("/");
    }

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
                px: "70px"
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
                              dupItems.push(val.id)
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

                        if (dupItems.includes(val.id)) {
                          dupItems = dupItems.filter(
                            (oldItems) => oldItems !== val.id
                          );
                        } else {
                          dupItems.push(val.id);
                        }
                        setCheckedItems(dupItems);
                      }}
                      checked={checkedItems.includes(val.id)}
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
                calculateTotalPrice={calculateTotalPrice}
              >
                <Button
                  variant="contained"
                  onClick={() => checkout()}
                >{`Bayar (${userCart.cartCount})`}</Button>
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
