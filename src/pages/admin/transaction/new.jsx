import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import TransactionCard from "components/admin/TransactionCard";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import axiosInstance from "configs/api";
import { useRouter } from "next/router";

const Transaction = () => {
  const router = useRouter();
  const [transaction, setTrancation] = useState([]);
  const [cardPerPage, setCardPerPage] = useState("5");
  const [page, setPage] = useState(router.query._page || 1);
  const [productsCount, setProductsCount] = useState(0);
  const [pageIsReady, setPageIsReady] = useState(false);

  const cardHandle = (event) => {
    setCardPerPage(event.target.value);
  };

  const handleChange = (e, p) => {
    setPage(p);
    // _DATA.jump(p);
  };

  const fetchTransaction = async () => {
    try {
      const res = await axiosInstance.get("/transactions", {
        params: {
          status_transaction: "waiting for confirmation",
          _limit: cardPerPage,
          _page: page,
        },
      });
      const data = res.data.result.rows;
      setProductsCount(res.data.result.count);

      setTrancation(
        data.map((val) => {
          return {
            transactionId: val?.id,
            createdAt: val?.createdAt,
            productName: val?.TransactionItems[0]?.Product.name,
            quantity: val?.TransactionItems[0]?.quantity,
            productPrice: val?.TransactionItems[0]?.Product?.price,
            customerName: val?.User?.username,
            address: val?.User?.Addresses[0]?.address,
            totalPrice: val?.total_price,
            countProduct: val?.TransactionItems.length,
            productImage:
              val?.TransactionItems[0]?.Product?.Product_images[0]?.image_url,
            productTransaction: val?.TransactionItems,
            status: val?.status_transaction,
          };
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const renderTransaction = () => {
    return transaction.map((val) => {
      return <TransactionCard data={val} fetchTransaction={fetchTransaction} />;
    });
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
    if (pageIsReady) {
      fetchTransaction();

      router.push({
        query: {
          _page: page ? page : undefined,
        },
      });
    }
  }, [pageIsReady, cardPerPage, page]);
  return (
    <Container sx={{ mt: "24px" }}>
      {/* Header */}
      <Box
        display="flex"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: "700", fontSize: "20px" }}>
            Semua Pesanan
          </Typography>
        </Box>
        <Box display="flex">
          <Button
            size="small"
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

      {/* Filter */}
      <Stack direction="row" spacing={2} sx={{ mt: "24px" }}>
        <Stack item>
          <OutlinedInput
            sx={{
              borderRadius: "10px",
              width: "328px",
              height: "42px",
              backgroundColor: "white",
              marginRight: "16px",
            }}
            placeholder="Cari nama obat"
            endAdornment={<SearchIcon htmlColor="gray" />}
          />
        </Stack>
        <Stack item>
          <FormControl sx={{ marginRight: "16px" }}>
            <Select
              sx={{
                borderRadius: "10px",
                minWidth: "156px",
                height: "42px",
                backgroundColor: "white",
              }}
              value="obat bebas"
              displayEmpty
              autoWidth
            >
              <MenuItem disabled value="">
                Filter
              </MenuItem>
              <MenuItem value="Obat Bebas">Obat Bebas</MenuItem>
              <MenuItem value="Obat Resep">Obat Resep</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack item>
          <FormControl>
            <Select
              sx={{
                borderRadius: "10px",
                minWidth: "156px",
                height: "42px",
                backgroundColor: "white",
              }}
              value={2}
              autoWidth
              displayEmpty
            >
              <MenuItem value="" disabled>
                Urutkan
              </MenuItem>
              <MenuItem value="Terbaru">Terbaru</MenuItem>
              <MenuItem value="Harga Tertinggi">Harga Tertinggi</MenuItem>
              <MenuItem value="Harga Terendah">Harga Terendah</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      {/* pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "24px",
          mb: "12px",
        }}
      >
        <Box>
          <FormControlLabel control={<Checkbox />} label="Pilih Semua" />
        </Box>
        <Box display="flex" sx={{ alignItems: "center" }}>
          <Typography sx={{ mr: "5px" }}>Kartu per halaman</Typography>
          <FormControl sx={{ marginRight: "30px" }}>
            <Select
              sx={{
                borderRadius: "5px",
                minWidth: "68px",
                height: "28px",
                backgroundColor: "white",
                borderColor: "brand.500",
              }}
              onChange={cardHandle}
              value={cardPerPage}
              autoWidth
              displayEmpty
            >
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
          <Pagination
            count={Math.ceil(productsCount / cardPerPage)}
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Box>

      {renderTransaction()}
    </Container>
  );
};

export default Transaction;
