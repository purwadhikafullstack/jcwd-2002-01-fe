import { Box, Typography } from "@mui/material";

const ExpiredMedicineCard = () => {
  return (
    <Box
      sx={{
        width: "353px",
        height: "186px",
        borderRadius: "10px",
        margin: "20px",
        padding: "30px",
        boxShadow: "0px 8px 20px -12px black",
        alignItems: "center",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box
        display="flex"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Typography fontSize="16px">Telah Kedaluwarsa</Typography>
        <Typography fontSize="24px" sx={{ color: "#FF6B6B" }}>
          17
        </Typography>
      </Box>
      <Box
        display="flex"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Typography fontSize="16px">Kedaluwarsa Bulan ini </Typography>
        <Typography fontSize="24px" sx={{ color: "#FFDE6B" }}>
          0
        </Typography>
      </Box>
      <Box
        display="flex"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Typography fontSize="16px">Kedaluwarsa 3 Bulan Kedepan</Typography>
        <Typography fontSize="24px" sx={{ color: "#21CDC0" }}>
          3
        </Typography>
      </Box>
    </Box>
  );
};
export default ExpiredMedicineCard;
