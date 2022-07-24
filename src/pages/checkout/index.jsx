import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Link,
  Modal,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import CartCard from "components/CartCard";
import CheckoutCard from "components/CheckoutCard";
import Footer from "components/Footer";
import PaymentMethod from "components/PaymentMethod";
import ProductCheckoutContainer from "components/ProductCheckoutContainer";
import TemplateModal from "components/TemplateModal";
import TotalCard from "components/TotalCard";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import logoBCA from "assets/logoBCA.png";
import logoMandiri from "assets/mandiri.png";
import logoOvo from "assets/ovo.png";
import logoGopay from "assets/gopay.png";
import logoPermata from "assets/permata.png";
import TotalCardCheckout from "components/TotalCardCheckout";
import axiosInstance from "configs/api";
import { useEffect } from "react";
import UserAddress from "components/userAddress";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const checkoutPage = () => {
  const { selectedItems } = useSelector((state) => state.cart);
  const { totalPrice } = useSelector((state) => state.cart);
  const [openModal, setOpenModal] = useState(false);
  const [openMethod, setOpenMethod] = useState("");
  const [userAddress, setUserAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(selectedItems);
  const [pageIsReady, setPageIsReady] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [severity, setSeverity] = useState();
  const router = useRouter();
  const handleOpen = () => setOpenModal(true);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };

  const handleClose = () => {
    setOpenModal(false);
    setOpenMethod(false);
  };
  const selectPaymentMethod = () => {
    setPaymentMethod(openMethod);
  };

  const handleBack = () => setOpenMethod(false);
  const handleMethod = (payment) => {
    setOpenMethod(payment);
  };

  const [open, setOpen] = useState(false);
  const handleOpenAddress = () => setOpen(true);
  const handleCloseAddress = () => setOpen(false);

  const paymentMethodList = [
    {
      logo: logoBCA,
      title: "BCA Virtual Account",
      payment: "BCA",
    },
    {
      logo: logoMandiri,
      title: "Mandiri Virtual Account",
      payment: "Mandiri",
    },
    {
      logo: logoPermata,
      title: "Permata Virtual Account",
      payment: "Permata",
    },
    {
      logo: logoGopay,
      title: "GoPay",
      payment: "GoPay",
    },
    {
      logo: logoOvo,
      title: "OVO",
      payment: "OVO",
    },
  ];

  const fetchUserAddress = async () => {
    try {
      const res = await axiosInstance.get("/users/address");

      setUserAddress(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMainAddress = async () => {
    try {
      const res = await axiosInstance.get("/users/main-address");

      setSelectedAddress(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const renderUserAddress = () => {
    return userAddress?.map((val) => {
      return (
        <Box
          onClick={() => {
            setSelectedAddress(val);
            handleCloseAddress();
          }}
          sx={{
            p: 2,
            ":hover": {
              backgroundColor: "brand.200",
              cursor: "pointer",
            },
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>
              {val.address_label}, {val.recipient_name}
            </Typography>
            <Typography>{`(${val.recipient_telephone})`}</Typography>
          </Box>
          <Typography sx={{ fontSize: "12px", fontWeight: "400" }}>
            {val.address}, {val.province}, {val.city}
          </Typography>
        </Box>
      );
    });
  };

  useEffect(() => {
    if (selectedItems?.length == 0) {
      router.push("/cart");
    }
    fetchUserAddress();
    fetchMainAddress();
    fetchSelectedItems();
  }, []);

  const fetchSelectedItems = async () => {
    try {
      const res = await axiosInstance.post("/cart/selected-cart", {
        cart_id: selectedItems || selectedProduct,
      });

      // if (res?.data?.message !== undefined) {
      //   setAlertContent("Added to Cart!");
      //   setAlert(true);
      //   setSeverity(true);
      // }

      setSelectedProduct(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   const cart_id = localStorage.getItem("user-cart");
  //   const parsedSelectedProduct = JSON.parse(cart_id);
  //   setSelectedProduct(parsedSelectedProduct);
  // }, []);
  // console.log(selectedProduct);

  // if (!pageIsReady) {
  //   return <CircularProgress />;
  // }

  const renderSelectedItems = () => {
    return selectedProduct?.map((val, idx) => {
      return (
        <CheckoutCard
          price={val?.Product?.price}
          productName={val?.Product?.name}
          productImage={val?.Product?.Product_images[0]?.image_url}
          quantity={val?.quantity}
          key={idx}
        />
      );
    });
  };

  const checkout = async () => {
    try {
      const res = await axiosInstance.post("/cart/checkout", {
        cart_id: selectedItems,
        total_price: totalPrice,
        addressId: selectedAddress.id,
      });

      if (res?.data?.message !== undefined) {
        router.push("/confirm_order");
      }
      
    } catch (err) {
      console.log(err);
      setAlertContent(err?.response?.data?.message);
      setAlert(true);
      setSeverity(false);
    }
  };

  return (
    <Box>
      {alert ? (
        <Snackbar
          open={alert}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert variant="filled" severity={severity ? "success" : "error"}>
            {alertContent}{" "}
            <Link
              href="/confirm_order"
              sx={{ color: "brand.500", fontWeight: "700" }}
            >
              Bayar transaksi yang lain
            </Link>
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
      <Grid container padding="56px 96px">
        <Grid item sm={8} md={8}>
          <Box sx={{ px: "60px" }}>
            <ProductCheckoutContainer
              cardTitle={
                <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
                  Alamat Pengiriman
                </Typography>
              }
            >
              <Stack spacing={2}>
                {selectedAddress ? (
                  <>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography>
                        {selectedAddress?.recipient_name},{" "}
                        {selectedAddress?.recipient_telephone}
                      </Typography>
                      <Link underline="hover">
                        <Typography
                          onClick={handleOpenAddress}
                          sx={{
                            color: "brand.500",
                            fontWeight: "700",
                            fontSize: "12px",
                            ":hover": {
                              cursor: "pointer",
                            },
                          }}
                        >
                          Pilih Alamat Lain
                        </Typography>
                      </Link>
                    </Box>
                    <Typography>{selectedAddress?.address_label}</Typography>
                    <Typography>
                      {`${selectedAddress?.address}, Kec. ${selectedAddress?.kecamatan}, Kota ${selectedAddress?.city}, 
                ${selectedAddress?.province} ${selectedAddress?.postal_code}`}
                    </Typography>
                  </>
                ) : (
                  <Typography sx={{ my: "40px" }}>Belum Ada Alamat</Typography>
                )}
                <Divider />

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    size="small"
                    sx={{
                      mr: "16px",
                      color: "brand.500",
                      boxShadow:
                        "4px 0px 2px rgba(32, 51, 96, 0.01), 0px 4px 4px rgba(0, 0, 0, 0.03), 2px 2px 2px rgba(190, 190, 190, 0.08), -2px -2px 2px rgba(190, 190, 190, 0.08), -4px -4px 4px rgba(190, 190, 190, 0.06), 8px 8px 4px rgba(190, 190, 190, 0.06);",
                    }}
                    onClick={() => router.push("/address")}
                  >
                    {<BsPlusLg />}
                  </IconButton>
                  <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>
                    Tambahkan Alamat Baru
                  </Typography>
                </Box>
              </Stack>
            </ProductCheckoutContainer>
            <Modal open={open} onClose={handleCloseAddress}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 500,
                  minHeight: 600,
                  bgcolor: "background.paper",
                  borderRadius: "8px",
                  boxShadow: 24,
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <Box sx={{ position: "absolute", right: "0px", top: "0px" }}>
                    <IconButton onClick={handleCloseAddress}>
                      {<MdClose />}
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      pt: "5px",
                    }}
                  >
                    <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
                      Alamat
                    </Typography>
                  </Box>
                  {renderUserAddress()}
                </Box>
              </Box>
            </Modal>
            <Box sx={{ my: "26px" }}>
              <ProductCheckoutContainer
                cardTitle={
                  <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
                    Ringkasan Order
                  </Typography>
                }
              >
                {renderSelectedItems()}
              </ProductCheckoutContainer>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={4} md={4}>
          <TotalCardCheckout delivery={"7000"}>
            <Divider />
            <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
              Metode Pembayaran
            </Typography>
            <Typography sx={{ fontSize: "14", fontWeight: "400" }}>
              Silahkan pilih metode pembayaran anda disini
            </Typography>
            <Button variant="contained" onClick={handleOpen}>
              {`Pilih Metode Pembayaran (${selectedItems?.length})`}
            </Button>
            <Button
              variant="contained"
              onClick={checkout}
              disabled={paymentMethod ? false : true}
            >
              Checkout
            </Button>
          </TotalCardCheckout>
        </Grid>
        <TemplateModal
          open={openModal}
          handleClose={() => {
            handleClose();
          }}
          isMethod={openMethod}
          handleBack={handleBack}
          isiButton="Pilih Metode Pembayaran"
          totalPrice={totalPrice}
          selectPaymentMethod={selectPaymentMethod}
        >
          {openMethod == "BCA" ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  minHeight: "82px",
                  width: "444px",
                  my: "24px",
                  p: "18px 20px",
                  boxShadow:
                    "0px 2px 3px 2px rgba(33, 51, 96, 0.02), 0px 4px 12px 4px rgba(0, 155, 144, 0.08)",
                  borderRadius: "8px",
                }}
              >
                <Typography>BCA Virtual Account</Typography>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                {paymentMethodList.map((val) => {
                  return (
                    <PaymentMethod
                      logo={val.logo}
                      title={val.title}
                      payment={() => handleMethod(val.payment)}
                    />
                  );
                })}
              </Box>
            </Box>
          )}
        </TemplateModal>
      </Grid>
      <Footer />
    </Box>
  );
};

export default checkoutPage;
