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

const checkoutPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openMethod, setOpenMethod] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const handleBack = () => setOpenMethod(false);
  const handleMethod = (payment) => {
    setOpenMethod(payment);
  };

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
                <Typography>Jane Doe, +62123456789</Typography>
                <Link underline="hover">
                  <Typography
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
              <Typography>Rumah Tukul</Typography>
              <Typography>
                Jl. Erlangga XII No.25, RT.5/RW.3, Selong, Kec. Kby. Baru, Kota
                Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12110
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
          <TotalCard delivery={"7000"}>
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
          </TotalCard>
        </Grid>
        <TemplateModal
          open={openModal}
          handleClose={handleClose}
          isMethod={openMethod}
        >
          {openMethod == "BCA" ? (
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
              <Box sx={{ p: "10px" }}>
                <Button variant="contained" disabled sx={{ width: "100%" }}>
                  Pilih Metode
                </Button>
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
