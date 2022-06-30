import { Badge, Box, Menu, MenuItem, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import jsCookie from "js-cookie";
import { logout } from "redux/reducers/auth";
import { useRouter } from "next/router";
import { useState } from "react";

const AdminNavbar = () => {
  const adminSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const Router = useRouter();
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

    jsCookie.remove("admin_token");
    Router.push("/login_admin");
  };

  return (
    <Box
      display="flex"
      sx={{
        height: "64px",
        alignItems: "center",
        justifyContent: "end",
        bgcolor: "#FFFFFF",
        boxShadow: "0px 8px 20px -12px black",
      }}
    >
      <Box display="flex" sx={{ pr: "64px" }}>
        <Badge
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          variant="dot"
          color="error"
        >
          <NotificationsIcon fontSize={"medium"}></NotificationsIcon>
        </Badge>

        <Typography
          onClick={handleClick}
          sx={{ ml: 2, ":hover": { cursor: "pointer" } }}
        >
          {adminSelector?.username}
        </Typography>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={logoutBtnHandler}>Keluar</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};
export default AdminNavbar;
