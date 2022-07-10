import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, quantityHandler } from "redux/reducers/cart";
import * as Yup from "yup";

const StockButton = ({ quantity, id, setQuantity, editQuantity }) => {
  const [counter, setCounter] = useState(quantity);
  const dispatch = useDispatch();

  const qtyHandler = (status, values) => {
    if (status === "increment") {
      if (counter === "") {
        return;
      }
      if (counter >= 10) return;
      setCounter(counter + 1);
      dispatch(quantityHandler({ id, type: "increment", quantity: 1 }));
      editQuantity("increment")
      
    } else if (status === "decrement") {
      if (counter < 1) return;

      setCounter(counter - 1);
      dispatch(quantityHandler({ id, type: "decrement", quantity: 1 }));
      editQuantity("decrement")
    }
  };

  useEffect(() => {
    setQuantity(counter)
  }, [counter])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        maxWidth: 180,
        borderRadius: 3,
      }}
    >
      <Button
        onClick={() => qtyHandler("decrement", quantity)}
        disabled={counter == 0}
        variant="outlined"
        sx={{
          border: 0,
          fontWeight: "bold",
          "&:hover": {
            border: 0,
          },
          ":disabled": {
            border: "none",
          },
        }}
      >
        -
      </Button>
      <Typography
        sx={{
          border: 0,
          color: "brand.500",
          width: "50px",
          textAlign: "center",
        }}
      >
        {counter}
      </Typography>
      <Button
        onClick={() => qtyHandler("increment", quantity)}
        variant="outlined"
        sx={{
          border: 0,
          fontWeight: "bold",
          "&:hover": {
            border: 0,
          },
        }}
      >
        +
      </Button>
    </Box>
  );
};

export default StockButton;
