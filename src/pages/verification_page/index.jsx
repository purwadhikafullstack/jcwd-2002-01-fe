import { Box, Typography } from "@mui/material";

const VerificationPage = () => {
  return (
    <Box
      mt={50}
      display="flex"
      sx={{ justifyContent: "center", alignItems: "center" }}
    >
      <Typography fontSize={20}>
        Congratulation you account in verified
      </Typography>
    </Box>
  );
};

export default VerificationPage;
