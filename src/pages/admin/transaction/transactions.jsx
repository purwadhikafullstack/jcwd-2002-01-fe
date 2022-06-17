import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import TransactionCard from "components/admin/TransactionCard";

const Transaction = () => {
  return (
    <Container sx={{ m: "32px" }}>
      <Box>
        <Typography sx={{ fontWeight: "700", fontSize: "20px" }}>
          Semua Pesanan
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "32px",
        }}
      >
        <Box>
          <FormControlLabel control={<Checkbox />} label="Pilih Semua" />
        </Box>
        <Box display="flex" sx={{ alignItems: "center" }}>
          <Typography sx={{ mr: "5px" }}>Kartu per halaman</Typography>
          <FormControl>
            <Select value={2}>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
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
