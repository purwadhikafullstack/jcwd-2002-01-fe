const {
  Modal,
  Stack,
  Box,
  Typography,
  FormControl,
  Grid,
  FormLabel,
  Select,
  MenuItem,
  Button,
  OutlinedInput,
  FormHelperText,
  Divider,
} = require("@mui/material");
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "configs/api";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

const ModalAddStock = ({ open, handleClose }) => {
  const [kuantitas, setKuantitas] = useState(0);
  const [orderDate, setOrderDate] = useState("");
  const [productList, setProductList] = useState();
  const dateHandle = (event) => {
    setOrderDate(event.target.value);
  };

  const increaseAmount = () => {
    setKuantitas((prev) => prev + 1);
  };

  const decreaseAmount = () => {
    if (kuantitas < 2) {
      setKuantitas(1);
    }
    setKuantitas((prev) => prev - 1);
  };

  const formik = useFormik({
    initialValues: {
      productName: "",
      quantity: kuantitas,
      expired_date: orderDate,
      purchasePrice: 0,
    },
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  //   const fetchProduct = async () => {
  //     try {
  //       const res = await axiosInstance.get("/products/ambilproduct");
  //       const data = res?.data?.result;
  //       setProductList(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchProduct();
  //   }, []);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 5,
        }}
      >
        <Box display="flex" justifyContent="space-between" marginBottom="30px">
          <Typography fontSize="20px" fontWeight="bold">
            Tambah Stock
          </Typography>
          <CloseIcon
            onClick={() => {
              handleClose();
            }}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          />
        </Box>

        <Stack spacing={2}>
          <FormControl sx={{ borderRadius: "4px" }}>
            <Grid container>
              <Grid item xs={4}>
                <FormLabel
                  sx={{
                    fontSize: "14px",
                    color: "black",
                  }}
                >
                  Nama Produk
                </FormLabel>
              </Grid>
              <Grid item xs={8}>
                <Select
                  sx={{
                    backgroundColor: "white",
                    height: "36px",
                    minWidth: "226px",
                  }}
                  onChange={(e) => {
                    formik.setFieldValue("productName", e.target.value);
                  }}
                  value={formik.values.productName}
                  autoWidth
                  //   displayEmpty
                >
                  <MenuItem disabled value="Select">
                    Select
                  </MenuItem>
                  {/* {productList?.map((val) => {
                    return <MenuItem value={val.name}>{val.name}</MenuItem>;
                  })} */}
                  <MenuItem value="amoxilin">amoxilin</MenuItem>;
                </Select>
              </Grid>
            </Grid>
          </FormControl>

          <FormControl sx={{ borderRadius: "4px" }}>
            <Grid container>
              <Grid item xs={4}>
                <FormLabel
                  sx={{
                    fontSize: "14px",
                    color: "black",
                  }}
                >
                  Kuantitas
                </FormLabel>
              </Grid>
              <Grid item xs={8}>
                <Stack direction="row">
                  <Box
                    display="flex"
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Button onClick={decreaseAmount}>-</Button>
                    <Typography fontSize="16px" marginX="2px">
                      {kuantitas}
                    </Typography>
                    <Button onClick={increaseAmount}>+</Button>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </FormControl>

          <FormControl sx={{ borderRadius: "4px" }}>
            <Grid container>
              <Grid item xs={4}>
                <FormLabel
                  sx={{
                    fontSize: "14px",
                    color: "black",
                  }}
                >
                  Harga Jual
                </FormLabel>
              </Grid>
              <Grid item xs={8}>
                <OutlinedInput
                  onChange={(event) =>
                    formik.setFieldValue("purchasePrice", event.target.value)
                  }
                  sx={{ height: "32px", minWidth: "226px" }}
                  placeholder="Masukkan Harga Jual"
                  value={formik.values.purchasePrice}
                />
                {/* <FormHelperText error={true}>
                  {formik.errors.price || " "}
                </FormHelperText> */}
              </Grid>
            </Grid>
          </FormControl>

          <FormControl sx={{ borderRadius: "4px" }}>
            <Grid container>
              <Grid item xs={4}>
                <FormLabel
                  sx={{
                    fontSize: "14px",
                    color: "black",
                  }}
                >
                  Tanggal Kadaluarsa
                </FormLabel>
              </Grid>
              <Grid item xs={8}>
                <OutlinedInput
                  type="date"
                  sx={{ height: "32px", minWidth: "226px" }}
                  onChange={dateHandle}
                  value={orderDate}
                />
              </Grid>
            </Grid>
          </FormControl>
        </Stack>
        <Box sx={{ mt: 3 }}>
          <Divider orientation="horizontal" />
          <Box display="flex" justifyContent="end" padding="16px">
            <Button onClick={formik.handleSubmit} variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAddStock;
