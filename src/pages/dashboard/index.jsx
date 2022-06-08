import { Box, Grid, Typography } from "@mui/material";
import ActivityCard from "components/ActivityCard";
import AdminNavbar from "components/AdminNavbar";
import AdminSidebar from "components/AdminSidebar";
import AnalyticCard from "components/AnalyticCard";
import ExpiredMedicineCard from "components/ExpiredMedicineCard";

const Dashboard = () => {
  return (
    <Grid container>
      <Grid item xs={3} md={2}>
        <AdminSidebar></AdminSidebar>
      </Grid>
      <Grid item xs={9} md={10}>
        <AdminNavbar></AdminNavbar>
        <Box>
          <Box display="flex">
            <AnalyticCard></AnalyticCard>
            <AnalyticCard></AnalyticCard>
            <AnalyticCard></AnalyticCard>
          </Box>

          <ActivityCard></ActivityCard>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
