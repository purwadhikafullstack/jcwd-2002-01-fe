import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

const TableData = ({ rows, columns }) => {
  const [pageSize, setPageSize] = useState(5);
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      pageSize={pageSize}
      rowsPerPageOptions={[5, 10]}
      rowCount={100}
      pagination
      disableSelectionOnClick
    />
  );
};

export default TableData;
