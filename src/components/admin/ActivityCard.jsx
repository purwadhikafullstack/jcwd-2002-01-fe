import { Box, Grid, Typography } from "@mui/material";

const ActivityCard = () => {
  return (
    <Box
      sx={{
        maxWidth: "168px",
        width: "100%",
        height: "93px",
        borderRadius: "10px",
        marginBottom: "20px",
        padding: "15px",
        boxShadow: "0px 8px 20px -12px black",
        alignItems: "center",
        bgcolor: "#FFFFFF",
      }}
    >
      <Typography fontSize="14px" sx={{ color: "#737A8D" }}>
        Pesanan Baru
      </Typography>
      <Typography fontSize="28px" sx={{ fontWeight: "bold" }}>
        7
      </Typography>
    </Box>
  );
};
export default ActivityCard;
