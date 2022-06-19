import {
  Box,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Footer from "components/Footer";
import ProductCard from "components/ProductCard";
import UserSidebar from "components/Sidebar";

const productListPage = () => {
  return (
    <Box>
      <Box sx={{ px: "96px", pt: "20px" }}>
        <Typography sx={{ py: "20px" }}>Beranda/ Kategori/ Obat</Typography>
        <Grid container>
          <Grid item sm={4} md={4}>
            <UserSidebar />
          </Grid>
          <Grid item sm={8} md={8}>
            <Typography
              sx={{ fontSize: "24px", fontWeight: "700", mb: "10px" }}
            >
              Obat
            </Typography>
            <Divider variant="fullWidth" sx={{ my: "20px" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>45 product di Vitamin & suplemen</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "250px",
                }}
              >
                <Typography sx={{ mr: "10px" }}>Urutkan</Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Sort"
                  >
                    <MenuItem>A-Z</MenuItem>
                    <MenuItem>Terpopular</MenuItem>
                    <MenuItem>Z-A</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            {/* product list */}
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default productListPage;
