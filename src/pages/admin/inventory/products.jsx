import {
  Box,
  Button,
  Container,
  Divider,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import TableData from "components/admin/TableData";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ModalAddProduct from "components/admin/ModalAddProduct";
import { useEffect, useState } from "react";
import ModalAddStock from "components/admin/ModalAddStock";
import axiosInstance from "configs/api";
import { useRouter } from "next/router";

const Products = () => {
  const router = useRouter();
  const [Open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const [OpenStock, setOpenStock] = useState(false);
  const handleOpenStock = () => setOpenStock(true);
  const handleCloseStock = () => {
    setOpenStock(false);
  };

  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [sortBy, setSortBy] = useState();
  const [sortDir, setSortDir] = useState();
  const [filterCategory, setFilterCategory] = useState(
    router.query.filter_by_category
  );
  const [namaObatFilter, setNamaObatFilter] = useState();
  const [rows, setRows] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [pageIsReady, setPageIsReady] = useState(false);

  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get("/products/quantity", {
        params: {
          // // name: searchValue,
          // selectedCategory: selectedCategory || undefined,
          // _sortBy: sortBy ? sortBy : undefined,
          // _sortDir: sortDir ? sortDir : undefined,
          _limit: 10,
          _page: 1,
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
            stok: val.Stock_opnames[0]?.amount,
            satuan: val?.packaging,
            nilaiJual: val.price,
            productId: val.id,
            diskon: val.discount,
          };
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  // useEffect(() => {
  //   if (router.isReady) {
  //     if (router.query.name) {
  //       setSearchValue(router.query.name);
  //     }
  //     if (router.query._sortDir) {
  //       setSortDir(router.query._sortDir);
  //     }
  //     if (router.query._sortBy) {
  //       setSortBy(router.query._sortBy);
  //     }
  //     if (router.query._page) {
  //       setPage(parseInt(router.query._page));
  //     }
  //     if (router.query.selectedCategory) {
  //       setSelectedCategory(router.query.selectedCategory);
  //     }
  //     setPageIsReady(true);
  //   }
  // }, [router.isReady]);

  useEffect(() => {
    fetchProduct();
  }, []);

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
            <OutlinedInput
              placeholder="Cari nama obat"
              sx={{ width: "328px", height: "42px" }}
              endAdornment={
                <InputAdornment>
                  <SearchIcon />
                </InputAdornment>
              }
            />
            <Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenStock}
                sx={{ mr: 2 }}
              >
                Tambah Stock
              </Button>
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
          <ModalAddProduct open={Open} handleClose={handleClose} />
          <ModalAddStock open={OpenStock} handleClose={handleCloseStock} />
        </Box>
        <Box sx={{ px: 3, mb: 3 }}>
          <TableData rows={rows}></TableData>
        </Box>
      </Box>
    </Container>
  );
};

export default Products;
