import {
  Box,
  Button,
  Link,
  Typography,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Icon,
  IconButton,
  Stack,
  Checkbox,
  FormLabel,
  FormControlLabel,
  Alert,
  FormHelperText,
  Snackbar,
} from "@mui/material";
import Image from "next/image";
import register from "assets/Frameregister.png";
import { FaUserCircle } from "react-icons/fa";
import { IoIosLock, IoMdMail } from "react-icons/io";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "configs/api";

const RegisterPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("This field is required"),
      email: Yup.string()
        .required("This field is required")
        .email("Email is invalid"),
      password: Yup.string()
        .required("This field is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Your password weak,Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      setTimeout(async () => {
        try {
          console.log("On Click");
          const newUser = {
            username: values.username,
            email: values.email,
            password: values.password,
          };
          const res = await axiosInstance.post("/auth/register", newUser);
          if (res?.data?.message !== undefined) {
            setAlertContent("Account Created !");
            setAlert(true);
            setOpen(true);
            setSeverity(true);
          }

          formik.setSubmitting(false);
        } catch (err) {
          setAlertContent(err?.response?.data?.message);
          setAlert(true);
          setOpen(true);
          setSeverity(false);
          formik.setSubmitting(false);
        }
      }, 3000);
    },
  });

  return (
    <Box display="flex">
      {alert ? (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert variant="filled" severity={severity ? "success" : "error"}>
            {alertContent}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
      <Box>
        <Image height="788px" width="750px" src={register} />
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        sx={{ p: "96px" }}
      >
        <Stack spacing={2}>
          <Typography fontSize="24px" fontWeight="700">
            Mari Kita Mulai
          </Typography>
          <Typography>
            Sudah punya akun? <Link component="button">Masuk</Link>
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              sx={{
                width: "256px",
                borderColor: "brand.500",
                color: "brand.500",
              }}
            >
              Daftar dengan Google
            </Button>
            <Button
              variant="contained"
              sx={{
                boxShadow: "none",
                width: "256px",
                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              Daftar dengan Facebook
            </Button>
          </Box>
          <Typography textAlign="center" sx={{ my: "20px" }}>
            atau
          </Typography>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <OutlinedInput
              placeholder="Jane Doe"
              id="name"
              sx={{
                width: "529px",
                height: "44px",
                borderRadius: "8px",
                p: "24px 15px",
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Icon sx={{ mr: "17px" }}>{<FaUserCircle />}</Icon>
                </InputAdornment>
              }
              onChange={(event) =>
                formik.setFieldValue("username", event.target.value)
              }
            ></OutlinedInput>
            <FormHelperText error={true}>
              {formik.errors.username}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <OutlinedInput
              placeholder="JaneDoe@gmail.com"
              id="email"
              sx={{
                width: "529px",
                height: "44px",
                borderRadius: "8px",
                p: "24px 15px",
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Icon sx={{ mr: "17px" }}>{<IoMdMail />}</Icon>
                </InputAdornment>
              }
              onChange={(event) =>
                formik.setFieldValue("email", event.target.value)
              }
            ></OutlinedInput>
            <FormHelperText error={true}>{formik.errors.email}</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <OutlinedInput
              placeholder="**********"
              type={passwordVisible ? "password" : "text"}
              id="password"
              sx={{
                width: "529px",
                height: "44px",
                borderRadius: "8px",
                p: "24px 15px",
              }}
              onChange={(event) =>
                formik.setFieldValue("password", event.target.value)
              }
              startAdornment={
                <InputAdornment position="start">
                  <Icon sx={{ mr: "17px" }}>{<IoIosLock />}</Icon>
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </IconButton>
                </InputAdornment>
              }
            ></OutlinedInput>
            <FormHelperText error={true}>
              {formik.errors.password}
            </FormHelperText>
          </FormControl>
          <Box>
            <FormControlLabel
              control={<Checkbox />}
              label="Saya setuju dengan persyaratan dan ketentuan"
            ></FormControlLabel>
          </Box>
          <Button
            variant="contained"
            sx={{ height: "48px" }}
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
            type="submit"
          >
            Register
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default RegisterPage;
