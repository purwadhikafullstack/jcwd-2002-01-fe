import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Footer from "components/Footer";
import axiosInstance from "configs/api";
import { useEffect } from "react";
import { useState } from "react";

const shippingAddress = () => {
  const [nation, setNation] = useState("");
  const [provinsi, setProvinsi] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedCity, setSelectedCity] = useState
  const [kota, setKota] = useState([]);
  const [kecamatan, setKecamatan] = useState("");

  console.log(kota)

  const handleChange = (event) => {
    setNation(event.target.value);
  };

  const fetchProvince = async () => {
    try {
      const res = await axiosInstance.get("address/province");

      setProvinsi(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const renderProvince = () => {
    return provinsi?.map((val) => {
      return <MenuItem value={val?.province_id}>{val?.province}</MenuItem>;
    });
  };

  const fetchCity = async () => {
    try {
      const res = await axiosInstance.get(`address/city/${selectedProvince}`);

      setKota(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const renderCity = () => {
    return kota?.map((val) => {
      return <MenuItem value={val?.city_id}>{val?.city_name}</MenuItem>;
    });
  };

  useEffect(() => {
      fetchProvince();
  }, []);
  useEffect(() => {
      fetchCity()
  }, [selectedProvince]);


  return (
    <Box>
      <Container maxWidth="sm">
        <Typography
          sx={{ mb: "36px", fontSize: "24px", fontWeight: "700", mt: "90px" }}
        >
          Alamat Pengiriman
        </Typography>
        <Box sx={{ mb: "52px" }}>
          <Typography>Label Alamat</Typography>
          <TextField fullWidth size="small" placeholder="Contoh: Apartemen" />
        </Box>
        <Box>
          <Typography sx={{ mb: "36px" }}>Info Penerima</Typography>
          <Stack direction="row" spacing={2} sx={{ mb: "36px" }}>
            <TextField
              label="Nama Depan"
              id="namadepan"
              fullWidth
              size="small"
              placeholder="Jane"
            />
            <TextField
              label="Nama Belakang"
              fullWidth
              size="small"
              placeholder="Doe"
            />
          </Stack>
          <Typography>Nomor HP</Typography>
          <FormControl sx={{ mb: "36px" }}>
            <OutlinedInput
              size="small"
              id="nomerHp"
              sx={{ padding: "0px", width: "480px" }}
              startAdornment={
                <FormControl sx={{ width: "100px", mr: "10px" }}>
                  <Select size="small" value={nation} onChange={handleChange}>
                    <MenuItem value="+62">+62</MenuItem>
                    <MenuItem value="+22">+22</MenuItem>
                    <MenuItem value="+123">+12</MenuItem>
                  </Select>
                </FormControl>
              }
            ></OutlinedInput>
          </FormControl>
          <Stack direction="row" spacing={2} sx={{ mb: "36px" }}>
            <Box sx={{ width: "100%" }}>
              <Typography>Provinsi</Typography>
              <FormControl sx={{ width: "100%" }}>
                <Select size="small" onChange={(e) => setSelectedProvince(e.target.value)}>{renderProvince()}</Select>
              </FormControl>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography>Kabupaten/Kota</Typography>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  size="small"
                  
                >
                  {renderCity()}
                </Select>
              </FormControl>
            </Box>
          </Stack>
          <Box sx={{ mb: "36px" }}>
            <Typography>Kecamatan</Typography>
            <FormControl sx={{ width: "250px" }}>
              <Select
                size="small"
                value={kecamatan}
                onChange={(e) => setKecamatan(e.target.value)}
              >
                <MenuItem value="Joglo">Joglo</MenuItem>
                <MenuItem value="Palmerah">Palmerah</MenuItem>
                <MenuItem value="Ciledug">Ciledug</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mb: "36px" }}>
            <Typography>Alamat</Typography>
            <OutlinedInput sx={{ width: "100%" }} size="small" />
          </Box>
          <Box sx={{ mb: "36px" }}>
            <Typography>Kode Pos</Typography>
            <OutlinedInput size="small" />
          </Box>
          <FormControlLabel
            sx={{ mb: "36px" }}
            label="Simpan sebagai alamat utama"
            control={<Checkbox />}
          />
          <Stack direction="row" spacing={2} sx={{ mb: "36px" }}>
            <Button variant="outlined" sx={{ width: "100%" }}>
              Batalkan
            </Button>
            <Button variant="contained" sx={{ width: "100%" }} disabled>
              Simpan Alamat
            </Button>
          </Stack>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default shippingAddress;
