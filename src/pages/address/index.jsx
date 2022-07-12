import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Footer from "components/Footer";
import axiosInstance from "configs/api";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import * as Yup from "yup";

const shippingAddress = () => {
  const [nation, setNation] = useState("");
  const [provinsi, setProvinsi] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [kota, setKota] = useState([]);
  const [mainAddress, setMainAddress] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [severity, setSeverity] = useState();

  const formik = useFormik({
    initialValues: {
      address: "",
      recipient_firstname: "",
      recipient_lastname: "",
      recipient_telephone: "",
      kecamatan: "",
      postal_code: "",
      is_main_address: false,
      address_label: "",
    },
    validationSchema: Yup.object().shape({
      address: Yup.string("").required("This field is required"),
      recipient_firstname: Yup.string("").required("This field is required"),
      recipient_lastname: Yup.string("").required("This field is required"),
      recipient_telephone: Yup.string("").required("This field is required"),
      kecamatan: Yup.string("").required("This field is required"),
      postal_code: Yup.string("").required("This field is required"),
      is_main_address: Yup.boolean(),
      address_label: Yup.string("").required("This field is required"),
    }),

    validateOnChange: false,
  });

  const submitNewAddress = async () => {
    setTimeout(async () => {
      try {
        const newAddress = {
          address: formik.values.address,
          recipient_name:
            formik.values.recipient_firstname +
            " " +
            formik.values.recipient_lastname,
          recipient_telephone: nation + formik.values.recipient_telephone,
          province: selectedProvince || "",
          city: selectedCity || "",
          kecamatan: formik.values.kecamatan,
          postal_code: formik.values.postal_code,
          is_main_address: mainAddress,
          address_label: formik.values.address_label,
        };

        console.log(newAddress);

        const res = await axiosInstance.post("/users/address", newAddress);

        if (res?.data?.message !== undefined) {
          setAlertContent("Added to Cart!");
          setAlert(true);
          setSeverity(true);
        }

        console.log(res);
        formik.setSubmitting(false);
      } catch (err) {
        setAlertContent(err?.response?.data?.message);
        setAlert(true);
        setSeverity(false);
        console.log(err);
        formik.setSubmitting(false);
      }
    }, 2000);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };

  const handleChange = (event) => {
    setNation(event.target.value);
  };

  const fetchProvince = async () => {
    try {
      const res = await axiosInstance.get("address/province");

      setProvinsi(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const renderProvince = () => {
    return provinsi?.map((val, idx) => {
      return (
        <MenuItem value={val?.province_id} key={idx}>
          {val?.province}
        </MenuItem>
      );
    });
  };

  const fetchCity = async () => {
    try {
      const res = await axiosInstance.get(`address/city/${selectedProvince}`);

      setKota(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const renderCity = () => {
    return kota?.map((val, idx) => {
      return (
        <MenuItem value={val?.city_id} key={idx}>
          {val?.city_name}
        </MenuItem>
      );
    });
  };

  useEffect(() => {
    fetchProvince();
  }, []);
  useEffect(() => {
    fetchCity();
  }, [selectedProvince]);

  return (
    <Box>
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
      <Container maxWidth="sm">
        <Typography
          sx={{ mb: "36px", fontSize: "24px", fontWeight: "700", mt: "90px" }}
        >
          Alamat Pengiriman
        </Typography>
        <Box sx={{ mb: "52px" }}>
          <Typography>Label Alamat</Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Contoh: Apartemen"
            onChange={(e) =>
              formik.setFieldValue("address_label", e.target.value)
            }
          />
        </Box>
        <Box>
          <Typography sx={{ mb: "36px" }}>Info Penerima</Typography>
          <Stack direction="row" spacing={2} sx={{ mb: "36px" }}>
            <TextField
              label="Nama Depan"
              id="namadepan"
              fullWidth
              size="small"
              placeholder="Jane"
              onChange={(e) =>
                formik.setFieldValue("recipient_firstname", e.target.value)
              }
            />
            <TextField
              label="Nama Belakang"
              fullWidth
              size="small"
              placeholder="Doe"
              onChange={(e) =>
                formik.setFieldValue("recipient_lastname", e.target.value)
              }
            />
          </Stack>
          <Typography>Nomor HP</Typography>
          <FormControl sx={{ mb: "36px" }}>
            <OutlinedInput
              size="small"
              id="nomerHp"
              onChange={(e) =>
                formik.setFieldValue("recipient_telephone", e.target.value)
              }
              sx={{ padding: "0px", width: "480px" }}
              startAdornment={
                <FormControl sx={{ width: "100px", mr: "10px" }}>
                  <Select size="small" value={nation} onChange={handleChange}>
                    <MenuItem value="+62">+62</MenuItem>
                    <MenuItem value="+22">+22</MenuItem>
                    <MenuItem value="+123">+12</MenuItem>
                  </Select>
                </FormControl>
              }
            ></OutlinedInput>
          </FormControl>
          <Stack direction="row" spacing={2} sx={{ mb: "36px" }}>
            <Box sx={{ width: "100%" }}>
              <Typography>Provinsi</Typography>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  size="small"
                  onChange={(e) => setSelectedProvince(e.target.value)}
                >
                  {renderProvince()}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography>Kabupaten/Kota</Typography>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  size="small"
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  {renderCity()}
                </Select>
              </FormControl>
            </Box>
          </Stack>
          <Box sx={{ mb: "36px" }}>
            <Typography>Kecamatan</Typography>
            <FormControl sx={{ width: "250px" }}>
              <TextField
                size="small"
                onChange={(e) =>
                  formik.setFieldValue("kecamatan", e.target.value)
                }
              />
            </FormControl>
          </Box>
          <Box sx={{ mb: "36px" }}>
            <Typography>Alamat</Typography>
            <OutlinedInput
              sx={{ width: "100%" }}
              size="small"
              onChange={(e) => formik.setFieldValue("address", e.target.value)}
            />
          </Box>
          <Box sx={{ mb: "36px" }}>
            <Typography>Kode Pos</Typography>
            <OutlinedInput
              size="small"
              onChange={(e) =>
                formik.setFieldValue("postal_code", e.target.value)
              }
            />
          </Box>
          <FormControlLabel
            sx={{ mb: "36px" }}
            label="Simpan sebagai alamat utama"
            control={
              <Checkbox onChange={(e) => setMainAddress(!mainAddress)} />
            }
          />
          <Stack direction="row" spacing={2} sx={{ mb: "36px" }}>
            <Button variant="outlined" sx={{ width: "100%" }}>
              Batalkan
            </Button>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={() => submitNewAddress()}
              disabled={formik.isSubmitting}
            >
              Simpan Alamat
            </Button>
          </Stack>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default shippingAddress;
