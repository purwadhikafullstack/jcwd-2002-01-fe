import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { MdClose, MdOutlineNavigateBefore } from "react-icons/md";

const TemplateModal = ({
  children,
  open,
  handleClose,
  handleBack,
  isiButton,
  isMethod = false,
  totalPrice,
  selectPaymentMethod,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 600,
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 2,
        }}
      >
        <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
          {isMethod ? (
            <Box sx={{ position: "absolute", left: "0px", top: "0px" }}>
              <IconButton onClick={handleBack}>
                {<MdOutlineNavigateBefore />}
              </IconButton>
            </Box>
          ) : undefined}
          <Box sx={{ position: "absolute", right: "0px", top: "0px" }}>
            <IconButton onClick={handleClose}>{<MdClose />}</IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pt: "5px",
            }}
          >
            <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
              Metode Pembayaran
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "82px",
                width: "444px",
                my: "24px",
                p: "18px 20px",
                boxShadow:
                  "0px 2px 3px 2px rgba(33, 51, 96, 0.02), 0px 4px 12px 4px rgba(0, 155, 144, 0.08)",
                borderRadius: "8px",
              }}
            >
              <Box>
                <Typography fontSize="14px" color="#4F618E">
                  Total Harga
                </Typography>
                <Typography fontSize="20px" fontWeight="700">
                  Rp. {totalPrice?.toLocaleString()}
                </Typography>
              </Box>
              <Typography fontSize="12px" color="brand.500">
                Lihat Detail
              </Typography>
            </Box>
            <Box sx={{ width: "100%", height: "400px" }}>
              <Divider sx={{ width: "100%" }} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                {children}
                <Box sx={{ p: 2 }}>
                  <Button
                    variant="contained"
                    disabled={isMethod ? false : true}
                    sx={{ width: "100%" }}
                    onClick={() => {
                      handleClose();
                      selectPaymentMethod();
                    }}
                  >
                    {isiButton}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default TemplateModal;
