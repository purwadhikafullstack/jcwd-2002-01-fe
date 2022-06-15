import {
  Box,
  Container,
  FormControl,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import TransactionCard from "components/admin/TransactionCard";

const Transaction = () => {
  return (
    <>
      <Box sx={{ p: "20px" }}>
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
    </>
  );
};

export default Transaction;
