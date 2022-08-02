import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
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
  const [sortBy, setSortBy] = useState(router.query._sortBy || "");
  const [sortDir, setSortDir] = useState(router.query._sortDir || "");
  const [sortInput, setSortInput] = useState("");
  const [searchValue, setSearchValue] = useState(router.query.username);
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchDateValue, setSearchDateValue] = useState(router.query.date);

  const cardHandle = (event) => {
    setCardPerPage(event.target.value);
    setPage(1);
  };

  const handleChange = (e, p) => {
    setPage(p);
    // _DATA.jump(p);
  };

  const startDateHandle = (event) => {
    setStartDate(event.target.value);
  };
  const endDateHandle = (event) => {
    setEndDate(event.target.value);
  };

  const fetchTransaction = async () => {
    try {
      const res = await axiosInstance.get("/transactions", {
        params: {
          status_transaction: "ready delivery",
          _limit: cardPerPage,
          _page: page,
          _sortBy: sortBy ? sortBy : undefined,
          _sortDir: sortDir ? sortDir : undefined,
          username: searchValue,
          date: searchDateValue,
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
            address: val?.Address?.address,
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

  const sortInputHandler = (event) => {
    const { value } = event.target;
    setSortInput(value);

    if (value == "Terbaru") {
      setSortBy("createdAt");
      setSortDir("DESC");
      setPage(1);
    } else if (value == "Terlama") {
      setSortBy("createdAt");
      setSortDir("ASC");
      setPage(1);
    } else if (value == "") {
      setSortBy("");
      setSortDir("");
      setPage(1);
    }
  };

  const searchInputHandler = (event) => {
    const { value } = event.target;

    setSearchInput(value);
  };

  const searchButton = () => {
    setSearchValue(searchInput);
    setPage(1);
  };

  const searchDateButton = () => {
    setSearchDateValue([startDate, endDate]);
    setPage(1);
  };

  const renderTransaction = () => {
    return transaction.map((val) => {
      return <TransactionCard data={val} fetchTransaction={fetchTransaction} />;
    });
  };

  useEffect(() => {
    if (router.isReady) {
      if (router.query.username) {
        setSearchValue(router.query.username);
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
      if (router.query.date) {
        setSearchDateValue(router.query.date);
      }
      setPageIsReady(true);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (pageIsReady) {
      fetchTransaction();

      router.push({
        query: {
          username: searchValue,
          _page: page ? page : undefined,
          date: searchDateValue,
          _sortBy: sortBy ? sortBy : undefined,
          _sortDir: sortDir ? sortDir : undefined,
        },
      });

      if (searchValue === "" || sortInput === "") {
        router.replace("/admin/transaction/transactions", undefined, {
          shallow: true,
        });
      }
    }
  }, [
    pageIsReady,
    cardPerPage,
    page,
    sortDir,
    sortBy,
    searchValue,
    searchDateValue,
  ]);

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
            }}
            onChange={searchInputHandler}
            placeholder="Cari nama obat"
            endAdornment={
              <InputAdornment>
                <SearchIcon
                  htmlColor="gray"
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
        </Stack>

        <Stack item>
          <FormControl size="small">
            <InputLabel>Sort</InputLabel>
            <Select
              label="Sort"
              value={sortInput}
              onChange={sortInputHandler}
              sx={{
                borderRadius: "10px",
                minWidth: "156px",
                height: "42px",
                backgroundColor: "white",
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Terbaru">Terbaru</MenuItem>
              <MenuItem value="Terlama">Terlama</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack item>
          <FormControl sx={{ borderRadius: "4px" }} size="small">
            <Box
              display="flex"
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Box>
                <OutlinedInput
                  type="date"
                  sx={{
                    borderRadius: "10px",
                    width: "156px",
                    height: "42px",
                    backgroundColor: "white",
                    marginRight: "16px",
                  }}
                  placeholder="Cari nama obat"
                  onChange={startDateHandle}
                  value={startDate}
                />
              </Box>
              <Box>
                <OutlinedInput
                  type="date"
                  sx={{
                    borderRadius: "10px",
                    width: "156px",
                    height: "42px",
                    backgroundColor: "white",
                    marginRight: "16px",
                  }}
                  placeholder="Cari nama obat"
                  onChange={endDateHandle}
                  value={endDate}
                />
              </Box>
              <Button>
                <SearchIcon
                  htmlColor="gray"
                  onClick={searchDateButton}
                  sx={{
                    ":hover": {
                      cursor: "pointer",
                    },
                  }}
                />
              </Button>
            </Box>
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

      {transaction.length ? (
        renderTransaction()
      ) : (
        <Typography>No Transaction Added</Typography>
      )}
    </Container>
  );
};

export default Transaction;
