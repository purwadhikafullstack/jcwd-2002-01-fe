import { Box, Checkbox, Divider, FormControlLabel } from "@mui/material";

const ProductCheckoutContainer = ({cardTitle, children}) => {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "258px",
          boxShadow:
            "0px 2px 3px 2px #E8F6FC, 0px 8px 12px 4px rgba(0, 155, 144, 0.08)",
          borderRadius: "8px",
          p: "28px 40px",
        }}
      >
        {cardTitle}
        <Divider sx={{my: "12px"}} />
        {children}
      </Box>
    );
}

export default ProductCheckoutContainer