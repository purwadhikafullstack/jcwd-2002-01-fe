import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Modal,
  OutlinedInput,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "configs/api";
import BannerTambahProduct from "../../assets/tambah-product.png";
import Image from "next/image";

const steps = ["Input New Product", "Input Product Image", "Finish"];

const ModalAddProduct = ({ open, handleClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState([]);
  const [preview, setPreview] = useState();

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const inputFileRef = useRef(null);

  const handleFile = (event) => {
    setSelectedFile([...selectedFile, event.target.files[0]]);
    alert(event.target.files[0].name);

    // const imagesArray = fileArray.map((val) => {
    //   return URL.createObjectURL(val);
    // });

    // setPreview(imagesArray);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const { name, price, no_bpom, no_medicine, packaging, discount } =
      formik.values;

    if (!discount) {
      discount === 0;
    }

    formData.append("name", name);
    formData.append("price", price);
    formData.append("no_bpom", no_bpom);
    formData.append("no_medicine", no_medicine);
    formData.append("packaging", packaging);
    formData.append("discount", discount);

    if (selectedFile.length) {
      Object.values(selectedFile).forEach((file) => {
        formData.append("product_image_file", file);
      });
    }
    try {
      await axiosInstance.post("/products", formData);
      setSelectedFile(null);
      formik.setFieldValue("name", "");
      formik.setFieldValue("price", "");
      formik.setFieldValue("no_bpom", "");
      formik.setFieldValue("no_medicine", "");
      formik.setFieldValue("packaging", "");
      formik.setFieldValue("discount", "");

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(preview);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      no_bpom: "",
      no_medicine: "",
      packaging: "",
      discount: 0,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("This field is required"),
      price: Yup.number().min(1).required(),
      no_bpom: Yup.string().required("This field is required"),
      no_medicine: Yup.string().required("This field is required"),
      packaging: Yup.string().required("This field is required"),
      discount: Yup.number(),
    }),
    validateOnChange: false,
    onSubmit: handleNext,
  });

  const formDataInput = () => {
    if (activeStep === 0) {
      return (
        <Stack spacing={1}>
          <FormControl sx={{ borderRadius: "4px" }}>
            <Grid container>
              <Grid item xs={3}>
                <FormLabel
                  sx={{
                    fontSize: "14px",
                    color: "black",
                  }}
                >
                  Nama Obat
                </FormLabel>
              </Grid>
              <Grid item xs={9}>
                <OutlinedInput
                  onChange={(event) =>
                    formik.setFieldValue("name", event.target.value)
                  }
                  sx={{ height: "32px", minWidth: "226px" }}
                  placeholder="Masukkan nama obat"
                  value={formik.values.name}
                />
                <FormHelperText error={true}>
                  {formik.errors.name || " "}
                </FormHelperText>
              </Grid>
            </Grid>
          </FormControl>
          <FormControl sx={{ borderRadius: "4px" }}>
            <Grid container marginBottom="10px">
              <Grid item xs={3}>
                <FormLabel
                  sx={{
                    fontSize: "14px",
                    color: "black",
                  }}
                >
                  No. Obat
                </FormLabel>
              </Grid>
              <Grid item xs={9}>
                <OutlinedInput
                  onChange={(event) =>
                    formik.setFieldValue("no_medicine", event.target.value)
                  }
                  sx={{ height: "32px", minWidth: "226px" }}
                  placeholder="Masukkan No. Obat"
                  value={formik.values.no_medicine}
                />
                <FormHelperText error={true}>
                  {formik.errors.no_medicine || " "}
                </FormHelperText>
              </Grid>
            </Grid>
          </FormControl>
          <FormControl sx={{ borderRadius: "4px" }}>
            <Grid container>
              <Grid item xs={3}>
                <FormLabel
                  sx={{
                    fontSize: "14px",
                    color: "black",
                  }}
                >
                  No. BPOM
                </FormLabel>
              </Grid>
              <Grid item xs={9}>
                <OutlinedInput
                  onChange={(event) =>
                    formik.setFieldValue("no_bpom", event.target.value)
                  }
                  sx={{ height: "32px", minWidth: "226px" }}
                  placeholder="Masukkan No. BPOM"
                  value={formik.values.no_bpom}
                />
                <FormHelperText error={true}>
                  {formik.errors.no_bpom || " "}
                </FormHelperText>
              </Grid>
            </Grid>
          </FormControl>
          <FormControl sx={{ borderRadius: "4px" }}>
            <Grid container>
              <Grid item xs={3}>
                <FormLabel
                  sx={{
                    fontSize: "14px",
                    color: "black",
                  }}
                >
                  Harga Jual
                </FormLabel>
              </Grid>
              <Grid item xs={9}>
                <OutlinedInput
                  onChange={(event) =>
                    formik.setFieldValue("price", event.target.value)
                  }
                  sx={{ height: "32px", minWidth: "226px" }}
                  placeholder="Masukkan Harga Jual"
                  value={formik.values.price}
                />
                <FormHelperText error={true}>
                  {formik.errors.price || " "}
                </FormHelperText>
              </Grid>
            </Grid>
          </FormControl>
          <FormControl sx={{ borderRadius: "4px" }}>
            <Grid container>
              <Grid item xs={3}>
                <FormLabel
                  sx={{
                    fontSize: "14px",
                    color: "black",
                  }}
                >
                  Diskon (%)
                </FormLabel>
              </Grid>
              <Grid item xs={9}>
                <OutlinedInput
                  onChange={(event) =>
                    formik.setFieldValue("discount", event.target.value)
                  }
                  sx={{ height: "32px", minWidth: "226px" }}
                  placeholder="Masukkan Diskon (%)"
                  value={formik.values.discount}
                />
                <FormHelperText error={true}>
                  {formik.errors.discount || " "}
                </FormHelperText>
              </Grid>
            </Grid>
          </FormControl>
          <FormControl sx={{ borderRadius: "4px" }}>
            <Grid container>
              <Grid item xs={3}>
                <FormLabel
                  sx={{
                    fontSize: "14px",
                    color: "black",
                  }}
                >
                  Satuan
                </FormLabel>
              </Grid>
              <Grid item xs={9}>
                <OutlinedInput
                  onChange={(event) =>
                    formik.setFieldValue("packaging", event.target.value)
                  }
                  sx={{ height: "32px", minWidth: "226px" }}
                  placeholder="Masukkan Satuan"
                  value={formik.values.packaging}
                />
                <FormHelperText error={true}>
                  {formik.errors.packaging || " "}
                </FormHelperText>
              </Grid>
            </Grid>
          </FormControl>
        </Stack>
      );
    } else if (activeStep === 1) {
      return (
        <Stack>
          <FormControl>
            <Grid container>
              <Grid item xs={4}>
                <FormLabel
                  sx={{
                    fontSize: "14px",
                    color: "black",
                  }}
                >
                  Gambar Produk
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
                    Add Image
                  </Button>
                </Box>
                {preview &&
                  preview.map((image) => {
                    return <Image src={image} width="100px" height="100px" />;
                  })}
              </Grid>
            </Grid>
          </FormControl>
        </Stack>
      );
    }
  };

  const previewImage = () => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const imagesArray = selectedFile.map((val) => {
      return URL.createObjectURL(val);
    });
    setPreview(imagesArray);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  };

  useEffect(() => {
    previewImage();
  }, [selectedFile]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          //   height: 400,
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 5,
        }}
      >
        <Box display="flex" justifyContent="space-between" marginBottom="30px">
          <Typography fontSize="20px" fontWeight="bold">
            Tambah Obat
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
        {activeStep === 2 ? (
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
                Obat Berhasil Ditambahkan!
              </Typography>
            </Box>
          </>
        ) : (
          <>
            {formDataInput()}
            <Box sx={{ mt: 3 }}>
              <Divider orientation="horizontal" />
              <Box display="flex" justifyContent="space-between" padding="16px">
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  variant="contained"
                >
                  Kembali
                </Button>

                {activeStep === 1 ? (
                  <Button
                    onClick={() => {
                      handleSubmit();
                    }}
                    variant="contained"
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                    variant="contained"
                  >
                    Lanjutkan
                  </Button>
                )}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};
export default ModalAddProduct;
