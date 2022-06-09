import Image from "next/image";
import { Box, Button, IconButton, Typography } from "@mui/material";
import fotoObat from "assets/panadol.jpg";
import { IoMdHeart } from "react-icons/io";

const ProductCard = () => {
  return (
    <Box
      sx={{
        width: "194px",
        height: "331px",
        margin: "20px",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0px 8px 20px -12px black",
      }}
      position="relative"
    >
      <Box
        marginTop="9px"
        marginBottom="14px"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Image width="114px" height="116px" src={fotoObat} />
      </Box>
      <Box position="absolute" top="20px" right="20px">
        <IconButton
          sx={{
            width: "44px",
            height: "44px",
            backgroundColor: "white",
            boxShadow: "0px 8px 20px -12px black",
          }}
        >
          {<IoMdHeart color="#D5D7DD" />}
        </IconButton>
      </Box>
      <Typography marginBottom="25px" fontWeight="700">Panadol Merah PDI</Typography>
      <Typography marginBottom="20px">Rp. 30000 / pack</Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Button
          variant="outlined"
          sx={{
            borderRadius: "8px",
            width: "139px",
            fontSize: "12px",
            fontWeight: "700",
            color: "#009B90",
            position: "absolute",
            bottom: "25px"
          }}
        >
          Keranjang
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;
