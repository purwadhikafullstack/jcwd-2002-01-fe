import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ProfitCard = () => {
  return (
    <Box
      sx={{
        padding: "20px",
        width: "537px",
        height: "380px",
        bgcolor: "#FFFFFF",
        borderRadius: "10px",
      }}
    >
      <Box
        display="flex"
        sx={{ justifyContent: "space-between", alignContent: "center" }}
      >
        <Box>
          <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
            Profit
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#737A8D" }}>
            Data dinyatakan dalam jutaan rupiah
          </Typography>
        </Box>
        <FormControl sx={{ marginRight: "16px" }}>
          <Select
            sx={{
              borderRadius: "10px",
              minWidth: "141px",
              height: "24px",
              backgroundColor: "white",
            }}
            value="Mingguan"
            displayEmpty
            autoWidth
          >
            <MenuItem value="Obat Bebas">Mingguan</MenuItem>
            <MenuItem value="Obat Resep">Bulanan</MenuItem>
            <MenuItem value="Obat Bebas">Tahunan</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Chart
        series={[
          {
            name: "sales",
            data: [
              {
                x: "2019/01/01",
                y: 400,
              },
              {
                x: "2019/04/01",
                y: 430,
              },
              {
                x: "2019/07/01",
                y: 448,
              },
              {
                x: "2019/10/01",
                y: 470,
              },
              {
                x: "2020/01/01",
                y: 540,
              },
              {
                x: "2020/04/01",
                y: 580,
              },
              {
                x: "2020/07/01",
                y: 690,
              },
            ],
          },
        ]}
        options={{
          xaxis: {
            categories: [
              "Senin",
              "Selasa",
              "Rabu",
              "Kamis",
              "Jumat",
              "Sabtu",
              "Minggu",
            ],
          },
        }}
        type="bar"
        height="100%"
      />
    </Box>
  );
};

export default ProfitCard;
