import {
  Modal,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Stack,
  FormControl,
  Grid,
  FormLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BannerTambahProduct from "../../assets/tambah-product.png";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "configs/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";

const steps = ["Ubah Produk", "Finish"];

const ModalEditData = ({
  open,
  handleClose,
  data,
  productImage,
  fetchProduct,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [CategoryList, setCategoryList] = useState();
  const [preview, setPreview] = useState();
  const [selectedFile, setSelectedFile] = useState([]);
  const [productImageValue, setProductImageValue] = useState([]);
  const [newProductName, setNewProductName] = useState(false);
  const [newProductPrice, setnewProductPrice] = useState(false);
  const inputFileRef = useRef(null);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [severity, setSeverity] = useState();

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };

  const handleFile = (event) => {
    if (event.target.files[0]) {
      setSelectedFile([...selectedFile, event.target.files[0]]);
    }
  };

  const fetchCategory = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      const data = res?.data?.result;
      setCategoryList(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteImageHandle = async (id, productId) => {
    try {
      await axiosInstance.delete(
        `/products/product-image/${id}/images/${productId}`
      );
      fetchProduct();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const { productName, price, category } = formik.values;

    formData.append("productName", productName || data.namaObat);
    formData.append("price", price || data.nilaiJual);
    formData.append("category_Id", category || data.kategoriId);

    if (selectedFile.length) {
      Object.values(selectedFile).forEach((file) => {
        formData.append("product_image_file", file);
      });
    }

    try {
      await axiosInstance.patch(`/products/edit/${data.productId}`, formData);
      setSelectedFile(null);
      formik.setFieldValue("productName", "");
      formik.setFieldValue("price", "");
      formik.setFieldValue("category", "");

      setNewProductName(false);
      setnewProductPrice(false);
      setSelectedFile([]);

      fetchProduct();

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      productName: "",
      price: "",
      category: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string(),
      price: Yup.number().min(1),
      category: Yup.string(),
    }),
    validateOnChange: false,
    onSubmit: handleSubmit,
  });

  const previewImage = () => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const imagesArray = selectedFile.map((val) => {
      return URL.createObjectURL(val);
    });
    setPreview(imagesArray);

    return () => URL.revokeObjectURL(objectUrl);
  };

  function deleteFile(e) {
    const s = productImageValue.filter((item, index) => index !== e);
    // console.log(s);
    setProductImageValue(s);
  }

  useEffect(() => {
    previewImage();
  }, [selectedFile]);

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    if (productImage) {
      setProductImageValue(productImage);
    }
  }, [productImage]);
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
            Ubah Data
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
                Produk Berhasil diubah!
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
                  <Grid xs={8}>
                    {newProductName ? (
                      <OutlinedInput
                        size="small"
                        value={formik.values.productName}
                        onChange={(event) =>
                          formik.setFieldValue(
                            "productName",
                            event.target.value
                          )
                        }
                        placeholder="Masukkan nama obat terbaru"
                      />
                    ) : (
                      <Box display="flex" sx={{ alignItems: "center" }}>
                        <Typography>{data.namaObat}</Typography>
                        <Button onClick={() => setNewProductName(true)}>
                          Ubah
                        </Button>
                      </Box>
                    )}
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
                      Harga Jual
                    </FormLabel>
                  </Grid>

                  <Grid xs={8}>
                    {newProductPrice ? (
                      <OutlinedInput
                        size="small"
                        value={formik.values.price}
                        onChange={(event) =>
                          formik.setFieldValue("price", event.target.value)
                        }
                        placeholder="Masukkan harga jual terbaru"
                      />
                    ) : (
                      <Box display="flex" sx={{ alignItems: "center" }}>
                        <Typography>{data.nilaiJual}</Typography>
                        <Button onClick={() => setnewProductPrice(true)}>
                          Ubah
                        </Button>
                      </Box>
                    )}
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
                      Kategory
                    </FormLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <Select
                      sx={{
                        backgroundColor: "white",
                        height: "36px",
                        minWidth: "226px",
                      }}
                      value={formik.values.category || data.kategoriId}
                      onChange={(e) => {
                        formik.setFieldValue("category", e.target.value);
                      }}
                      autoWidth
                    >
                      {CategoryList?.map((val) => {
                        return (
                          <MenuItem key={val.id} value={val.id}>
                            {val.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
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
                      Image
                    </FormLabel>
                  </Grid>

                  <Grid item xs={8}>
                    {productImageValue.length !== 0 &&
                      productImageValue.map((val, index) => {
                        return (
                          <Stack spacing={2}>
                            <Box display="flex">
                              <Box
                                component="img"
                                src={val?.image_url}
                                sx={{ width: "50px", height: "50px" }}
                              />

                              <Button
                                onClick={() => {
                                  deleteImageHandle(val.id, val.product_id) &&
                                    deleteFile(index);
                                }}
                              >
                                delete
                              </Button>
                            </Box>
                          </Stack>
                        );
                      })}
                  </Grid>
                </Grid>
              </FormControl>

              <FormControl>
                <Grid container>
                  <Grid item xs={4}>
                    <FormLabel
                      sx={{
                        fontSize: "14px",
                        color: "black",
                      }}
                    >
                      Gambar Product Baru
                    </FormLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <Box sx={{ mb: 1 }}>
                      <input
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleFile}
                        ref={inputFileRef}
                        type="file"
                        multiple
                        style={{ display: "none" }}
                      />

                      <Button
                        variant="outlined"
                        onClick={() => inputFileRef.current.click()}
                      >
                        Add New Image
                      </Button>
                    </Box>
                    {preview &&
                      preview.map((image) => {
                        return (
                          <Box
                            component="img"
                            src={image}
                            sx={{ width: "50px", height: "50px" }}
                          />
                        );
                      })}
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

export default ModalEditData;
