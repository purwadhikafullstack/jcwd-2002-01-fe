import {
  Box,
  FormControl,
  Icon,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  Button,
  Container,
} from "@mui/material";
import logo from "../assets/logo.png";
import Image from "next/image";
import { HiOutlineSearch } from "react-icons/hi";
import { margin, textAlign, width } from "@mui/material";

const Navbar = () => {
  return (
    <Box
      display="flex"
      sx={{
        height: "80px",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 4px 12px -8px #009B90",
      }}
    >
      <Box marginRight="18px">
        <Image src={logo} />
      </Box>
      <FormControl>
        <OutlinedInput
          placeholder="Cari Obat, Suplemen, Vitamin, produk Kesehatan"
          id="searchInput"
          sx={{
            width: "744px",
            height: "44px",
            mr: "67px",
            borderRadius: "8px",
            p: "24px 15px",
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton>{<HiOutlineSearch />}</IconButton>
            </InputAdornment>
          }
        ></OutlinedInput>
      </FormControl>
      <Button
        variant="outlined"
        sx={{
          color: "#009B90",
          height: "44px",
          width: "118px",
          mr: "26px",
          border: "2px solid",
        }}
      >
        Masuk
      </Button>
      <Button
        variant="contained"
        sx={{
          height: "44px",
          width: "118px",
        }}
      >
        Daftar
      </Button>
    </Box>
  );
};

export default Navbar;
