import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Box } from "@mui/material";
import Image from "next/image";

const CarouselCard = (props) => {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      image:
        "https://gatsby.co.id/media/article/GATSBY%20-%205%20Persiapan%20Sebelum%20Hunting%20Foto%20Supaya%20Bisa%20Lebih%20Fokus.jpg",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      image:
        "https://images.unsplash.com/photo-1574217013471-c32c6846cef7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Zm90b3xlbnwwfHwwfHw%3D&w=1000&q=80",
    },
  ];

  return (
    <Carousel
      sx={{ width: "1244px" }}
      NextIcon={<img src="http://random.com/next" />}
      PrevIcon={<img src="http://random.com/prev" />}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

const Item = (props) => {
  return (
    <Box sx={{ width: "100%", height: "232px", display: "flex", justifyContent: "space-between" }}>
      <Box>
        <h2>{props.item.name}</h2>
        <p>{props.item.description}</p>
      </Box>
      <Box sx={{ width: "648px"}}>
        <img src={props.item.image} />
      </Box>
    </Box>
  );
};

export default CarouselCard;
