import {
  Box,
  Button,
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "configs/api";
import { addToCart, removefromCart } from "redux/reducers/cart";

const CartCard = ({ val, setCartChecked, checked = false, index, stock }) => {
  const userSelector = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(val.quantity);
  const dispatch = useDispatch();
  const productId = val.product_id;

  const editQuantity = async (type = "") => {
    try {
      if (type == "increment") {
        await axiosInstance.post("/cart", {
          quantity: quantity + 1,
          product_id: val.product_id,
        });
      } else if (type == "decrement") {
        await axiosInstance.post("/cart", {
          quantity: quantity - 1,
          product_id: val.product_id,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async () => {
    try {
      await axiosInstance.delete(`/cart/${productId}`);

      const res = await axiosInstance.get("/cart", {
        user_id: userSelector.id,
      });

      dispatch(removefromCart(index));
      dispatch(addToCart(res.data.result.rows));
    } catch (err) {
      console.log(err);
    }
  };

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
              control={<Checkbox onClick={setCartChecked} checked={checked} />}
              label={
                <Box
                  component="img"
                  width="86px"
                  height="86px"
                  src={val.Product?.Product_images[0]?.image_url}
                />
              }
            />
            <Box>
              <Typography fontSize="16px">{val.Product?.name}</Typography>
              <Typography fontSize="12px">1 strip</Typography>
            </Box>
          </Box>
          <Typography textAlign="right">
            Rp. {val.Product?.price?.toLocaleString()}
          </Typography>
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
          <IconButton
            onClick={() => removeItem()}
            sx={{ mr: "25px", color: "brand.500" }}
          >
            {<HiTrash />}
          </IconButton>

          <StockButton
            stock={stock}
            quantity={val?.quantity}
            editQuantity={editQuantity}
            setQuantity={setQuantity}
            id={val?.id}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CartCard;
