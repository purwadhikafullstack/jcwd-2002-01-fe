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
            "linear-gradient(90deg, rgba(191,229,247,1) 41%, rgba(232,246,252,1) 74%)",
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
