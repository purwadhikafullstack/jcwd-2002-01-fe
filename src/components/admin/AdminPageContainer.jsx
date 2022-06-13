import { Box, Grid } from "@mui/material";

import AdminNavbar from "components/admin/AdminNavbar";
import AdminSidebar from "components/admin/AdminSidebar";

const AdminPageContainer = ({ children }) => {
  return (
    <Grid container>
      <Grid item xs={3} md={2}>
        <AdminSidebar></AdminSidebar>
      </Grid>
      <Grid
        item
        xs={9}
        md={10}
        sx={{
          background:
            "linear-gradient(155.7deg, #D6F5F3 -45.88%, #F7FCFC 45.77%, #F1F5FC 117.72%)",
          borderRadius: "5px",
          height: "100vh",
        }}
      >
        <AdminNavbar></AdminNavbar>
        <Box>{children}</Box>
      </Grid>
    </Grid>
  );
};

export default AdminPageContainer;
