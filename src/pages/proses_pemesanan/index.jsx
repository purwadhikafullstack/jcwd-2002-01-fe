import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import DaftarPemesananCard from "components/DaftarPemesananCard";
import Footer from "components/Footer";
import TabPanel from "components/TabPanel";
import axiosInstance from "configs/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { FaUserCircle, FaListUl } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdLocationOn, MdPayments } from "react-icons/md";
import { RiHeartFill } from "react-icons/ri";
import { useSelector } from "react-redux";

const ProsesPemesanan = () => {
  const router = useRouter();
  const [tabMenu, setTabMenu] = useState(0);
  const [userTransaction, setUserTransaction] = useState([]);
  const [sortBy, setSortBy] = useState(router.query._sortyBy);
  const [sortDir, setSortDir] = useState(router.query._sortyDir);
  const [status, setStatus] = useState("");
  const userSelector = useSelector(state => state.auth)

  const handleTabMenu = (event, newValue) => {
    setTabMenu(newValue);
  };

  const fetchUserTransaction = async () => {
    try {
      const res = await axiosInstance.get("/users/transaction", {
        params: {
          _limit: 3,
          selected_status: status || undefined,
          _sortBy: sortBy || undefined,
          _sortDir: sortDir || undefined,
        },
      });

      setUserTransaction(res.data.result.rows);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserTransaction();
  });

  const renderTransactionList = () => {
    return userTransaction.map((val) => {
      return (
        <DaftarPemesananCard
          status={val.status_transaction}
          name={val.TransactionItems[0].Product.name}
          image={val.TransactionItems[0].Product.Product_images[0].image_url}
          price={val.TransactionItems[0].Product.price}
          date={val.createdAt}
          valid_until={val.valid_until}
        />
      );
    });
  };



  return (
    <Box>
      <Container maxWidth="xl">
        <Grid container spacing={1} sx={{ mt: "30px" }}>
          <Grid
            item
            sm={3}
            md={3}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "300px",
                height: "484px",
                boxShadow: "0px 2px 3px 2px #E8F6FC, 0px 4px 12px 4px #E8F6FC",
                borderRadius: "8px",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", p: "28px 40px" }}
              >
                <Avatar
                  src={
                    userSelector?.profile_image || "/static/images/avatar/1.jpg"
                  }
                  sx={{ mr: "28px" }}
                  alt={userSelector.username}
                />
                <Typography fontWeight="700">
                  {userSelector.username}
                </Typography>
              </Box>
              <Divider variant="fullWidth" />
              <Box height="380px" sx={{ px: 4, py: 2 }}>
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ mr: "20px" }}>
                      <FaUserCircle />
                    </Box>
                    <Link href="/profile">
                      <Typography
                        sx={{
                          ":hover": {
                            cursor: "pointer",
                          },
                        }}
                      >
                        Profile
                      </Typography>
                    </Link>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ mr: "20px" }}>
                      <FaListUl />
                    </Box>
                    <Typography>Proses Pemesanan</Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ mr: "20px" }}>
                      <MdPayments />
                    </Box>
                    <Typography>Metode Pembayaran</Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ mr: "20px" }}>
                      <MdLocationOn />
                    </Box>
                    <Typography>Alamat Pengiriman</Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ mr: "20px" }}>
                      <RiHeartFill />
                    </Box>
                    <Typography>Wishlist</Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ mr: "20px" }}>
                      <IoMdMail />
                    </Box>
                    <Typography>Proses Bantuan</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            sm={9}
            md={9}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "900px",
                minHeight: "600px",
                boxShadow: "0px 2px 3px 2px #E8F6FC, 0px 4px 12px 4px #E8F6FC",
                p: "28px 40px",
                borderRadius: "8px",
              }}
            >
              <Typography fontWeight="700" sx={{ mb: "20px" }}>
                Daftar Pemesan
              </Typography>
              <Tabs
                variant="fullWidth"
                onChange={handleTabMenu}
                value={tabMenu}
                centered
                sx={{
                  ".MuiTabs-indicator": {
                    backgroundColor: "brand.500",
                    color: "brand.500",
                  },
                }}
              >
                <Tab
                  label="Semua"
                  sx={{ textTransform: "none" }}
                  onClick={() => setStatus("")}
                />
                <Tab
                  label="Menunggu"
                  sx={{ textTransform: "none" }}
                  onClick={() => setStatus("waiting for confirmation")}
                />
                <Tab
                  label="Diproses"
                  sx={{ textTransform: "none" }}
                  onClick={() => setStatus("ready delivery")}
                />
                <Tab
                  label="Dikirim"
                  sx={{ textTransform: "none" }}
                  onClick={() => setStatus("on delivery")}
                />
                <Tab
                  label="Selesai"
                  sx={{ textTransform: "none" }}
                  onClick={() => setStatus("success")}
                />
                <Tab
                  label="Dibatalkan"
                  sx={{ textTransform: "none" }}
                  onClick={() => setStatus("canceled")}
                />
              </Tabs>
              <Box
                direction="row"
                spacing="10px"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack
                  direction="row"
                  spacing="15px"
                  sx={{ alignItems: "center", mt: "15px", mb: "10px" }}
                >
                  <Typography>Jenis Obat</Typography>
                  <Button variant="outlined" sx={{ borderRadius: "50px" }}>
                    Semua Obat
                  </Button>
                  <Button variant="outlined" sx={{ borderRadius: "50px" }}>
                    Obat Resep
                  </Button>
                  <Button variant="contained" sx={{ borderRadius: "50px" }}>
                    Obat Bebas
                  </Button>
                </Stack>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ mr: "10px" }}>Urutkan</Typography>{" "}
                  <Select size="small" sx={{ width: "137px" }}>
                    <MenuItem>Terbaru</MenuItem>
                  </Select>
                </Box>
              </Box>
              <TabPanel value={tabMenu} index={0}>
                {userTransaction.length !== 0 ? (
                  renderTransactionList()
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                    }}
                  >
                    Tidak ada Item
                  </Box>
                )}
              </TabPanel>
              <TabPanel value={tabMenu} index={1}>
                {userTransaction.length !== 0 ? (
                  renderTransactionList()
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                    }}
                  >
                    Tidak ada Item
                  </Box>
                )}
              </TabPanel>
              <TabPanel value={tabMenu} index={2}>
                {userTransaction.length !== 0 ? (
                  renderTransactionList()
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                    }}
                  >
                    Tidak ada Item
                  </Box>
                )}
              </TabPanel>
              <TabPanel value={tabMenu} index={3}>
                {userTransaction.length !== 0 ? (
                  renderTransactionList()
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                    }}
                  >
                    Tidak ada Item
                  </Box>
                )}
              </TabPanel>
              <TabPanel value={tabMenu} index={4}>
                {userTransaction.length !== 0 ? (
                  renderTransactionList()
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                    }}
                  >
                    Tidak ada Item
                  </Box>
                )}
              </TabPanel>
              <TabPanel value={tabMenu} index={5}>
                {userTransaction.length !== 0 ? (
                  renderTransactionList()
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                    }}
                  >
                    Tidak ada Item
                  </Box>
                )}
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default ProsesPemesanan;
