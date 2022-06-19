import { Box, Stack, Typography } from "@mui/material";
import logoBCA from "assets/logoBCA.png";
import logoMandiri from "assets/mandiri.png";
import logoOvo from "assets/ovo.png";
import logoGopay from "assets/gopay.png";
import logoPermata from "assets/permata.png";
import logoShopee from "assets/shopee.png";
import Image from "next/image";

const MetodePembayaran = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F6FAFB",
        pt:"24px",
        pb: "40px"
      }}
    >
      <Typography variant="h6" fontWeight="700" sx={{ mb: "30px" }}>
        Metode Pembayaran
      </Typography>
      <Stack
        spacing={12}
        direction="row"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box>
          <Image width="90px" height="40px" objectFit="contain" src={logoBCA} />
        </Box>
        <Box>
          <Image
            width="90px"
            height="40px"
            objectFit="contain"
            src={logoMandiri}
          />
        </Box>
        <Box>
          <Image
            width="90px"
            height="40px"
            objectFit="contain"
            src={logoPermata}
          />
        </Box>
        <Box>
          <Image width="90px" height="40px" objectFit="contain" src={logoOvo} />
        </Box>
        <Box>
          <Image
            width="90px"
            height="40px"
            objectFit="contain"
            src={logoGopay}
          />
        </Box>
        <Box>
          <Image
            width="90px"
            height="40px"
            objectFit="contain"
            src={logoShopee}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default MetodePembayaran;
