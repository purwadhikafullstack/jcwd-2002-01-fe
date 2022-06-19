import { Box, Typography } from "@mui/material";
import Image from "next/image";
const CategoryCard = ({ foto, category }) => {
  return (
    <Box
      sx={{
        width: "195px",
        height: "119px",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "200ms ease-in-out",
        boxShadow:
          "-1px -1px 5px 4px rgba(0, 12, 54, 0.01), 2px 2px 2px rgba(33, 51, 96, 0.04), 4px 4px 4px 6px rgba(0, 155, 144, 0.04)",
        p: 2,
        m: 1,
        ":hover": {
          backgroundColor: "brand.100",
          cursor: "pointer",
        },
      }}
    >
      <Image  src={foto} />
      <Typography>{category}</Typography>
    </Box>
  );
};

export default CategoryCard;
