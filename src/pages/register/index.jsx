import {
  Box,
  Button,
  Link as LinkUI,
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
  Grid,
  Divider,
} from "@mui/material";
import Image from "next/image";
import register from "assets/Frameregister.png";
import { FaUserCircle } from "react-icons/fa";
import { IoIosLock, IoMdMail } from "react-icons/io";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import axiosInstance from "configs/api";
import Link from "next/link";

axiosInstance;
const RegisterPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [severity, setSeverity] = useState();
  const [checked, setChecked] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
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
          const newUser = {
            username: values.username,
            email: values.email,
            password: values.password,
          };
          const res = await axiosInstance.post("/auth/register", newUser);
          if (res?.data?.message !== undefined) {
            setAlertContent("Account Created !");
            setAlert(true);
            setSeverity(true);
          }

          formik.setSubmitting(false);
        } catch (err) {
          setAlertContent(err?.response?.data?.message);
          setAlert(true);
          setSeverity(false);
          formik.setSubmitting(false);
        }
      }, 3000);
    },
  });

  return (
    <Grid container>
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
      <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "grid" } }}>
        <Image height="788px" width="750px" src={register} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          px={{ xs: 2, md: 8 }}
          py={{ xs: 3, md: 0 }}
          sx={{ height: "100vh" }}
        >
          <Stack spacing={4}>
            <Box>
              <Typography
                fontSize="24px"
                fontWeight="700"
                sx={{
                  display: { xs: "none", md: "inline-block" },
                }}
              >
                Mari Kita Mulai
              </Typography>
              <Typography
                fontSize="24px"
                fontWeight="700"
                sx={{
                  display: { xs: "inline-block", md: "none" },
                }}
              >
                Register
              </Typography>
            </Box>

            <Typography>
              Sudah punya akun?
              <Link href={"/login_user"}>
                <LinkUI component="button">Masuk</LinkUI>
              </Link>
            </Typography>

            <Grid container>
              <Grid item xs={6}>
                <Box
                  width="90%"
                  display="flex"
                  justifyContent="center"
                  alignItems="flex-start"
                  mx="auto"
                >
                  <Button
                    variant="outlined"
                    sx={{
                      width: "100%",
                      borderColor: "brand.500",
                      color: "brand.500",
                      display: { xs: "none", md: "flex" },
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FcGoogle fontSize="16px" />
                    <Typography sx={{ ml: 2 }}>Daftar dengan Google</Typography>
                  </Button>

                  <Button
                    variant="outlined"
                    sx={{
                      width: "100%",
                      height: "48px",
                      borderColor: "brand.500",
                      color: "brand.500",
                      display: { xs: "flex", md: "none" },
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FcGoogle fontSize="16px" />
                    <Typography sx={{ ml: 2 }}>Google</Typography>
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box
                  width="90%"
                  display="flex"
                  justifyContent="center"
                  alignItems="end"
                  mx="auto"
                >
                  <Button
                    variant="contained"
                    sx={{
                      boxShadow: "none",
                      width: "100%",
                      "&:hover": {
                        boxShadow: "none",
                      },
                      display: { xs: "none", md: "flex" },
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <BsFacebook fontSize="16px" />
                    <Typography sx={{ ml: 2 }}>
                      Daftar dengan Facebook
                    </Typography>
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      boxShadow: "none",
                      width: "100%",
                      height: "48px",
                      "&:hover": {
                        boxShadow: "none",
                      },
                      display: { xs: "flex", md: "none" },
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <BsFacebook fontSize="16px" />
                    <Typography sx={{ ml: 2 }}>Facebook</Typography>
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Divider>Atau</Divider>
          </Stack>

          <Stack spacing={3} sx={{ mt: "46px" }}>
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <OutlinedInput
                placeholder="Jane Doe"
                id="name"
                size="small"
                sx={{
                  borderRadius: "8px",
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
                {formik.errors.username || " "}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <OutlinedInput
                placeholder="JaneDoe@gmail.com"
                id="email"
                size="small"
                sx={{
                  borderRadius: "8px",
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
              <FormHelperText error={true}>
                {formik.errors.email || " "}
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <OutlinedInput
                placeholder="**********"
                type={passwordVisible ? "password" : "text"}
                id="password"
                size="small"
                sx={{
                  borderRadius: "8px",
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
                {formik.errors.password || " "}
              </FormHelperText>
            </FormControl>
          </Stack>

          <Box width="100%">
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              }
              label="Saya setuju dengan persyaratan dan ketentuan"
            ></FormControlLabel>
          </Box>
          <Box pt="40px" width="100%">
            <Button
              variant="contained"
              sx={{ height: "48px", width: "100%" }}
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting || checked === false}
              type="submit"
            >
              Register
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
