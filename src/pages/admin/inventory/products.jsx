import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import TableData from "components/admin/TableData";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ModalAddProduct from "components/admin/ModalAddProduct";
import { useEffect, useState } from "react";
import axiosInstance from "configs/api";
import { useRouter } from "next/router";

const Products = () => {
  const router = useRouter();
  const [Open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(5);
  const [filterCategory, setFilterCategory] = useState(
    router.query.selectedCategory
  );
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [rows, setRows] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [pageIsReady, setPageIsReady] = useState(false);
  const [searchValue, setSearchValue] = useState(router.query.product_name);
  const [sortBy, setSortBy] = useState(router.query._sortBy || "");
  const [sortDir, setSortDir] = useState(router.query._sortDir || "");
  const [sortInput, setSortInput] = useState("");

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
      const res = await axiosInstance.get("/products/quantity", {
        params: {
          name: searchValue,
          selectedCategory: filterCategory || undefined,
          _sortBy: sortBy ? sortBy : undefined,
          _sortDir: sortDir ? sortDir : undefined,
          _limit: rowPerPage,
          _page: page + 1,
        },
      });

      const data = res.data.result.rows;

      setTotalData(res.data.result.count);

      setRows(
        data.map((val, idx) => {
          return {
            no: idx + rowPerPage * page + 1,
            namaObat: val.name,
            noObat: val?.no_medicine,
            noBpom: val?.no_bpom,
            kategori: val.Category.name,
            kategoriId: val.Category.id,
            stok: val.Stock_opnames[0]?.amount,
            satuan: val?.packaging,
            nilaiJual: val.price,
            productId: val.id,
            diskon: val.discount,
            productImage: val?.Product_images,
          };
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const sortInputHandler = (event) => {
    const { value } = event.target;
    setSortInput(value);

    if (value == "Harga Tertinggi") {
      setSortBy("price");
      setSortDir("DESC");
      setPage(0);
    } else if (value == "Harga Terendah") {
      setSortBy("price");
      setSortDir("ASC");
      setPage(0);
    } else if (value == "A-Z") {
      setSortBy("name");
      setSortDir("ASC");
      setPage(0);
    } else if (value == "Z-A") {
      setSortBy("name");
      setSortDir("DESC");
    } else if (value == "") {
      setSortBy("");
      setSortDir("");
      setPage(0);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(+event.target.value);
    setPage(0);
  };

  const searchInputHandler = (event) => {
    const { value } = event.target;

    setSearchInput(value);
  };

  const searchButton = () => {
    setSearchValue(searchInput);
    setPage(0);
  };

  useEffect(() => {
    if (router.isReady) {
      if (router.query.product_name) {
        setSearchValue(router.query.product_name);
      }
      if (router.query.selectedCategory) {
        setFilterCategory(router.query.selectedCategory);
      }
      if (router.query._sortBy) {
        setSortBy(router.query._sortBy);
      }
      if (router.query._sortDir) {
        setSortDir(router.query._sortDir);
      }
      setPageIsReady(true);
    }
  }, [router.isReady]);

  useEffect(() => {
    fetchCategory();

    if (pageIsReady) {
      fetchProduct();

      if (searchValue || filterCategory) {
        router.push({
          query: {
            product_name: searchValue,
            selectedCategory: filterCategory || undefined,
          },
        });
      }
      if (searchValue === "" || filterCategory === "" || sortInput === "") {
        router.replace("/admin/inventory/products", undefined, {
          shallow: true,
        });
      }
    }
  }, [
    rowPerPage,
    page,
    searchValue,
    pageIsReady,
    filterCategory,
    sortDir,
    sortBy,
  ]);

  const renderCategory = () => {
    return categories.map((val) => {
      return <MenuItem value={val.id}>{val.name}</MenuItem>;
    });
  };

  return (
    <Container
      sx={{
        p: "20px",
        marginTop: "16px",
      }}
    >
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Daftar Obat
          </Typography>
          <Box display="flex">
            <Button
              sx={{ marginRight: "15px" }}
              variant="outlined"
              startIcon={<DownloadIcon />}
            >
              Unduh PDF
            </Button>
            <Button variant="outlined" startIcon={<InsertDriveFileIcon />}>
              Excel
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          mt: "38px",
          borderRadius: "8px",
          height: "73vh",
          overflow: "scroll",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="24px"
          >
            <Box
              display="flex"
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <OutlinedInput
                placeholder="Cari nama obat"
                onChange={searchInputHandler}
                sx={{ width: "328px", height: "42px" }}
                endAdornment={
                  <InputAdornment>
                    <SearchIcon
                      onClick={searchButton}
                      sx={{
                        ":hover": {
                          cursor: "pointer",
                        },
                      }}
                    />
                  </InputAdornment>
                }
              />
              <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
                <InputLabel>Filter</InputLabel>
                <Select
                  label="Filter"
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <MenuItem value="">None</MenuItem>
                  {renderCategory()}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                <InputLabel>Sort</InputLabel>
                <Select
                  label="Sort"
                  value={sortInput}
                  onChange={sortInputHandler}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="A-Z">A-Z</MenuItem>
                  <MenuItem value="Z-A">Z-A</MenuItem>
                  <MenuItem value="Harga Terendah">Harga Terendah</MenuItem>
                  <MenuItem value="Harga Tertinggi">Harga Tertinggi</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
              >
                Tambah Obat
              </Button>
            </Box>
          </Box>
          <Divider />
          <ModalAddProduct
            open={Open}
            handleClose={handleClose}
            fetchProduct={fetchProduct}
          />
        </Box>
        <Box sx={{ px: 3, mb: 3 }}>
          <TableData
            rows={rows}
            page={page}
            rowPerPage={rowPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            totalData={totalData}
            fetchProduct={fetchProduct}
          ></TableData>
        </Box>
      </Box>
    </Container>
  );
};

export default Products;
