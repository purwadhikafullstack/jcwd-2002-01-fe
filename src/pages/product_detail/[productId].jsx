import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
  Snackbar,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import Navbar from "components/Navbar";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import * as Yup from "yup";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { FaCartPlus } from "react-icons/fa";
import { BsChatDotsFill, BsShareFill } from "react-icons/bs";
import ProductCard from "components/ProductCard";
import Footer from "components/Footer";
import Deskripsi from "components/tabs/Deskripsi";
import TabPanel from "components/TabPanel";
import RelatedProduct from "components/RelatedProducts";
import ProductCarousel from "components/ProductCarousel";
import { useDispatch } from "react-redux";
import { cartCount, incrementCartCount, quantityHandler } from "redux/reducers/cart";
import axiosInstance from "configs/api";
import { addToCart } from "redux/reducers/cart";

const productDetailPage = ({ productDetail }) => {
  const [counter, setCounter] = useState(0);
  const [tabMenu, setTabMenu] = useState(0);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [severity, setSeverity] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [product, setProduct] = useState({});

  const router = useRouter();
  const query = router.query;

  const product_id = query.productId;

  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };

  const addItemsToCart = async () => {
    try {
      if (counter == 0) {
        return console.log("quantitynya 0");
      }
      const res = await axiosInstance.post("/cart", {
        quantity: counter,
        product_id
      });

      dispatch(addToCart(res.data.result.rows));
      dispatch(cartCount(res.data.result.count));

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

  const qtyHandler = (status) => {
    if (status === "increment") {
      if (counter === "") {
        return;
      }
      if (counter >= 10) return;
      setCounter(counter + 1);
    } else if (status === "decrement") {
      if (counter < 1) return;

      setCounter(counter - 1);
    }
  };

  const handleTabMenu = (event, newValue) => {
    setTabMenu(newValue);
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
      <Box sx={{ mx: "96px" }}>
        <Typography sx={{ pl: "80px", pt: "40px" }}>
          Beranda/ Kategori/ Obat
        </Typography>
        <Grid container spacing={2} marginTop="70px" sx={{ height: "100vh" }}>
          <Grid
            item
            xs={5}
            md={5}
            sx={{
              heigth: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box>
              <Box>
                {/* <Image src={productDetail.Product_images[0].image_url} /> */}
                <Box
                // component="img" src={productDetail.Product_images[0].image_url}
                />
                <ProductCarousel img_url={productDetail.Product_images} />
              </Box>
              <Box>
                <Button
                  variant="contained"
                  startIcon={<BsChatDotsFill />}
                  sx={{
                    borderRadius: "50px",
                    mr: "5px",
                    minwidth: "145px",
                  }}
                >
                  Chat Admin
                </Button>
                <Button
                  variant="contained"
                  startIcon={<BsShareFill />}
                  sx={{
                    borderRadius: "50px",
                    minwidth: "145px",
                  }}
                >
                  Bagikan
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={7}
            md={7}
            sx={{
              borderRadius: "5px",
            }}
          >
            <Box>
              <Typography fontSize="22px" marginBottom="20px">
                {productDetail.name}
              </Typography>
              <Typography fontSize="24px" fontWeight="700" marginBottom="24px">
                Rp.{productDetail.price}
              </Typography>
            </Box>
            {/* Button */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                maxWidth: 180,
                borderRadius: 3,
                mb: "20px",
              }}
            >
              <Button
                onClick={() => qtyHandler("decrement")}
                disabled={counter == 0}
                variant="outlined"
                sx={{
                  border: 0,
                  fontWeight: "bold",
                  "&:hover": {
                    border: 0,
                  },
                  ":disabled": {
                    border: "none",
                  },
                }}
              >
                -
              </Button>
              <Typography
                sx={{
                  border: 0,
                  color: "brand.500",
                  width: "50px",
                  textAlign: "center",
                }}
              >
                {counter}
              </Typography>
              <Button
                onClick={() => qtyHandler("increment")}
                variant="outlined"
                sx={{
                  border: 0,
                  fontWeight: "bold",
                  "&:hover": {
                    border: 0,
                  },
                }}
              >
                +
              </Button>
            </Box>

            <Box marginBottom="76px">
              <Button
                variant="outlined"
                startIcon={<FaCartPlus style={{ marginRight: "10px" }} />}
                style={{ minWidth: "194px", minHeight: "47px" }}
                onClick={() => addItemsToCart()}
              >
                Keranjang
              </Button>
              <Button
                variant="contained"
                sx={{ ":hover": { boxShadow: "none" } }}
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  minWidth: "150px",
                  minHeight: "47px",
                  boxShadow: "none",
                }}
              >
                Beli
              </Button>
              <Button
                variant={isLiked ? "contained" : "outlined"}
                style={{
                  minWidth: "47px",
                  minHeight: "47px",
                  boxShadow: "none",
                }}
                sx={{ ":hover": { boxShadow: "none" } }}
                onClick={() => setIsLiked(!isLiked)}
              >
                {isLiked ? (
                  <HiHeart fontSize="20px" />
                ) : (
                  <HiOutlineHeart fontSize="20px" />
                )}
              </Button>
            </Box>
            <Box sx={{ width: "616px" }}>
              <Box
                sx={{ borderBottom: 1, borderTop: 1, borderColor: "divider" }}
              >
                <Tabs
                  variant="fullWidth"
                  onChange={handleTabMenu}
                  value={tabMenu}
                  centered
                  sx={{
                    ".MuiTabs-indicator": {
                      backgroundColor: "brand.500",
                      color: "brand.500",
                    },
                  }}
                >
                  <Tab label="Deskripsi" sx={{ textTransform: "none" }} />
                  <Tab label="Cara Pakai" sx={{ textTransform: "none" }} />
                  <Tab label="Peringatan" sx={{ textTransform: "none" }} />
                </Tabs>
              </Box>
              <TabPanel value={tabMenu} index={0}>
                {<Deskripsi />}
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
        <Box>
          <Divider variant="fullWidth" sx={{ my: "72px" }} />
        </Box>
        <RelatedProduct />
      </Box>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  const { productId } = context.params;

  const res = await axios.get(`http://localhost:2001/products/byId/${productId}`);

  return {
    props: {
      productDetail: res?.data?.result,
    },
  };
}

export default productDetailPage;
