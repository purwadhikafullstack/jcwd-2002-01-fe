import { Box, Container, Divider, Link, Typography } from "@mui/material";
import CarouselCard from "components/Carousel";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import ProductCard from "components/ProductCard";
import UserSidebar from "components/Sidebar";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/Banner";
import BannerJaminan from "../components/BannerJaminan";
import UnggahResep from "components/UnggahResep";
import obat from "assets/obat.png";
import nutrisi from "assets/apel.png";
import herbal from "assets/Herbal.png";
import vitamin from "assets/Vitamin.png";
import alatKesehatan from "assets/AlatKesehatan.png";
import perawatanTubuh from "assets/perawatanTubuh.png";
import CategoryCard from "components/CategoryCard";
import kejarDiskon from "assets/kejardiskon.png";
import { position } from "@chakra-ui/react";
import MetodePembayaran from "components/MetodePembayaran";

const Home = () => {
  const categoryList = [
    {
      foto: obat,
      category: "Obat - Obatan",
    },
    {
      foto: nutrisi,
      category: "Nutrisi",
    },
    {
      foto: herbal,
      category: "Herbal",
    },
    {
      foto: vitamin,
      category: `Vitamin & Suplemen`,
    },
    {
      foto: alatKesehatan,
      category: "Alat Kesehatan",
    },
    {
      foto: perawatanTubuh,
      category: "Perawatan Tubuh",
    },
  ];

  return (
    <Box>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ my: "10px" }}>
          <CarouselCard />
        </Box>

        <Box sx={{ my: "10px" }}>
          <UnggahResep />
        </Box>

        {/* CATEGORY */}
        <Box sx={{ my: "28px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "28px",
              p: 2,
            }}
          >
            <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
              Kategori
            </Typography>
            <Link
              underline="hover"
              sx={{
                color: "brand.500",
                ":hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Typography>Lihat Semua</Typography>
            </Link>
          </Box>
          <Box display="flex">
            {categoryList.map((val) => {
              return <CategoryCard foto={val.foto} category={val.category} />;
            })}
          </Box>
        </Box>

        <Divider sx={{ width: "100%", my: "10px" }} variant="fullWidth" />

        {/* KEJAR DISKON */}
        <Box my={5}>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: "28px",
                p: 2,
              }}
            >
              <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
                Kejar Diskon Hari Ini
              </Typography>
              <Link
                underline="hover"
                sx={{
                  color: "brand.500",
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Typography>Lihat Semua</Typography>
              </Link>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "301px", height: "395px", position: "relative" }}>
              <Image
                width="301px"
                height="395px"
                src={kejarDiskon}
                style={{ position: "relative" }}
              />
              <Typography
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  fontWeight: "700",
                  fontSize: "20px",
                  width: "159px",
                  height: "50px",
                  m: 4,
                  textAlign: "center",
                }}
              >
                Yuk Buruan Ikutan!
              </Typography>
            </Box>
            <Box sx={{ display: "flex", ml: "-120px" }}>
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </Box>
          </Box>
        </Box>
        <Divider sx={{ width: "100%", my: "10px" }} variant="fullWidth" />

        {/* Banner1 */}
        <Banner />

        {/* POPULAR PRODUCT */}
        <Box sx={{ my: "58px", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "28px",
              p: 2,
            }}
          >
            <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
              Popular Product
            </Typography>
            <Link
              underline="hover"
              sx={{
                color: "brand.500",
                ":hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Typography>Lihat Semua</Typography>
            </Link>
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
        <Divider sx={{ width: "100%", my: "10px" }} variant="fullWidth" />
        <Box sx={{my: "50px"}}>
          <BannerJaminan />
        </Box>
      </Container>
      <MetodePembayaran />
      <Footer />
    </Box>
  );
};

export default Home;
