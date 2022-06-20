import { Box, CircularProgress, Typography } from "@mui/material";

const AnalyticCard = () => {
  return (
    <Box
      display="flex"
      sx={{
        width: "353px",
        height: "122px",
        borderRadius: "10px",
        padding: "15px",
        justifyContent: "space-between",
        boxShadow: "0px 8px 20px -12px black",
        alignItems: "center",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box>
        <Typography fontSize="12px">Profit Hari ini</Typography>
        <Typography fontSize="24px" sx={{ fontWeight: "bold" }}>
          Rp 10.213.500
        </Typography>
        <Typography
          fontSize="10px"
          fontWeight="24px"
          sx={{ color: "#009B90", pt: 2 }}
        >
          +5.700.000
        </Typography>
      </Box>
      <Box>
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="determinate"
            value={60}
            thickness={4}
            size={65}
            color="success"
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >
              60%
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default AnalyticCard;
