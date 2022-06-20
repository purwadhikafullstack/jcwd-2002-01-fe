import Image from "next/image";
import { Box, Button, IconButton, Typography } from "@mui/material";
import fotoObat from "assets/panadol.jpg";
import { IoMdHeart } from "react-icons/io";
import { useState } from "react";

const ProductCard = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Box
      sx={{
        width: "194px",
        height: "331px",
        margin: "10px",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0px 8px 20px -12px black",
        backgroundColor: "white",
        transition: "200ms",
        ":hover": {
          cursor: "pointer",
          transform: "translateY(-5px)",
          boxShadow: "0px 12px 20px -12px black",
        },
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
          onClick={() => setIsLiked(!isLiked)}
          sx={{
            width: "44px",
            height: "44px",
            backgroundColor: "white",
            color: isLiked ? "#f57182" : "#D5D7DD",
            boxShadow: "0px 8px 20px -12px black",
            ":hover": {
              backgroundColor: "#D5D7DD",
              color: isLiked ? "#f57182" : "whitesmoke"
            },
          }}
        >
          {
            <IoMdHeart
            />
          }
        </IconButton>
      </Box>
      <Typography marginBottom="25px" fontWeight="700">
        Panadol Merah PDI
      </Typography>
      <Typography marginBottom="20px">Rp. 30000 / pack</Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Button
          variant="outlined"
          sx={{
            borderRadius: "8px",
            width: "139px",
            fontSize: "12px",
            fontWeight: "700",
            position: "absolute",
            bottom: "25px",
          }}
        >
          Keranjang
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;
