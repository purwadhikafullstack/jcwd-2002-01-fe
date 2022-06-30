import {
  Box,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import Footer from "components/Footer";
import ProductCard from "components/ProductCard";
import UserSidebar from "components/Sidebar";
import Link from "next/link";
import axiosInstance from "configs/api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { useSelector } from "react-redux";

const productListPage = () => {
  const router = useRouter();
  const search = useSelector((state) => state.search);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(router.query._page || 1);
  const [sortBy, setSortBy] = useState(router.query._sortBy || "");
  const [sortDir, setSortDir] = useState(router.query._sortDir || "");
  const [sortInput, setSortInput] = useState("");
  const [pageIsReady, setPageIsReady] = useState(false);
  const [searchValue, setSearchValue] = useState(search.searchInput);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const maxProductPerPage = 10;

  const fetchCategory = async () => {
    try {
      const res = await axiosInstance.get("/categories");

      setCategories(res.data.result);
      console.log(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get("/products", {
        params: {
          name: searchValue,
          selectedCategory: selectedCategory || undefined,
          _sortBy: sortBy ? sortBy : undefined,
          _sortDir: sortDir ? sortDir : undefined,
          _limit: maxProductPerPage,
          _page: page,
        },
      });

      setProducts(res.data.result.rows);
      setProductsCount(res.data.result.count);
    } catch (err) {
      console.log(err);
    }
  };

  const renderProducts = () => {
    return products.map((val, idx) => {
      return (
        <ProductCard
          productName={val?.name}
          price={val?.price}
          productImage={val.Product_images[0]?.image_url}
          id={val.id}
        />
      );
    });
  };

  const sortInputHandler = (event) => {
    const { value } = event.target;
    setSortInput(value);

    if (value == "Harga Tertinggi") {
      setSortBy("price");
      setSortDir("DESC");
      setPage(1);
    } else if (value == "Harga Terendah") {
      setSortBy("price");
      setSortDir("ASC");
      setPage(1);
    } else if (value == "A-Z") {
      setSortBy("name");
      setSortDir("ASC");
      setPage(1);
    } else if (value == "Z-A") {
      setSortBy("name");
      setSortDir("DESC");
      setPage(1);
    } else if (value == "") {
      setSortBy("");
      setSortDir("");
      setPage(1);
    }
  };

  const resetSort = () => {
    setSortBy("");
    setSortDir("");
    setPage(1);
    setSortInput("");
  };

  useEffect(() => {
    if (router.isReady) {
      if (router.query.name) {
        setSearchValue(router.query.name);
      }
      if (router.query._sortDir) {
        setSortDir(router.query._sortDir);
      }
      if (router.query._sortBy) {
        setSortBy(router.query._sortBy);
      }
      if (router.query._page) {
        setPage(parseInt(router.query._page));
      }
      if (router.query.selectedCategory) {
        setSelectedCategory(router.query.selectedCategory);
      }
      setPageIsReady(true);
    }
  }, [router.isReady]);

  useEffect(() => {
    fetchCategory();
    if (pageIsReady) {
      fetchProduct();

      router.push({
        query: {
          name: searchValue,
          _sortBy: sortBy ? sortBy : undefined,
          _sortDir: sortDir ? sortDir : undefined,
          _page: page ? page : undefined,
          selectedCategory: selectedCategory || undefined,
        },
      });
    }
  }, [page, sortDir, sortBy, pageIsReady, searchValue, selectedCategory]);

  useEffect(() => {
    setSearchValue(search.searchInput);
    setPage(1);
  }, [search.searchInput]);

  return (
    <Box>
      <Box sx={{ px: "96px", pt: "20px" }}>
        <Typography sx={{ py: "20px" }}>Beranda/ Kategori/ Obat</Typography>
        <Grid container>
          <Grid item sx={{ display: { xs: "none", md: "grid" } }} sm={4} md={4}>
            <Box display={{ xs: "none", sm: "none", md: "inline-block" }}>
              <UserSidebar
                category={categories}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
                setCategoryName={setCategoryName}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
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
              <Typography>{`${productsCount} products ${
                categoryName ? `di ${categoryName}` : ""
              }`}</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "300px",
                }}
              >
                <Typography sx={{ mr: "10px" }}>Urutkan</Typography>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sortInput}
                    onChange={sortInputHandler}
                  >
                    <MenuItem value="A-Z">A-Z</MenuItem>
                    <MenuItem value="Z-A">Z-A</MenuItem>
                    <MenuItem value="Harga Terendah">Harga Terendah</MenuItem>
                    <MenuItem value="Harga Tertinggi">Harga Tertinggi</MenuItem>
                  </Select>
                </FormControl>
                {sortInput ? (
                  <IconButton onClick={() => resetSort()}>
                    {<GrPowerReset />}
                  </IconButton>
                ) : undefined}
              </Box>
            </Box>

            {/* product list */}
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {renderProducts()}
            </Box>
            <Box
              sx={{
                mt: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Pagination
                count={Math.ceil(productsCount / maxProductPerPage)}
                page={page}
                onChange={(e, value) => setPage(value)}
              />
            </Box>
            <Box
              sx={{
                mt: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              page: {page}
              <Pagination
                count={Math.ceil(productsCount / maxProductPerPage)}
                page={page}
                onChange={(e, value) => setPage(value)}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box display={{ xs: "none", md: "flex" }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default productListPage;
