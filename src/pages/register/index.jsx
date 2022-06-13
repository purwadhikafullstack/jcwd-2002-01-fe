import {
  Box,
  Button,
  Link,
  Typography,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Icon,
  Stack,
  Checkbox,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import Image from "next/image";
import register from "assets/Frameregister.png";
import { FaUserCircle } from "react-icons/fa";
import { IoIosLock, IoMdMail } from "react-icons/io";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState } from "react";

const RegisterPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Box display="flex">
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
            <Button variant="outlined" sx={{ width: "256px" }}>
              Daftar dengan Google
            </Button>
            <Button
              variant="contained"
              sx={{ boxShadow: "none", width: "256px" }}
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
            ></OutlinedInput>
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
            ></OutlinedInput>
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
              startAdornment={
                <InputAdornment position="start">
                  <Icon sx={{ mr: "17px" }}>{<IoIosLock />}</Icon>
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <Icon
                    sx={{ mr: "17px" }}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </Icon>
                </InputAdornment>
              }
            ></OutlinedInput>
          </FormControl>
          <Box>
            <FormControlLabel
              control={<Checkbox />}
              label="Saya setuju dengan persyaratan dan ketentuan"
            ></FormControlLabel>
          </Box>
          <Button variant="contained" sx={{ height: "48px" }}>
            {" "}
            Register{" "}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default RegisterPage;
