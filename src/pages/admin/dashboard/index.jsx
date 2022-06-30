import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import ActivityCard from "components/admin/ActivityCard";

import AnalyticCard from "components/admin/AnalyticCard";
import ExpiredMedicineCard from "components/admin/ExpiredMedicineCard";
import ProfitCard from "components/admin/ProfitCard";
import requiresAdmin from "lib/requiresAdmin";

const Dashboard = () => {
  return (
    <>
      <Container sx={{ pt: "20px" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
          Analisis Produk &amp; toko
        </Typography>
        <Typography sx={{ fontSize: "14px" }}>
          Update Terakhir : 20 Januari 2022, 14,30 WIB
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mt: 2, mb: "32px" }}>
          <AnalyticCard></AnalyticCard>
          <AnalyticCard></AnalyticCard>
          <AnalyticCard></AnalyticCard>
        </Stack>

        <Grid container columnSpacing={3}>
          <Grid item xs={6}>
            <Box sx={{ mb: "16px" }}>
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                Penting Hari Ini
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#737A8D" }}>
                Aktivitas yang perlu kamu ketahui untuk menjaga kepuasan
                pelanggan
              </Typography>
            </Box>
            <Grid container columnSpacing={2}>
              <Grid item xs={4}>
                <ActivityCard></ActivityCard>
              </Grid>
              <Grid item xs={4}>
                <ActivityCard></ActivityCard>
              </Grid>
              <Grid item xs={4}>
                <ActivityCard></ActivityCard>
              </Grid>
              <Grid item xs={4}>
                <ActivityCard></ActivityCard>
              </Grid>
              <Grid item xs={4}>
                <ActivityCard></ActivityCard>
              </Grid>
              <Grid item xs={4}>
                <ActivityCard></ActivityCard>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ mb: "16px" }}>
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                Kadaluwarsa Obat
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#737A8D" }}>
                Cek tanggal kedaluwarsa untuk mengorganisir stok obat
              </Typography>
            </Box>
            <ExpiredMedicineCard></ExpiredMedicineCard>
          </Grid>
        </Grid>

        <ProfitCard></ProfitCard>
      </Container>
    </>
  );
};

export const getServerSideProps = requiresAdmin((context) => {
  return {
    props: {},
  };
});

export default Dashboard;
