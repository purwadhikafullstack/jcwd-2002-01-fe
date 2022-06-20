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

const Transaction = () => {
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
              value="2"
              autoWidth
              displayEmpty
            >
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
          <Pagination component="div" count={10} />
        </Box>
      </Box>

      <TransactionCard></TransactionCard>
      <TransactionCard></TransactionCard>
      <TransactionCard></TransactionCard>
      <TransactionCard></TransactionCard>
      <TransactionCard></TransactionCard>
      <TransactionCard></TransactionCard>
      <TransactionCard></TransactionCard>
      <TransactionCard></TransactionCard>
      <TransactionCard></TransactionCard>
    </Container>
  );
};

export default Transaction;
