import { Badge, Box, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useSelector } from "react-redux";

const AdminNavbar = () => {
  const adminSelector = useSelector((state) => state.auth);

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
        <Typography sx={{ ml: 2 }}>{adminSelector?.username}</Typography>
      </Box>
    </Box>
  );
};
export default AdminNavbar;
