import { Box, Typography } from "@mui/material"
import ProductCard from "./ProductCard";

const RelatedProduct = () => {
    return (
      <Box>
        <Box sx={{ my: "58px", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              mb: "28px",
              p: 2,
            }}
          >
            <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
              Popular Product
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </Box>
        </Box>
      </Box>
    );
}

export default RelatedProduct