import Image from "next/image";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import fotoObat from "assets/panadol.jpg";
import { IoMdHeart } from "react-icons/io";
import { useState } from "react";
import Link from "next/link";
import axiosInstance from "configs/api";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { addToCart, cartCount, incrementCartCount } from "redux/reducers/cart";

const ProductCard = ({ productName, price, productImage, id }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [severity, setSeverity] = useState();
  const userSelector = useSelector((state) => state.auth);
  const cartSelector = useSelector(state => state.cart)

  const router = useRouter();

  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };

  const addOneItemToCart = async () => {
    try {
      const res = await axiosInstance.post("/cart", {
        product_id: id,
        quantity: 1
      });

      console.log(res.data.result.rows);

      // const newCart = [...cartSelector.cartItems]
      // newCart.push(res.data.result)

      dispatch(addToCart(res.data.result.rows))
      dispatch(cartCount(res.data.result.count))

      if (res?.data?.message !== undefined) {
        setAlertContent("Added to Cart!");
        setAlert(true);
        setSeverity(true);
      }
    } catch (err) {
      setAlertContent(err?.response?.data?.message);
      setAlert(true);
      setSeverity(false);
      console.log(err);
    }
  };

  return (
    <>
      {alert ? (
        <Snackbar
          open={alert}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert variant="filled" severity={severity ? "success" : "error"}>
            {alertContent}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
      <Box
        sx={{
          width: "194px",
          height: "331px",
          margin: "10px",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0px 8px 20px -12px black",
          backgroundColor: "white",
          transition: "200ms",
          ":hover": {
            transform: "translateY(-5px)",
            boxShadow: "0px 12px 20px -12px black",
          },
        }}
        position="relative"
      >
        <Box
          marginTop="9px"
          marginBottom="14px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {/* IMAGE */}
          <Link href={`product_detail/${id}`}>
            <Box
              sx={{
                width: "114px",
                height: "116px",
                ":hover": {
                  cursor: "pointer",
                },
              }}
              component="img"
              src={productImage}
            />
          </Link>
        </Box>
        <Box position="absolute" top="20px" right="20px">
          <IconButton
            onClick={() => setIsLiked(!isLiked)}
            sx={{
              width: "44px",
              height: "44px",
              backgroundColor: "white",
              color: isLiked ? "#f57182" : "#D5D7DD",
              boxShadow: "0px 8px 20px -12px black",
              ":hover": {
                backgroundColor: "#D5D7DD",
                color: isLiked ? "#f57182" : "whitesmoke",
              },
            }}
          >
            {<IoMdHeart />}
          </IconButton>
        </Box>
        <Typography marginBottom="25px" fontWeight="700">
          {productName?.length > 20
            ? `${productName?.slice(0, 15)}...`
            : productName}
        </Typography>
        <Typography marginBottom="20px">
          Rp. {price?.toLocaleString()} / pack
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Button
            variant="outlined"
            onClick={() => addOneItemToCart()}
            sx={{
              borderRadius: "8px",
              width: "139px",
              fontSize: "12px",
              fontWeight: "700",
              position: "absolute",
              bottom: "25px",
            }}
          >
            Keranjang
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ProductCard;
