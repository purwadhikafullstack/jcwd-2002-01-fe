import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Image from "next/image";
import fotoObat from "assets/panadol.jpg";
import Navbar from "components/Navbar";
import { useState } from "react";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { FaCartPlus } from "react-icons/fa";
import { BsChatDotsFill, BsShareFill } from "react-icons/bs";
import ProductCard from "components/ProductCard";
import Footer from "components/Footer";
import Deskripsi from "components/tabs/Deskripsi";
import TabPanel from "components/TabPanel";
import RelatedProduct from "components/RelatedProducts";



const productDetailPage = () => {
  const [counter, setCounter] = useState(0);

  const [tabMenu, setTabMenu] = useState(0);

  const [isLiked, setIsLiked] = useState(false);

  const handleTabMenu = (event, newValue) => {
    setTabMenu(newValue)
    console.log(newValue)
  };
  

  return (
    <>
      <Box sx={{ mx: "96px" }}>
        <Typography sx={{pl: "80px", pt: "40px"}}>Beranda/ Kategori/ Obat</Typography>
        <Grid container spacing={2} marginTop="70px" sx={{ height: "100vh" }}>
          <Grid
            item
            xs={5}
            md={5}
            sx={{
              heigth: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box>
              <Box
                sx={{
                  p: "10px 30px",
                  boxShadow: "0px 7px 18px -15px black",
                  width: "380px",
                  heigth: "300px",
                  borderRadius: "8px",
                  mb: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image src={fotoObat} />
              </Box>
              <Box>
                <Button
                  variant="contained"
                  startIcon={<BsChatDotsFill />}
                  sx={{
                    borderRadius: "50px",
                    mr: "5px",
                    minwidth: "145px",
                  }}
                >
                  Chat Admin
                </Button>
                <Button
                  variant="contained"
                  startIcon={<BsShareFill />}
                  sx={{
                    borderRadius: "50px",
                    minwidth: "145px",
                  }}
                >
                  Bagikan
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={7}
            md={7}
            sx={{
              borderRadius: "5px",
            }}
          >
            <Box>
              <Typography fontSize="14px" fontWeight="700">
                Panadol
              </Typography>
              <Typography fontSize="22px" marginBottom="20px">
                Panadol Merah
              </Typography>
              <Typography fontSize="24px" fontWeight="700" marginBottom="24px">
                Rp 13.000/strip
              </Typography>
            </Box>
            <ButtonGroup
              size="small"
              variant="text"
              sx={{ backgroundColor: "#EDF6FF", mb: "44px" }}
            >
              <Button
                disabled={counter <= 0}
                onClick={() => {
                  setCounter(counter - 1);
                }}
              >
                -
              </Button>

              <Button disabled>
                {counter}
              </Button>

              <Button
                disabled={counter >= 10}
                onClick={() => {
                  setCounter(counter + 1);
                }}
              >
                +
              </Button>
            </ButtonGroup>

            <Box marginBottom="76px">
              <Button
                variant="outlined"
                startIcon={<FaCartPlus style={{ marginRight: "10px" }} />}
                style={{ minWidth: "194px", minHeight: "47px" }}
              >
                Keranjang
              </Button>
              <Button
                variant="contained"
                sx={{ ":hover": { boxShadow: "none" } }}
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  minWidth: "150px",
                  minHeight: "47px",
                  boxShadow: "none",
                }}
              >
                Beli
              </Button>
              <Button
                variant={isLiked ? "contained" : "outlined"}
                style={{
                  minWidth: "47px",
                  minHeight: "47px",
                  boxShadow: "none",
                }}
                sx={{ ":hover": { boxShadow: "none" } }}
                onClick={() => setIsLiked(!isLiked)}
              >
                {isLiked ? (
                  <HiHeart fontSize="20px" />
                ) : (
                  <HiOutlineHeart fontSize="20px" />
                )}
              </Button>
            </Box>
            <Box sx={{ width: "616px" }}>
              <Box
                sx={{ borderBottom: 1, borderTop: 1, borderColor: "divider" }}
              >
                <Tabs
                  variant="fullWidth"
                  onChange={handleTabMenu}
                  value={tabMenu}
                  centered
                  sx={{
                    ".MuiTabs-indicator": {
                      backgroundColor: "brand.500",
                      color: "brand.500",
                    },
                  }}
                >
                  <Tab label="Deskripsi" sx={{ textTransform: "none" }} />
                  <Tab label="Cara Pakai" sx={{ textTransform: "none" }} />
                  <Tab label="Peringatan" sx={{ textTransform: "none" }} />
                </Tabs>
              </Box>
              <TabPanel value={tabMenu} index={0}>
                {<Deskripsi />}
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
        <Box>
          <Divider variant="fullWidth" sx={{ my: "72px" }} />
        </Box>
        <RelatedProduct/>
      </Box>
      <Footer />
    </>
  );
};

export default productDetailPage;
