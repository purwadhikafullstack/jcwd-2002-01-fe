import { Box, Button, Checkbox, Divider, Typography } from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";

const TransactionCard = () => {
  return (
    <Box
      sx={{
        height: "200px",
        width: "1088px",
        borderRadius: "10px",
        margin: "20px",
        padding: "5px",
        boxShadow: "0px 8px 20px -12px black",
        alignItems: "center",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box display="flex" sx={{ alignItems: "center" }}>
        <Checkbox></Checkbox>
        <Typography sx={{ fontWeight: "bold" }}> Pesanan Baru </Typography>
        <Typography sx={{ margin: "5px", color: "#B4B9C7" }}> / </Typography>
        <Typography sx={{ fontWeight: "bold" }}> HTMED29X </Typography>
        <Typography sx={{ margin: "5px", color: "#B4B9C7" }}> / </Typography>
        <AccessTimeIcon
          sx={{ fontSize: "20px", color: "#B4B9C7" }}
        ></AccessTimeIcon>
        <Typography sx={{ margin: "5px", color: "#B4B9C7" }}>
          10 Jan 2022, 10:45 WIB
        </Typography>
      </Box>
      <Divider></Divider>
      <Box display="flex" sx={{ alignItems: "center" }}>
        <Box sx={{ p: 2, m: 2, border: "2px solid grey" }}>
          <Button>Save</Button>
        </Box>
      </Box>
    </Box>
  );
};
export default TransactionCard;
