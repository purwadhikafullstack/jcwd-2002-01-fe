import { Box, Typography } from "@mui/material";
import Dropzone from "components/Dropzone";

const uploadPrescriptionPage = () => {
  return ( 
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box>
        <Typography fontSize="24px" fontWeight="700">Kirim Resep</Typography>
        <Dropzone />
      </Box>
    </Box>
  );
};

export default uploadPrescriptionPage;
