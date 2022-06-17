import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import fotoObat from "assets/panadol.jpg";
import StockButton from "./StockButton";
import { HiTrash } from "react-icons/hi";

const CartCard = () => {
  return (
    <Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: "20px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel
              sx={{}}
              control={<Checkbox />}
              label={<Image width="86px" height="86px" src={fotoObat} />}
            />
            <Box>
              <Typography fontSize="16px">Panadol Merah PDI</Typography>
              <Typography fontSize="12px">1 strip</Typography>
            </Box>
          </Box>
          <Typography textAlign="right">Rp. 13.000</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            height: "30px",
          }}
        >
          <Typography
            sx={{
              color: "brand.500",
              fontSize: "14px",
              fontWeight: "400",
              ":hover": {
                cursor: "pointer",
                textDecoration: "underline",
              },
            }}
          >
            Pindahkan ke WishList
          </Typography>
          <Divider orientation="vertical" sx={{ mx: "20px" }} />
          <IconButton sx={{mr: "25px", color: "brand.500"}}>{<HiTrash />}</IconButton>

          <StockButton />
        </Box>
      </Box>
    </Box>
  );
};

export default CartCard;
