import { Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { getDatasetDetails } from "../../../Services/QfService";
import MaterialReactTable from "material-react-table";
import { postData } from "./ApiDatasetData";
import useHead from "../../../hooks/useHead";
import { updateApiOrder } from "../../../Services/QfService";
export let getData;

function APiListDrawer({ setSelectedApi, datasetId, testcaseId }) {
  let [Api, setApi] = useState([]);
  let [ApiId, setApiId] = useState(0);
  let [tempApi, setTempApi] = useState([]);
  const { setSnackbarData } = useHead();

  const columns = useMemo(
    () => [
      {
        accessorKey: "locators",
        header: " ",
        Cell: ({ cell, column, row, table }) => {
          return (
            <div
              style={{
                cursor: "pointer",
                backgroundColor: row.original.api_id === ApiId ? "#e8edf2" : "",
              }}
              onClick={(e) => {
                setApiId(row.original.api_id);
                setSelectedApi({ ...row.original });
              }}
            >
              <h4>{row.original.api_name}</h4>
              <h5>{row.original.api_description}</h5>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ApiId]
  );

  useEffect(() => {
    getDatasetDetails(setApi, datasetId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getData = [...Api];
    let api_order = [];
    getData?.forEach((element) => {
      api_order.push(element.api_id);
    });
    postData.apis_order = api_order;
    if (Api[0] !== undefined) {
      setSelectedApi(Api[0]);
      setApiId(Api[0].api_id);
    }
    setTempApi([...Api]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Api]);

  return (
    <div>
      <Typography
        align="center"
        m={2}
        sx={{ backgroundColor: "#e8edf2", padding: "10px", color: "002980" }}
      >
        List of Api
      </Typography>

      {tempApi !== undefined && (
        <MaterialReactTable
          columns={columns}
          data={tempApi}
          enableColumnActions={false}
          enablePagination={false}
          initialState={{ density: "compact" }}
          enableToolbarInternalActions={false}
          muiTableBodyRowProps={{ hover: false }}
          enableRowOrdering
          enableSorting={false}
          enableTopToolbar={false}
          enableBottomToolbar={false}
          muiTableBodyRowDragHandleProps={({ table }) => ({
            onDragEnd: () => {
              const { draggingRow, hoveredRow } = table.getState();
              if (hoveredRow && draggingRow) {
                let x = [...tempApi];
                x.splice(hoveredRow.index, 0, draggingRow.original);
                x.splice(draggingRow.index + 1, 1);
                let data = {
                  testcaseId: testcaseId,
                  api_ids: [],
                };
                data.api_ids = x?.map((api) => api.api_id);
                updateApiOrder(data).then((res) => {
                  setTempApi([...x]);
                  setSnackbarData({
                    status: true,
                    message: res.message,
                    severity: "success",
                  });
                });
              }
            },
          })}
          muiTablePaperProps={{
            elevation: 0,
          }}
        />
      )}
    </div>
  );
}

export default APiListDrawer;
