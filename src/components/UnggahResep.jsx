import { Box, Button, Link, Typography } from "@mui/material";
import Image from "next/image";
import foto from "assets/unggahresep.png";

const UnggahResep = () => {
  return (
    <Box
      sx={{
        width: "1248px",
        height: "168px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "16px",
        boxShadow: "-1px -1px 5px 4px rgba(0, 12, 54, 0.01), 2px 2px 2px rgba(33, 51, 96, 0.04), 4px 4px 4px 6px rgba(0, 155, 144, 0.04)",
        pr: 4,
        pt: "4px "
      }}
    >
      <Box>
        <Image src={foto} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: "20px", fontWeight: "700"}}>Punya Resep Doktor?</Typography>
        <Typography sx={{ fontSize: "14px", fontWeight: "400",maxWidth: "352px" }}>
          {`Tak perlu antre & obat langsung dikirimkan ke lokasi anda! Fototidak boleh lebih dari 10 MB`}
        </Typography>
      </Box>
      <Box>
        <Link href="upload_prescription" underline="none">
          <Button variant="contained" sx={{width: "274px"}}>Unggah Resep</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default UnggahResep;
