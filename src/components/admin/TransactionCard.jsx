import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ModalSalinanResep from "components/admin/ModalSalinanResep";

import AccessTimeIcon from "@mui/icons-material/AccessTime";

import ModalTransaction from "./ModalTransaction";
import moment from "moment";
import axiosInstance from "configs/api";

const TransactionCard = ({ data, fetchTransaction }) => {
  const [salinanResep, setSalinanResep] = useState(false);
  const [acceptOrderOpen, setAcceptOrderOpen] = useState(false);
  const [isAvailable, setAvailable] = useState(false);
  const [allTransaction, setAllTransaction] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [severity, setSeverity] = useState();

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };

  const handleClose = () => {
    setAcceptOrderOpen(false);
  };

  const checkStock = () => {
    return data.productTransaction.forEach((val) => {
      if (
        val?.quantity > val?.Product?.Stock_opnames[0]?.amount ||
        !val.Product?.Stock_opnames?.length
      ) {
        setAvailable(true);
      } else {
        setAvailable(false);
      }
    });
  };

  const renderTransactionItem = () => {
    return data.productTransaction.map((val) => {
      return (
        <Grid container display="flex" sx={{ alignItems: "center" }}>
          <Grid item xs={4}>
            <Box display="flex" sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  m: 2,
                  pt: 1,
                  mr: "30px",
                  border: "solid grey",
                  width: "80px",
                  height: "80px",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={val.Product?.Product_images[0]?.image_url}
                  sx={{ width: "55px", height: "55px" }}
                />
              </Box>

              <Box sx={{ mr: "32px" }}>
                <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                  {val?.Product?.name?.length > 10
                    ? `${val?.Product?.name?.slice(0, 10)}...`
                    : val?.Product?.name}
                </Typography>
                <Typography sx={{ fontSize: "12px", color: "#737A8D" }}>
                  {val.quantity} x {val.Product?.price}
                </Typography>
                <Box
                  display="flex"
                  sx={{
                    color: "brand.500",
                    alignItems: "center",
                    ":hover": { cursor: "pointer" },
                  }}
                  onClick={() => {
                    setAllTransaction(false);
                  }}
                >
                  <Typography sx={{ fontSize: "12px" }}>
                    tutup obat lainnya
                  </Typography>
                  <ExpandLess fontSize="24px"></ExpandLess>
                </Box>

                {/* <Button
                sx={{ bgcolor: "brand.400" }}
                size="small"
                onClick={() => setSalinanResep(true)}
              >
                Buat Salinan Resep
              </Button> */}
                <ModalSalinanResep
                  open={salinanResep}
                  handleClose={() => setSalinanResep(false)}
                />
              </Box>
              <Divider sx={{ my: "16px" }} orientation="vertical" flexItem />
            </Box>
          </Grid>

          <Grid item xs={8}>
            <Stack direction="row" spacing={4}>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  Pembeli
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  {data.customerName}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  Alamat
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  {data.address}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  Kurir
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>Grab-Same Day</Typography>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      );
    });
  };

  const buttonHandler = async (newStatus) => {
    console.log(newStatus);
    try {
      const res = await axiosInstance.patch(
        `/transactions/${data.transactionId}`,
        {
          status_transaction: newStatus,
        }
      );
      if (res?.data?.message !== undefined) {
        setAlertContent("Success !");
        setAlert(true);
        setSeverity(true);
      }
      fetchTransaction();
    } catch (err) {
      console.log(err);
      setAlertContent("failed");
      setAlert(true);
      setSeverity(false);
    }
  };

  const renderButton = () => {
    if (data.status === "waiting for confirmation") {
      return (
        <Box display="flex">
          <Button
            sx={{ mr: "32px" }}
            onClick={() => {
              buttonHandler("canceled");
            }}
          >
            Tolak Pesanan
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setAcceptOrderOpen(true);
            }}
            disabled={isAvailable}
          >
            Terima Pesanan
          </Button>
        </Box>
      );
    } else if (data.status === "ready delivery") {
      return (
        <Box display="flex">
          <Button
            variant="contained"
            onClick={() => {
              buttonHandler("on delivery");
            }}
          >
            Minta Penjemputan
          </Button>
        </Box>
      );
    } else if (data.status === "on delivery") {
      return (
        <Box display="flex">
          <Button
            variant="contained"
            onClick={() => {
              buttonHandler("success");
            }}
          >
            Selesai
          </Button>
        </Box>
      );
    }
  };

  useEffect(() => {
    checkStock();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "10px",
        marginBottom: "20px",
        padding: "15px",
        boxShadow: "0px 8px 20px -12px black",
        alignItems: "center",
        bgcolor: "#FFFFFF",
      }}
    >
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
      <Box display="flex" sx={{ alignItems: "center" }}>
        <Checkbox></Checkbox>
        <Typography sx={{ fontWeight: "bold" }}> Pesanan Baru </Typography>
        <Typography sx={{ margin: "5px", color: "#B4B9C7" }}> / </Typography>
        <Typography sx={{ fontWeight: "bold" }}>
          {`${data.transactionId}-${moment(data.createdAt).format("YYYYMMDD")}`}
        </Typography>
        <Typography sx={{ margin: "5px", color: "#B4B9C7" }}> / </Typography>
        <AccessTimeIcon
          sx={{ fontSize: "20px", color: "#B4B9C7" }}
        ></AccessTimeIcon>
        <Typography sx={{ margin: "5px", color: "#B4B9C7" }}>
          {moment(data.createdAt).format("LLL")}
        </Typography>
      </Box>

      <Divider></Divider>

      {allTransaction ? (
        renderTransactionItem()
      ) : (
        <Grid container display="flex" sx={{ alignItems: "center" }}>
          <Grid item xs={4}>
            <Box display="flex" sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  m: 2,
                  pt: 1,
                  mr: "30px",
                  border: "solid grey",
                  width: "80px",
                  height: "80px",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={data.productImage}
                  sx={{ width: "55px", height: "55px" }}
                />
              </Box>

              <Box sx={{ mr: "32px" }}>
                <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                  {data.productName.length > 10
                    ? `${data?.productName?.slice(0, 10)}...`
                    : data.productName}
                </Typography>
                <Typography
                  sx={{ fontSize: "12px", color: "#737A8D" }}
                ></Typography>
                <Box
                  display="flex"
                  sx={{
                    color: "brand.500",
                    alignItems: "center",
                    ":hover": { cursor: "pointer" },
                  }}
                  onClick={() => {
                    setAllTransaction(true);
                  }}
                >
                  <Typography sx={{ fontSize: "12px" }}>
                    lihat obat lainnya
                  </Typography>
                  <ExpandMore fontSize="24px"></ExpandMore>
                </Box>
                {/* <Button
                sx={{ bgcolor: "brand.400" }}
                size="small"
                onClick={() => setSalinanResep(true)}
              >
                Buat Salinan Resep
              </Button> */}
                <ModalSalinanResep
                  open={salinanResep}
                  handleClose={() => setSalinanResep(false)}
                />
              </Box>
              <Divider sx={{ my: "16px" }} orientation="vertical" flexItem />
            </Box>
          </Grid>

          <Grid item xs={8}>
            <Stack direction="row" spacing={4}>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  Pembeli
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  {data.customerName}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  Alamat
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  {data.address}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  Kurir
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>Grab-Same Day</Typography>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      )}

      <Box
        display="flex"
        sx={{
          height: "40px",

          borderRadius: "4px",
          bgcolor: "#F6FAFB",
          alignItems: "center",
          justifyContent: "space-between",
          px: "16px",
        }}
      >
        <Box display="inline-flex">
          <Typography sx={{ fontWeight: "Bold", mr: 2, fontSize: "14px" }}>
            Total Harga
          </Typography>
          <Typography sx={{ fontSize: "14px" }}>
            ({data.countProduct} Obat)
          </Typography>
        </Box>

        <Typography sx={{ fontWeight: "Bold", fontSize: "14px" }}>
          Rp {data.totalPrice}
        </Typography>
      </Box>

      <Box
        display="flex"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          px: "16px",
          mt: "16px",
        }}
      >
        <Box display="flex" sx={{ color: "brand.500" }}>
          <Typography sx={{ pr: "32px", fontSize: "14px" }}>
            Chat Pembeli
          </Typography>
          <Typography sx={{ fontSize: "14px" }}>Detail Pesanan</Typography>
        </Box>

        {renderButton()}

        <ModalTransaction
          open={acceptOrderOpen}
          handleClose={handleClose}
          data={data}
          fetchTransaction={fetchTransaction}
        ></ModalTransaction>
      </Box>
    </Box>
  );
};
export default TransactionCard;
