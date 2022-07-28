import {Box, Paper, Typography} from "@mui/material";
import Image from "next/image"
import Clipboard from "../assets/clipboard.png";
import Meds from "../assets/meds.png";
import Car from "../assets/car.png";

const BannerJaminan = () => {
  return (
    <Box mt="48px" mb="110px">
      <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>Jaminan Untuk Anda</Typography>
    
      <Box>
        <Box>
            <Box  sx={{display: {xs: "block",md: "flex",}, height: "212px",}}>
              <Box 
                sx={{
                mt: "32px",
                display: {
                xs: "block",
                md: "flex",
                },
              }}
              >
                <Box>
                  <Box>
                  <Paper 
                      sx={{
                      mx: "8px",
                      height: "181px",
                      backgroundColor: "#F6FAFB",
                      display: "flex",
                      alignItems: "center",
                        }}
                      elevation={1}>
                        <Box 
                          display="flex"
                          height="100%"
                          justifyContent="center"
                          alignItems="center"
                          ml="46px">
                        <Image src={Meds} width="200px" height="200px" objectFit="scale-down"/> 
                        </Box>
                        <Box mx="45px">
                        <Typography variant="subtitle1" fontWeight="bold">
                        100 % Obat Asli
                        </Typography> 
                        <Typography variant="body2">Semua produk yang kami jual dijamin asli  & kualitas terbaik untuk anda.</Typography>
                        </Box>
                  </Paper>
                  </Box>
                </Box>

                <Box>
                <Box>
                  <Paper
                    sx={{
                    mx: "8px",
                    height: "181px",
                    backgroundColor: "#F6FAFB",
                    display: "flex",
                    alignItems: "center",
                      }}
                    elevation={1}>
                      <Box 
                          display="flex"
                          height="100%"
                          justifyContent="center"
                          alignItems="center"
                          ml="46px">
                      <Image src={Clipboard} width="200px" height="200px" objectFit="scale-down"/> 
                      </Box>
                      <Box mx="45px">
                      <Typography variant="subtitle1" fontWeight="bold">
                      Dijamin Hemat
                      </Typography>
                      <Typography variant="body2">Kami menjamin akan mengembalikan uang dari selisih perbedaan harga.</Typography>
                      </Box>
                  </Paper>
                </Box>
                </Box>

                <Box>
                <Box>
                  <Paper
                    sx={{
                    mx: "8px",
                    height: "181px",
                    backgroundColor: "#F6FAFB",
                    display: "flex",
                    alignItems: "center",
                      }}
                    elevation={1}>
                    <Box 
                          display="flex"
                          height="100%"
                          justifyContent="center"
                          alignItems="center"
                          ml="46px">
                    <Image 
                      src={Car} width="200px" height="200px" objectFit="scale-down"/> 
                    </Box>
                    <Box mx="45px">
                    <Typography variant="subtitle1" fontWeight="bold">
                    Gratis Ongkir
                    </Typography>
                    <Typography variant="body2">Tak perlu antre, Kami kirim ke alamat Anda bebas biaya ongkos kirim!</Typography>
                    </Box>
                  </Paper>
                </Box>
                </Box>

              </Box>

            </Box>
      </Box>  

    </Box>  
    </Box>
    )
}

export default BannerJaminan;
