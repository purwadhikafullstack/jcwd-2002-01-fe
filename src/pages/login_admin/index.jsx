import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import BannerLogin from "assets/banner-login.png";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Login = () => {
  const [showPassword, setShowPassword] = useState("false");
  return (
    <Grid container width="100%" height="100vh" direction="row">
      <Grid item xs={6}>
        <Image src={BannerLogin} layout="fixed" />
      </Grid>
      <Grid item xs={6}>
        <Box px="96px" pt="70px">
          <Box display="flex" justifyContent="flex-end">
            <ButtonGroup
              sx={{ marginBottom: "50px" }}
              variant="root"
              disableElevation
            >
              <Button
                sx={{ backgroundColor: "#f5f0f1", color: "Brand.500" }}
                variant="contained"
              >
                EN
              </Button>
              <Button
                sx={{ color: "white", backgroundColor: "Brand.500" }}
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

        <Box sx={{ width: "550px" }}>
          <InputLabel>Email</InputLabel>
          <OutlinedInput
            placeholder="JohnDoe@gmail.com"
            startAdornment={
              <MailIcon sx={{ marginRight: "17px" }} htmlColor="#02114f" />
            }
            sx={{
              borderRadius: "10px",
              marginBottom: "16px",
              width: "550px",
              marginTop: "16px",
            }}
          />
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            type={showPassword ? "password" : "text"}
            placeholder="Password123@"
            startAdornment={
              <LockIcon sx={{ marginRight: "17px" }} htmlColor="#02114f" />
            }
            sx={{
              borderRadius: "10px",
              marginBottom: "16px",
              width: "550px",
              marginTop: "16px",
            }}
            endAdornment={
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <VisibilityIcon htmlColor="#02114f" sx={{}} />
                ) : (
                  <VisibilityOffIcon htmlColor="#02114f" />
                )}
              </IconButton>
            }
          />

          <Stack sx={{ px: 2 }} direction="row" justifyContent="space-between">
            <FormControlLabel
              sx={{ marginTop: "-10px" }}
              control={<Checkbox />}
              label="Ingat Saya"
            />
            <Typography color="#c7bfaf">Lupa Kata Sandi ?</Typography>
          </Stack>

          <Button
            sx={{
              marginTop: "16px",
              marginBottom: "48px",
              height: "48px",
            }}
            variant="contained"
            fullWidth
          >
            Masuk
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Login;
