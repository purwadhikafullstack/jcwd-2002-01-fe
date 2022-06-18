import { Box, Typography } from "@mui/material";
import CarouselCard from "components/Carousel";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import ProductCard from "components/ProductCard";
import UserSidebar from "components/Sidebar";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/Banner";
import BannerJaminan from "../components/BannerJaminan"

const Home = () => {
  return (
    <Box>
      <CarouselCard/>
      <BannerJaminan/>
    </Box>
  );
};

export default Home;