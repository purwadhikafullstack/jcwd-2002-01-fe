import { Box } from "@mui/material";
import ActivityCard from "components/admin/ActivityCard";

import AnalyticCard from "components/admin/AnalyticCard";
import ExpiredMedicineCard from "components/admin/ExpiredMedicineCard";
import AdminPageContainer from "components/admin/AdminPageContainer";

const Dashboard = () => {
  return (
    <>
      <Box display="flex">
        <AnalyticCard></AnalyticCard>
        <AnalyticCard></AnalyticCard>
        <AnalyticCard></AnalyticCard>
      </Box>
      <Box display="flex">
        <ActivityCard></ActivityCard>
        <ExpiredMedicineCard></ExpiredMedicineCard>
      </Box>
    </>
  );
};

export default Dashboard;
