import { Box, Pagination } from "@mui/material";
import TransactionCard from "components/admin/TransactionCard";

const Transaction = () => {
  return (
    <Box sx={{ p: "20px" }}>
      <Pagination count={10} />
      <TransactionCard></TransactionCard>
      <TransactionCard></TransactionCard>
    </Box>
  );
};

export default Transaction;
