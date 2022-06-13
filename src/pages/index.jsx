import { Box, Typography } from "@mui/material";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import ProductCard from "components/ProductCard";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <Box>
      <Navbar />
      <ProductCard />
    </Box>
  );
};

export default Home;
