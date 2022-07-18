import {
  Box,
  Button,
  Divider,
  Icon,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdClose } from "react-icons/md";
import { RiImageFill } from "react-icons/ri";

const Dropzone = ({isResep, onDrop, prescriptionImage, upload, setPrescriptionImage, isUploading}) => {


  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    onDrop,
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
  });

  return (
    <>
      <Box>
        <Box
          sx={{
            width: "100%",
            height: "522px",
            boxShadow: "0px 2px 3px 2px #E8F6FC, 0px 4px 12px 4px #E8F6FC",
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            borderRadius: "8px",
            p: "60px 90px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: prescriptionImage ? "normal" : "center",
              alignItems: prescriptionImage ? "normal" : "center",
              backgroundColor: "#F6FAFB",
              width: "100%",
              height: "328px",
              border: "3px dashed #B4B9C7",
              borderRadius: "8px",
              px: "10px",
            }}
            {...getRootProps({ className: "dropzone" })}
          >
            <Input {...getInputProps()} />
            {prescriptionImage ? (
              <Box sx={{ p: "11px", m: "15px" }}>
                <Box
                  sx={{
                    width: "100%",
                    border: "1px solid #D5D7DD",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    p: "11px",
                  }}
                  key={prescriptionImage.path}
                >
                  <Box sx={{ display: "flex" }}>
                    <Icon sx={{ mr: "20px" }}>{<RiImageFill />}</Icon>
                    <Typography>
                      {prescriptionImage.name} - {(prescriptionImage.size / (1024 * 1024)).toFixed(3)} MB
                    </Typography>
                  </Box>
                  <IconButton size="small" sx={{ mr: "10px" }} onClick={() => setPrescriptionImage(null)}>
                    {<MdClose />}
                  </IconButton>
                </Box>
                <Button variant="contained" sx={{ my: "10px" }}>
                  Unggah {isResep? "Resep" : "Bukti Transfer"}
                </Button>
              </Box>
            ) : (
              <Box>
                <Typography
                  textAlign="center"
                  sx={{ color: "#B4B9C7", fontWeight: "400", fontSize: "24px" }}
                >
                  {`Tarik & Letakan File`}
                </Typography>
                <Divider sx={{ my: "20px", color: "#B4B9C7" }}>atau</Divider>
                <Button
                  variant="contained"
                  sx={{ width: "274px", height: "48px" }}
                  onClick={open}
                >
                  Open File Dialog
                </Button>
              </Box>
            )}
          </Box>
          <Box>
            <Button
              variant="outlined"
              sx={{ width: "125px", height: "42px", my: "20px", mr: "20px" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ width: "125px", height: "42px", my: "20px" }}
              onClick={upload}
              disabled={isUploading? true : false}
            >
              Unggah
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dropzone;
