import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Box, Typography } from "@mui/material";
import Image from "next/image";
import { MdOutlineNavigateNext, MdNavigateBefore } from "react-icons/md";

const CarouselCard = ({img_url=[]}) => {
  return (
    <Carousel
      sx={{
        p: "10px 30px",
        width: "380px",
        heigth: "300px",
        borderRadius: "8px",
        mb: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",}}
        NextIcon={<MdOutlineNavigateNext />}
        PrevIcon={<MdNavigateBefore />}
    >
      {img_url.map((val, i) => (
        <Item
          key={i}

          image={val.image_url}
        />
      ))}
    </Carousel>
  );
};

const Item = ({image}) => {
  return (
      <Box 
      p= "10px 30px"
      boxShadow= "0px 7px 18px -15px black"
      width= "380px"
      height= "300px"
      borderRadius= "8px"
      mb= "20px"
      display= "flex"
      flexDirection= "column"
      alignItems= "center"
      // layout="fill" 
      objectFit= "contain" 
      component="img" src={image}>
      </Box>
  );
};

export default CarouselCard;
