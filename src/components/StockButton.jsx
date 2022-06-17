import { Box, Button, ButtonGroup } from "@mui/material";
import { useState } from "react";

const StockButton = () => {
  const [counter, setCounter] = useState(0);

  return (
    <Box>
      <ButtonGroup
        size="small"
        variant="text"
        sx={{ backgroundColor: "#EDF6FF"}}
      >
        <Button
          disabled={counter <= 0}
          onClick={() => {
            setCounter(counter - 1);
          }}
        >
          -
        </Button>

        <Button disabled>{counter}</Button>

        <Button
          disabled={counter >= 10}
          onClick={() => {
            setCounter(counter + 1);
          }}
        >
          +
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default StockButton;
