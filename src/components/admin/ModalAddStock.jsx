const {
  Modal,
  Stack,
  Box,
  Typography,
  FormControl,
  Grid,
  FormLabel,
  Select,
  MenuItem,
  Button,
  OutlinedInput,
  FormHelperText,
  Divider,
  Stepper,
  Step,
  StepLabel,
} = require("@mui/material");
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "configs/api";
import { useFormik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import BannerTambahProduct from "../../assets/tambah-product.png";

const steps = ["Input New Stock", "Finish"];

const ModalAddStock = ({ open, handleClose, data, fetchProduct }) => {
  const [orderDate, setOrderDate] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  const dateHandle = (event) => {
    setOrderDate(event.target.value);
    formik.setFieldValue("expired_date", event.target.value);
  };

  const handleSubmit = async (values) => {
    try {
      const newStock = {
        productName: data.namaObat,
        quantity: values.quantity,
        expired_date: values.expired_date,
        purchasePrice: values.purchasePrice,
      };

      await axiosInstance.post("/products/addstock", newStock);

      formik.setFieldValue("quantity", 0);
      formik.setFieldValue("expired_date", "");
      formik.setFieldValue("purchasePrice", 0);

      fetchProduct();
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      quantity: 0,
      expired_date: orderDate,
      purchasePrice: 0,
    },
    validationSchema: Yup.object().shape({
      quantity: Yup.number().min(1),
      expired_date: Yup.date(),
      purchasePrice: Yup.number().min(1),
    }),
    validateOnChange: false,
    onSubmit: handleSubmit,
  });

  return (
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
        <Box display="flex" justifyContent="space-between" marginBottom="30px">
          <Typography fontSize="20px" fontWeight="bold">
            Tambah Stock
          </Typography>
          <CloseIcon
            onClick={() => {
              handleClose();
              setActiveStep(0);
            }}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          />
        </Box>

        <Box>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>

        {activeStep === 1 ? (
          <>
            <Box
              display="flex"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Image src={BannerTambahProduct} />
              <Typography
                sx={{
                  marginTop: "20px",
                  fontSize: "16px",
                  color: "Brand.500",
                  fontWeight: "bold",
                }}
              >
                Stock Berhasil Ditambahkan!
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <Stack spacing={2}>
              <FormControl sx={{ borderRadius: "4px" }}>
                <Grid container>
                  <Grid item xs={4}>
                    <FormLabel
                      sx={{
                        fontSize: "14px",
                        color: "black",
                      }}
                    >
                      Nama Produk
                    </FormLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{data.namaObat}</Typography>
                  </Grid>
                </Grid>
              </FormControl>

              <FormControl sx={{ borderRadius: "4px" }}>
                <Grid container>
                  <Grid item xs={4}>
                    <FormLabel
                      sx={{
                        fontSize: "14px",
                        color: "black",
                      }}
                    >
                      Current Stock
                    </FormLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>{data.stok || 0}</Typography>
                  </Grid>
                </Grid>
              </FormControl>

              <FormControl sx={{ borderRadius: "4px" }}>
                <Grid container>
                  <Grid item xs={4}>
                    <FormLabel
                      sx={{
                        fontSize: "14px",
                        color: "black",
                      }}
                    >
                      Kuantitas
                    </FormLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <Stack direction="row">
                      <Box
                        sx={{ justifyContent: "center", alignItems: "center" }}
                      >
                        <OutlinedInput
                          type="number"
                          size="small"
                          placeholder="Masukkan Jumlah Stok"
                          value={formik.values.quantity}
                          onChange={(event) =>
                            formik.setFieldValue("quantity", event.target.value)
                          }
                        />
                        <FormHelperText error={true}>
                          {formik.errors.quantity || " "}
                        </FormHelperText>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </FormControl>

              <FormControl sx={{ borderRadius: "4px" }}>
                <Grid container>
                  <Grid item xs={4}>
                    <FormLabel
                      sx={{
                        fontSize: "14px",
                        color: "black",
                      }}
                    >
                      Harga Beli
                    </FormLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <OutlinedInput
                      onChange={(event) =>
                        formik.setFieldValue(
                          "purchasePrice",
                          event.target.value
                        )
                      }
                      sx={{ height: "32px", minWidth: "226px" }}
                      placeholder="Masukkan Harga Jual"
                      value={formik.values.purchasePrice}
                    />
                    <FormHelperText error={true}>
                      {formik.errors.purchasePrice || " "}
                    </FormHelperText>
                  </Grid>
                </Grid>
              </FormControl>

              <FormControl sx={{ borderRadius: "4px" }}>
                <Grid container>
                  <Grid item xs={4}>
                    <FormLabel
                      sx={{
                        fontSize: "14px",
                        color: "black",
                      }}
                    >
                      Tanggal Kadaluarsa
                    </FormLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <OutlinedInput
                      type="date"
                      sx={{ height: "32px", minWidth: "226px" }}
                      onChange={dateHandle}
                      value={orderDate}
                    />
                  </Grid>
                </Grid>
              </FormControl>
            </Stack>
            <Box sx={{ mt: 3 }}>
              <Divider orientation="horizontal" />
              <Box display="flex" justifyContent="end" padding="16px">
                <Button onClick={formik.handleSubmit} variant="contained">
                  Submit
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ModalAddStock;
