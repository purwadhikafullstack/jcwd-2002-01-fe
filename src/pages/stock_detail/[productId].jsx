import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import TableDataStock from "components/admin/TableDataStock";
import { useEffect, useState } from "react";
import axiosInstance from "configs/api";

const StockDetail = () => {
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [rows, setRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(+event.target.value);
    setPage(0);
  };

  const fetchInventory = async () => {
    try {
      const id = router.query.productId;
      console.log(id);
      const res = await axiosInstance.get(`/products/invenroty/${id}`, {
        params: {
          _limit: rowPerPage,
          _page: page + 1,
        },
      });

      const data = res.data.result.rows;

      setTotalData(res.data.result.count);

      setRows(
        data.map((val, idx) => {
          return {
            no: idx + rowPerPage * page + 1,
            date: val.createdAt,
            activity: val?.type,
            officer: val?.Admin?.username,
            out: val.type === "available" ? 0 : val.quantity,
            in: val.type === "available" ? val.quantity : 0,
            expried_date: val?.expired_date,
          };
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (router.query.productId) {
      fetchInventory();
    }
  }, [router.query.productId, rowPerPage, page]);

  return (
    <Box
      height="100vh"
      sx={{
        background:
          "linear-gradient(90deg, rgba(191,229,247,1) 41%, rgba(232,246,252,1) 74%)",
      }}
    >
      <Box
        height="64px"
        display="flex"
        alignItems="center"
        paddingX="20px"
        paddingRight="40px"
        paddingLeft="40px"
        justifyContent="space-between"
        boxShadow={1}
        sx={{ backgroundColor: "#FFFFFF" }}
      >
        <Box display="flex" alignItems="center">
          <Link href="/admin/inventory/products">
            <IconButton>
              <ArrowBackIosNewIcon />
            </IconButton>
          </Link>
          <Typography marginLeft="25px" fontWeight="bold" variant="h6">
            Detail Obat: Actived
          </Typography>
        </Box>
        <Button
          variant="outlined"
          sx={{ width: "105px", height: "40px" }}
          startIcon={<InsertDriveFileIcon />}
        >
          Excel
        </Button>
      </Box>
      <Container maxWidth="lg">
        <Box
          sx={{
            bgcolor: "#FFFFFF",
            mt: "38px",
            borderRadius: "8px",
            height: "80vh",
            overflow: "scroll",
          }}
        >
          <Box sx={{ p: "24px" }}>
            <TableDataStock
              rows={rows}
              page={page}
              rowPerPage={rowPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              totalData={totalData}
            ></TableDataStock>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default StockDetail;
