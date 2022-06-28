import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import register from "assets/Frameregister.png";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import jsCookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { login } from "redux/reducers/auth";
import { FcGoogle } from "react-icons/fc";
import axiosInstance from "configs/api";

const Login = () => {
  const [showPassword, setShowPassword] = useState("false");
  const dispatch = useDispatch();
  const Router = useRouter();
  const authSelector = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      credential: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      credential: Yup.string().required("This field is required"),
      password: Yup.string().required("This field is required"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      setTimeout(async () => {
        try {
          const res = await axiosInstance.post("/auth/admin-login", {
            credential: values.credential,
            password: values.password,
          });

          const userResponse = res.data.result;
          console.log(userResponse);

          jsCookie.set("auth_token", userResponse.token);

          // if (userResponse.token) {
          // }
          dispatch(login(userResponse.user));

          Router.push("/admin/dashboard");
          formik.setSubmitting(false);
        } catch (err) {
          console.log(err);
          formik.setSubmitting(false);
        }
      }, 2000);
    },
  });

  return (
    <Grid container width="100%" height="100vh" direction="row">
      <Grid item xs={6}>
        <Image src={register} />
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ px: 2 }}>
          <Box px="96px" pt="70px">
            <Box display="flex" justifyContent="flex-end">
              <ButtonGroup
                sx={{ marginBottom: "50px" }}
                variant="root"
                disableElevation
              >
                <Button
                  sx={{ backgroundColor: "#f5f0f1", color: "brand.500" }}
                  variant="contained"
                >
                  EN
                </Button>
                <Button
                  sx={{ color: "white", backgroundColor: "brand.500" }}
                  variant="contained"
                >
                  ID
                </Button>
              </ButtonGroup>
            </Box>
          </Box>

          <Typography
            sx={{ marginBottom: "36px", fontSize: "24px" }}
            fontWeight="bold"
          >
            Masuk
          </Typography>

          <Stack spacing={3}>
            <FormControl>
              <InputLabel>Email</InputLabel>
              <OutlinedInput
                placeholder="Your Email"
                startAdornment={
                  <MailIcon sx={{ marginRight: "17px" }} htmlColor="#02114f" />
                }
                sx={{
                  borderRadius: "10px",

                  width: "550px",
                  marginTop: "16px",
                }}
                onChange={(event) =>
                  formik.setFieldValue("credential", event.target.value)
                }
              />
              <FormHelperText error={true}>
                {formik.errors.credential || " "}
              </FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "password" : "text"}
                placeholder="Password123@"
                startAdornment={
                  <LockIcon sx={{ marginRight: "17px" }} htmlColor="#02114f" />
                }
                sx={{
                  borderRadius: "10px",

                  width: "550px",
                  marginTop: "16px",
                }}
                endAdornment={
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <VisibilityIcon htmlColor="#02114f" />
                    ) : (
                      <VisibilityOffIcon htmlColor="#02114f" />
                    )}
                  </IconButton>
                }
                onChange={(event) =>
                  formik.setFieldValue("password", event.target.value)
                }
              />
              <FormHelperText error={true}>
                {formik.errors.password || " "}
              </FormHelperText>
            </FormControl>
          </Stack>

          <Box sx={{ width: "550px" }}>
            <Stack
              sx={{ px: 2 }}
              direction="row"
              justifyContent="space-between"
            >
              <FormControlLabel control={<Checkbox />} label="Ingat Saya" />
              <Typography
                color="#c7bfaf"
                sx={{
                  ":hover": {
                    color: "brand.500",
                    border: "unset",
                    cursor: "pointer",
                  },
                }}
              >
                Lupa Kata Sandi ?
              </Typography>
            </Stack>

            <Button
              sx={{
                marginTop: "16px",
                marginBottom: "48px",
                height: "48px",
              }}
              variant="contained"
              fullWidth
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting}
            >
              Masuk
            </Button>
            <Divider>Atau Masuk Dengan</Divider>

            <Button
              fullWidth
              // startIcon={<Image src={GoogleIcon} />}
              variant="contained"
              sx={{
                my: "26px",
                backgroundColor: "white",
                color: "black",
                fontWeight: "bold",
                height: "48px",
                border: "solid 1px",
                borderColor: "brand.200",

                boxShadow: "none",
                ":hover": {
                  backgroundColor: "brand.500",
                  border: "unset",
                  color: "white",
                },
              }}
            >
              <FcGoogle fontSize="16px" />
              <Typography sx={{ pl: 2 }}>Masuk dengan Google</Typography>
            </Button>
            <Typography textAlign="center">
              Belum Punya Akun ?
              <Link href="/register">
                <Typography
                  sx={{ ":hover": { cursor: "pointer" } }}
                  component="span"
                  color="brand.500"
                >
                  Daftar
                </Typography>
              </Link>{" "}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Login;
