import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useState } from "react";
import { GridToolbarQuickFilter, GridLinkOperator } from "@mui/x-data-grid";

export default function Table(props) {
  function QuickSearchToolbar() {
    return (
      <GridToolbarQuickFilter
        className="tableSearch"
        quickFilterParser={(searchInput) =>
          searchInput
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
      />
    );
  }

  // row for row data
  // columns for header details
  // hidefooter for true to hide footer

  const {
    rows,
    columns,
    checkboxSelection,
    selectionModel,
    setSelectionModel,
    getRowId,
  } = props;
  const [pagesize, setPagesize] = useState(10);
<<<<<<< HEAD

=======
>>>>>>> e73fe712e6fd60b89d23a8a2aa359ad9bf99728c
  return (
    <div className="tableParent">
      <DataGrid
        className="tableData"
        rows={rows}
        columns={columns}
        pageSize={pagesize}
        getRowId={getRowId}
        onPageSizeChange={(newPageSize) => setPagesize(newPageSize)}
        rowsPerPageOptions={[10, 20, 30]}
        rowHeight={45}
        autoHeight={true}
        disableColumnMenu
        hideFooter={rows.length < 11 ? true : false}
        showCellRightBorder
        showColumnRightBorder
        disableSelectionOnClick
        density="compact"
        checkboxSelection={
          checkboxSelection === undefined ? false : checkboxSelection
        }
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#e8edf2",
            color: "#505050",
            fontSize: 12,
          },

          [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
            {
              outline: "none",
            },
          [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
            {
              outline: "none",
            },
        }}
        initialState={{
          filter: {
            filterModel: {
              items: [],
              quickFilterLogicOperator: GridLinkOperator.Or,
            },
          },
        }}
        onSelectionModelChange={(i) => {
          setSelectionModel(i);
        }}
        selectionModel={selectionModel}
        components={{ Toolbar: QuickSearchToolbar }}
      />
    </div>
  );
}
