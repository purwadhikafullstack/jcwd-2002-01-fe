import { Box, Divider, Grid, Typography } from "@mui/material";

const Deskripsi = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
          <Typography fontWeight="700">Indikasi / Kegunaan</Typography>
        </Grid>
        <Grid item xs={6} md={6}>
          <Typography>
            Untuk mengobati batu berdahak, batuk karena flu, batuk karena asma,
            bronkitis akut atau kronis
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Divider variant="fullWidth" />
        </Grid>
        <Grid item xs={6} md={6}>
          <Typography fontWeight="700">Kandungan / Komposisi</Typography>
        </Grid>
        <Grid item xs={6} md={6}>
          <Typography>Tiap tablet mengandung bromhexine HCl 8 mg</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Deskripsi;
