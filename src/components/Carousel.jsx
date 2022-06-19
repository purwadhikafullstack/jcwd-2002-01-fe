import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Box, Typography } from "@mui/material";
import Image from "next/image";
import { MdOutlineNavigateNext, MdNavigateBefore } from "react-icons/md";
import carouselImage1 from "assets/carousel1.png"

const CarouselCard = (props) => {
  let items = [
    {
      name: "Selamat Datang di HEALTHYMED",
      description: "APOTEK ONLINE TERPERCAYA",
      image: carouselImage1,
    },
    {
      name: "Obat 100% ASLI",
      description: "DIJAMIN SEHAT",
      image: carouselImage1
    },
  ];

  return (
    <Carousel
      sx={{ width: "1244px", height: "232px", backgroundColor: "brand.500", m: 5, borderRadius: "16px" }}
      NextIcon={<MdOutlineNavigateNext />}
      PrevIcon={<MdNavigateBefore />}
    >
      {items.map((val, i) => (
        <Item
          key={i}
          name={val.name}
          description={val.description}
          image={val.image}
        />
      ))}
    </Carousel>
  );
};

const Item = ({name, description, image}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ maxWidth: "100%", maxHeight: "100%", p: 5 }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
          {name}
        </Typography>
        <Typography sx={{ fontSize: "30px", fontWeight: "900" }}>
          {description}
        </Typography>
      </Box>
      <Box sx={{ width: "648px", height: "100%" }}>
        <Image style={{ objectFit: "contain" }} src={image} />
      </Box>
    </Box>
  );
};

export default CarouselCard;
