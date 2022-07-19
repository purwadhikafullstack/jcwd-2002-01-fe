import {
  Alert,
  Box,
  Button,
  Divider,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import moment from "moment";
import { useState } from "react";
import axiosInstance from "configs/api";

const ModalTransaction = ({ open, handleClose, data }) => {
  const [allProduct, setAllProduct] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [severity, setSeverity] = useState();

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };

  const acceptOrderHandler = async () => {
    try {
      const res = await axiosInstance.patch(
        `/transactions/${data.transactionId}`,
        {
          status_transaction: "ready delivery",
        }
      );
      if (res?.data?.message !== undefined) {
        setAlertContent("Accepted Order !");
        setAlert(true);
        setSeverity(true);
      }
    } catch (err) {
      console.log(err);
      setAlertContent(err?.response?.data?.message);
      setAlert(true);
      setSeverity(false);
    }
  };

  const renderProduct = () => {
    return data.productTransaction.map((val) => {
      return (
        <Box sx={{ marginTop: "16px" }}>
          <Typography> {val.Product.name}</Typography>
          <Typography>
            {val.quantity} x {val.Product?.price}
          </Typography>
          <Box
            display="flex"
            sx={{
              color: "brand.500",
              alignItems: "center",
              ":hover": { cursor: "pointer" },
            }}
          ></Box>
        </Box>
      );
    });
  };
  return (
    <>
      {alert ? (
        <Snackbar
          open={alert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert variant="filled" severity={severity ? "success" : "error"}>
            {alertContent}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 5,
          }}
        >
          <Box display="flex" justifyContent="end" marginBottom="16px">
            <CloseIcon
              onClick={() => {
                handleClose();
              }}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            sx={{ justifyContent: "center", alignItems: "center" }}
            marginBottom="30px"
          >
            <Typography fontSize="20px" fontWeight="bold">
              Terima Pesanan
            </Typography>
            <Typography fontSize="16px">
              Stok akan berkurang secara otomatis setelah pesanan diproses
            </Typography>
          </Box>

          <Box display="flex" sx={{ alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold" }}>
              {data.customerName}
            </Typography>
            <Typography sx={{ margin: "5px", color: "#B4B9C7" }}>
              {" "}
              /{" "}
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {`${data.transactionId}-${moment(data.createdAt).format(
                "YYYYMMDD"
              )}`}
            </Typography>
            <Typography sx={{ margin: "5px", color: "#B4B9C7" }}>
              {" "}
              /{" "}
            </Typography>
            <AccessTimeIcon
              sx={{ fontSize: "20px", color: "#B4B9C7" }}
            ></AccessTimeIcon>
            <Typography sx={{ margin: "5px", color: "#B4B9C7" }}>
              {moment(data.createdAt).format("LLL")}
            </Typography>
          </Box>

          {allProduct ? (
            renderProduct()
          ) : (
            <Box sx={{ marginTop: "16px" }}>
              <Typography> {data.productName}</Typography>
              <Typography>
                {data.quantity} x {data.productPrice}
              </Typography>
              <Box
                display="flex"
                sx={{
                  color: "brand.500",
                  alignItems: "center",
                  ":hover": { cursor: "pointer" },
                }}
                onClick={() => {
                  setAllProduct(true);
                }}
              >
                <Typography sx={{ fontSize: "12px" }}>
                  lihat 2 obat lainnya
                </Typography>
                <ExpandMore fontSize="24px"></ExpandMore>
              </Box>
            </Box>
          )}

          <Box
            display="flex"
            sx={{
              height: "40px",
              marginTop: "20px",
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
          <Divider sx={{ marginY: "16px" }}></Divider>
          <Box display="flex" sx={{ justifyContent: "end" }}>
            <Button variant="contained" onClick={acceptOrderHandler}>
              Terima Pesanan
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalTransaction;
