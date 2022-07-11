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
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const KejarDiskon = ({products}) => {

    const renderProducts = () => {
        return products.map((val) => {
            return (
              <ProductCard
                productName={val.name}
                id={val.id}
                price={val.price}
                productImage={val.Product_images[0].image_url}
              />
            );
        })
    }

  return (
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
            href="/product_list"
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
          {renderProducts()}
        </Box>
      </Box>
    </Box>
  );
};


export default KejarDiskon