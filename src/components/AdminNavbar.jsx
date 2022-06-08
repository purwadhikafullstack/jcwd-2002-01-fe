import { Avatar, Badge, Box, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const AdminNavbar = () => {
  return (
    <Box
      boxShadow="10"
      display="flex"
      sx={{
        height: "64px",
        alignItems: "center",
        justifyContent: "end",
        bgcolor: "#FFFFFF",
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
        <Avatar sx={{ width: 25, height: 25, ml: 5 }}></Avatar>
      </Box>
    </Box>
  );
};
export default AdminNavbar;
