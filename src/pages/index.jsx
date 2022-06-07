import { Box, Typography } from "@mui/material";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import ProductCard from "components/ProductCard";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <Box>
      <Navbar/>
      <ProductCard/>
      <Footer/>
    </Box>
  );
};

export default Home;

