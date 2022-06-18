import { Box, Button, Container } from "@mui/material";
import TableData from "components/admin/TableData";

const columns = [
  { field: "id", headerName: "No", width: 70 },
  { field: "namaObat", headerName: "Nama Obat", width: 130 },
  { field: "noObat", headerName: "No Obat", width: 130 },
  {
    field: "noBpom",
    headerName: "No.BPOM",
    width: 130,
  },
  {
    field: "kategori",
    headerName: "Kategori",
    sortable: false,
    width: 130,
  },
  { field: "stok", headerName: "Stok", width: 90, type: "number" },
  { field: "satuan", headerName: "Satuan", width: 130, sortable: false },
  { field: "nilaiBarang", headerName: "Nilai Barang", width: 130 },
  { field: "nilaiJual", headerName: "Nilai Jual", width: 130 },
  {
    field: "atur",
    headerName: "Atur",
    width: 130,
    renderCell: () => {
      return <Button variant="outlined">Lihat Detail</Button>;
    },
  },
];

const rows = [
  {
    id: 1,
    namaObat: "Adem Sari",
    noObat: "A000321",
    noBpom: "B000521",
    kategori: "Obat Bebas",
    stok: 20,
    satuan: "Box",
    nilaiBarang: "Rp. 15.000",
    nilaiJual: "Rp. 44.000",
  },
  {
    id: 2,
    namaObat: "Adem Sari",
    noObat: "A000321",
    noBpom: "B000521",
    kategori: "Obat Bebas",
    stok: 10,
    satuan: "Box",
    nilaiBarang: "Rp. 15.000",
    nilaiJual: "Rp. 44.000",
  },
  {
    id: 4,
    namaObat: "Adem Sari",
    noObat: "A000321",
    noBpom: "B000521",
    kategori: "Obat Bebas",
    stok: 15,
    satuan: "Box",
    nilaiBarang: "Rp. 15.000",
    nilaiJual: "Rp. 44.000",
  },
  {
    id: 5,
    namaObat: "Adem Sari",
    noObat: "A000321",
    noBpom: "B000521",
    kategori: "Obat Bebas",
    stok: 20,
    satuan: "Box",
    nilaiBarang: "Rp. 15.000",
    nilaiJual: "Rp. 44.000",
  },
  {
    id: 6,
    namaObat: "Adem Sari",
    noObat: "A000321",
    noBpom: "B000521",
    kategori: "Obat Bebas",
    stok: 10,
    satuan: "Box",
    nilaiBarang: "Rp. 15.000",
    nilaiJual: "Rp. 44.000",
  },
  {
    id: 7,
    namaObat: "Adem Sari",
    noObat: "A000321",
    noBpom: "B000521",
    kategori: "Obat Bebas",
    stok: 15,
    satuan: "Box",
    nilaiBarang: "Rp. 15.000",
    nilaiJual: "Rp. 44.000",
  },
  {
    id: 8,
    namaObat: "Adem Sari",
    noObat: "A000321",
    noBpom: "B000521",
    kategori: "Obat Bebas",
    stok: 20,
    satuan: "Box",
    nilaiBarang: "Rp. 15.000",
    nilaiJual: "Rp. 44.000",
  },
  {
    id: 9,
    namaObat: "Adem Sari",
    noObat: "A000321",
    noBpom: "B000521",
    kategori: "Obat Bebas",
    stok: 10,
    satuan: "Box",
    nilaiBarang: "Rp. 15.000",
    nilaiJual: "Rp. 44.000",
  },
  {
    id: 10,
    namaObat: "Adem Sari",
    noObat: "A000321",
    noBpom: "B000521",
    kategori: "Obat Bebas",
    stok: 15,
    satuan: "Box",
    nilaiBarang: "Rp. 15.000",
    nilaiJual: "Rp. 44.000",
  },
  {
    id: 11,
    namaObat: "Adem Sari",
    noObat: "A000321",
    noBpom: "B000521",
    kategori: "Obat Bebas",
    stok: 20,
    satuan: "Box",
    nilaiBarang: "Rp. 15.000",
    nilaiJual: "Rp. 44.000",
  },
  {
    id: 12,
    namaObat: "Adem Sari",
    noObat: "A000321",
    noBpom: "B000521",
    kategori: "Obat Bebas",
    stok: 10,
    satuan: "Box",
    nilaiBarang: "Rp. 15.000",
    nilaiJual: "Rp. 44.000",
  },
  {
    id: 13,
    namaObat: "Adem Sari",
    noObat: "A000321",
    noBpom: "B000521",
    kategori: "Obat Bebas",
    stok: 15,
    satuan: "Box",
    nilaiBarang: "Rp. 15.000",
    nilaiJual: "Rp. 44.000",
  },
];
const Products = () => {
  return (
    <Box
      sx={{
        p: "20px",
        height: 400,
        width: "100%",
        marginTop: "32px",
      }}
    >
      <TableData columns={columns} rows={rows}></TableData>
    </Box>
  );
};

export default Products;
