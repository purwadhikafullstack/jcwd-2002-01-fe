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
import { useDispatch } from "react-redux";
import { useState } from "react";
import { search } from "redux/reducers/search";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("")

  const dispatch = useDispatch()


  return (
    <Box
      display="flex"
      sx={{
        height: "80px",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 4px 12px -8px #1BA1E4",
        top: "0",
        position: "sticky",
        backgroundColor: "white",
        zIndex: "9",
      }}
    >
      <Box marginRight="18px">
        <Image src={logo} />
      </Box>
      <FormControl>
        <OutlinedInput
          placeholder="Cari Obat, Suplemen, Vitamin, produk Kesehatan"
          id="searchInput"
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{
            width: "744px",
            height: "44px",
            mr: "67px",
            borderRadius: "8px",
            p: "24px 15px",
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => dispatch(search(searchInput))}>
                {<HiOutlineSearch />}
              </IconButton>
            </InputAdornment>
          }
        ></OutlinedInput>
      </FormControl>
      <Button
        variant="outlined"
        sx={{
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
