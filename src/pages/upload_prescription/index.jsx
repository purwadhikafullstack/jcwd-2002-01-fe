import { Alert, Box, Snackbar, Typography } from "@mui/material";
import Dropzone from "components/Dropzone";
import Footer from "components/Footer";
import axiosInstance from "configs/api";
import { useRouter } from "next/router";
import { useState } from "react";

const uploadPrescriptionPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [severity, setSeverity] = useState();
  const router = useRouter();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };

  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const uploadPrescription = async () => {
    const formData = new FormData();

    formData.append("prescription_image_file", selectedFile);

    setTimeout(async () => {
      try {
        const res = await axiosInstance.post("/transactions", formData);
        router.push("/");

        if (res?.data?.message !== undefined) {
          setAlertContent("upload prescription success");
          setAlert(true);
          setSeverity(true);
        }
      } catch (err) {
        setAlertContent(err?.response?.data?.message);
        setAlert(true);
        setSeverity(false);
        console.log(err);
      }
    }, 3000);
  };

  return (
    <>
      {alert ? (
        <Snackbar
          open={alert}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert variant="filled" severity={severity ? "success" : "error"}>
            {alertContent}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box sx={{ width: "700px" }}>
          <Typography fontSize="24px" fontWeight="700" sx={{ my: "50px" }}>
            Kirim Resep
          </Typography>
          <Dropzone
            isResep={true}
            onDrop={onDrop}
            prescriptionImage={selectedFile}
            upload={() => uploadPrescription()}
            setPrescriptionImage={setSelectedFile}
          />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default uploadPrescriptionPage;
