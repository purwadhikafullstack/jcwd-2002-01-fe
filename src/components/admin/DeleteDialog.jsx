import axiosInstance from "configs/api";

const {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} = require("@mui/material");

const DeleteDialog = ({ open, handleClose, data }) => {

  const deleteProduct = async () => {
    try {
      const res = await axiosInstance.delete(
        `products/product/${data.productId}`
      );
      handleClose();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog open={open} handleClose={handleClose}>
      <DialogTitle>Alert</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Produk {data.namaObat} ini akan terhapus secara permanen. Apakah Anda
          yakin ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Kembali
        </Button>
        <Button variant="contained" onClick={deleteProduct} autoFocus>
          Yakin
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;