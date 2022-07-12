import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  Modal,
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

const checkoutPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openMethod, setOpenMethod] = useState("");
  const [userAddress, setUserAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
    setOpenMethod(false);
  };
  const handleBack = () => setOpenMethod(false);
  const handleMethod = (payment) => {
    setOpenMethod(payment);
  };

  const [open, setOpen] = useState(false);
  const handleOpenAddress = () => setOpen(true);
  const handleCloseAddress = () => setOpen(false);

  const paymentMethod = [
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
      console.log(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const renderUserAddress = () => {
    return userAddress.map((val) => {
      return (
        <Box
        onClick={()=> setSelectedAddress(val)}
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
    fetchUserAddress();
    fetchMainAddress();
  }, []);

  return (
    <Box>
      <Grid container padding="56px 96px">
        <Grid item sm={8} md={8}>
          <ProductCheckoutContainer
            cardTitle={
              <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
                Alamat Pengiriman
              </Typography>
            }
          >
            <Stack spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
              <CheckoutCard />
            </ProductCheckoutContainer>
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
              {"Pilih Metode Pembayaran (1)"}
            </Button>
          </TotalCardCheckout>
        </Grid>
        <TemplateModal
          open={openModal}
          handleClose={handleClose}
          isMethod={openMethod}
          handleBack={handleBack}
          isiButton="Pilih Metode Pembayaran"
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
                {paymentMethod.map((val) => {
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
