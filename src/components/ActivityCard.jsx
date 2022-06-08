import { Box, Typography } from "@mui/material";

const ActivityCard = () => {
  return (
    <Box
      sx={{
        width: "168px",
        height: "93px",
        borderRadius: "16px",
        margin: "20px",
        padding: "15px",
        boxShadow: "0px 8px 20px -12px black",
        alignItems: "center",
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
