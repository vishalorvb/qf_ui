import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useState } from "react";
import { GridToolbarQuickFilter, GridLinkOperator } from "@mui/x-data-grid";

export default function Table(props) {
  const {
    rows,
    columns,
    checkboxSelection,
    selectionModel,
    setSelectionModel,
    getRowId,
    hideSearch,
    setNewchangedElement,
    hideheaderCheckbox,
    searchPlaceholder,
  } = props;
  function QuickSearchToolbar() {
    return (
      <GridToolbarQuickFilter
        placeholder={searchPlaceholder || "Search..."}
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

  const [pagesize, setPagesize] = useState(10);
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
        hideFooter={rows?.length < 11 ? true : false}
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
          "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
            {
              display: hideheaderCheckbox && "none",
            },
            overflow: "hidden",
            
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
          setSelectionModel((ps) => {
            if (setNewchangedElement) {
              const changedElement =
                i.length > ps.length
                  ? i.find((e) => !ps.includes(e))
                  : ps.find((e) => !i.includes(e));
              setNewchangedElement({
                id: changedElement,
                added: i.length > ps.length,
              });
            }
            return i;
          });
        }}
        selectionModel={selectionModel}
        components={{ Toolbar: !hideSearch && QuickSearchToolbar }}
        {...props}
      />
    </div>
  );
}
