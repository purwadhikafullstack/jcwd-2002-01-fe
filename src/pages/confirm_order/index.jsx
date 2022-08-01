import {
  Alert,
  Box,
  Button,
  Container,
  Input,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import ProductCheckoutContainer from "components/ProductCheckoutContainer";
import { useRef, useState } from "react";
import Dropzone from "components/Dropzone";
import Footer from "components/Footer";
import Countdown from "react-countdown";
import moment from "moment";
import axiosInstance from "configs/api";
import { useEffect } from "react";
import CheckoutCard from "components/CheckoutCard";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const confirmOrder = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [products, setProducts] = useState([]);
  const inputFileRef = useRef(null);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [severity, setSeverity] = useState();
  const { totalPrice } = useSelector((state) => state.cart);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };

  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const uploadProofOfPayment = async () => {
    const formData = new FormData();

    formData.append("payment_image_file", selectedFile);
    formData.append("method", "bank transfer");
    formData.append("amount", totalPrice);

    setTimeout(async () => {
      try {
        setUploading(true);
        const res = await axiosInstance.post("/payment", formData);
        fetchCheckedOutItems();
        router.push("/proses_pemesanan");

        if (res?.data?.message !== undefined) {
          setAlertContent("upload proof of payment success! your order will be processed as soon as posible");
          setAlert(true);
          setSeverity(true);
        }
      } catch (err) {
        setAlertContent(err?.response?.data?.message);
        setAlert(true);
        setSeverity(false);
        console.log(err);
      }
    }, 3000);
    setUploading(false);
  };

  const renderer = ({ hours, minutes, seconds, completed, days }) => {
    if (completed) {
      // Render a completed state
      return;
    } else {
      // Render a countdown
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "120px",
            justifyContent: "space-between",
            fontWeight: "700",
            color: "#FF6B6B",
          }}
        >
          <Box
            sx={{
              height: "30px",
              width: "30px",
              backgroundColor: "#FF6B6B",
              color: "white",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {hours}
          </Box>
          :
          <Box
            sx={{
              height: "30px",
              width: "30px",
              backgroundColor: "#FF6B6B",
              color: "white",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {minutes}
          </Box>
          :
          <Box
            sx={{
              height: "30px",
              width: "30px",
              backgroundColor: "#FF6B6B",
              color: "white",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {seconds}
          </Box>
        </Box>
      );
    }
  };

  const fetchCheckedOutItems = async () => {
    try {
      const res = await axiosInstance.get("/cart/checkout-items");

      setProducts(res.data.result[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCheckedOutItems();
  }, []);

  const renderCheckedoutItems = () => {
    return products?.TransactionItems?.map((val, idx) => {
      return (
        <CheckoutCard
          price={val?.Product.price}
          productImage={val?.Product?.Product_images[0]?.image_url}
          productName={val?.Product.name}
          quantity={val?.quantity}
        />
      );
    });
  };

  return (
    <>
      {alert ? (
        <Snackbar
          open={alert}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert variant="filled" severity={severity ? "success" : "error"}>
            {alertContent}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
      <Container maxWidth="md">
        <Typography sx={{ fontSize: "24px", fontWeight: "700", my: 3 }}>
          Menunggu Pembayaran
        </Typography>

        <Stack spacing={2}>
          <Box
            sx={{
              width: "100%",
              boxShadow: "0px 2px 3px 2px #E8F6FC, 0px 4px 12px 4px #E8F6FC;",
              p: "27px 43px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "16px",
            }}
          >
            <Stack spacing={1}>
              <Typography
                sx={{ fontSize: "14px", fontWeight: "400", color: "#737A8D" }}
              >
                Batas Akhir Pembayaran
              </Typography>
              <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
                {moment(products.valid_until).format("LLLL")}
              </Typography>
            </Stack>
            <Box>
              <Countdown
                date={moment(products.valid_until) + 8.64e7}
                renderer={renderer}
              />
            </Box>
          </Box>
          <ProductCheckoutContainer
            cardTitle={
              <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
                Ringkasan Order
              </Typography>
            }
          >
            {renderCheckedoutItems()}
          </ProductCheckoutContainer>
          <ProductCheckoutContainer
            cardTitle={
              <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
                Upload Bukti Transfer
              </Typography>
            }
          >
            <Box>
              <Stack spacing={1} sx={{ my: "20px" }}>
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "400", color: "#737A8D" }}
                >
                  Nomor Virtual Account
                </Typography>
                <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
                  8099832139874328
                </Typography>
              </Stack>
              <Dropzone
                isResep={false}
                onDrop={onDrop}
                prescriptionImage={selectedFile}
                upload={() => uploadProofOfPayment()}
                setPrescriptionImage={setSelectedFile}
                isUploading={uploading}
              />
            </Box>
          </ProductCheckoutContainer>
        </Stack>
      </Container>
      <Footer />
    </>
  );
};

export default confirmOrder;
