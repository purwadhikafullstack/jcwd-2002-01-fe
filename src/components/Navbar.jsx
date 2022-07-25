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
  Avatar,
  Menu,
  MenuItem,
  Stack,
  Badge,
} from "@mui/material";
import logo from "../assets/logo.png";
import Image from "next/image";
import { HiOutlineSearch } from "react-icons/hi";
import { margin, textAlign, width } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { logout } from "redux/reducers/auth";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { search } from "redux/reducers/search";

const Navbar = () => {
  const userSelector = useSelector((state) => state.auth);
  const userCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const Router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutBtnHandler = () => {
    dispatch(logout());

    jsCookie.remove("user_token");
    Router.push("/login_user");
  };
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
      <Link href="/">
        <Box marginRight="18px" sx={{ ":hover": { cursor: "pointer" } }}>
          <Image src={logo} />
        </Box>
      </Link>
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
              <IconButton
                onClick={() => {
                  if (!Router.pathname.startsWith("/product_list")) {
                    Router.push("/product_list");
                    dispatch(search(searchInput));
                  } else {
                    dispatch(search(searchInput));
                  }
                }}
              >
                {<HiOutlineSearch />}
              </IconButton>
            </InputAdornment>
          }
        ></OutlinedInput>
      </FormControl>
      {userSelector.id ? (
        <Stack direction="row" spacing={3}>
          <Link href="/cart">
            <Badge badgeContent={userCart.cartCount} color="primary">
              <IconButton>
                <ShoppingCartIcon sx={{ color: "brand.500" }} />
              </IconButton>
            </Badge>
          </Link>
          <IconButton>
            <NotificationsIcon sx={{ color: "brand.500" }} />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              onClick={handleClick}
              src={userSelector?.profile_image || "/static/images/avatar/1.jpg"}
              sx={{ width: 28, height: 28, ":hover": { cursor: "pointer" } }}
              alt={userSelector.username}
            />
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem>
                <Link href={"/profile"}>Profil Saya</Link>
              </MenuItem>
              <MenuItem>
                <Link href={"/proses_pemesanan"}>Proses Pemesanan</Link>
              </MenuItem>
              <MenuItem onClick={logoutBtnHandler}>Keluar</MenuItem>
            </Menu>
            <Typography sx={{ ml: "14px" }}>
              {userSelector?.username?.length > 5
                ? `${userSelector?.username?.slice(0, 4)}...`
                : userSelector?.username}
            </Typography>
          </Box>
        </Stack>
      ) : (
        <>
          <Link href="/login_user">
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
          </Link>
          <Link href="/register">
            <Button
              variant="contained"
              sx={{
                height: "44px",
                width: "118px",
              }}
            >
              Daftar
            </Button>
          </Link>
        </>
      )}
    </Box>
  );
};

export default Navbar;
