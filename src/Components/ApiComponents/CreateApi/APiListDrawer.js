import { Button, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useMemo, useState } from "react";
import { getDatasetDetails } from "../../../Services/ApiService";
import MaterialReactTable from "material-react-table";

import { postData } from "./ApiDatasetData";
export let getData;

function APiListDrawer({ setSelectedApi, datasetId }) {
  let [showApi, setShowApi] = useState(true);
  let [Api, setApi] = useState([]);
  let [ApiId, setApiId] = useState(0);
  let [tempApi, setTempApi] = useState([]);
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
    []
  );

  useEffect(() => {
    getDatasetDetails(setApi, datasetId);
  }, []);

  useEffect(() => {
    getDatasetDetails(setApi, datasetId);
  }, []);

  useEffect(() => {
    getData = [...Api];
    let api_order = [];
    getData?.forEach((element) => {
      api_order.push(element.api_id);
    });
    postData.apis_order = api_order;
    console.log(Api[0]);
    if (Api[0] !== undefined) {
      setSelectedApi(Api[0]);
      setApiId(Api[0].api_id);
    }
    setTempApi([...Api]);
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
      {/* {Api?.map(s => {
                return (
                    <Stack
                        mt={1}
                        ml={1}
                        sx={{
                            backgroundColor: ApiId == s.api_id ? "#e8edf2" : "",
                            cursor: "pointer",
                        }}
                        onClick={e => {
                            console.log(s.api_id)
                            setApiId(s.api_id)
                            setSelectedApi({ ...s })
                        }}

                    >
                        <Typography variant="p" sx={{ fontWeight: "bold" }}>
                            {s.api_name}
                        </Typography>
                        <Typography variant="caption">{s.api_description}</Typography>
                        <Divider />
                    </Stack>
                );
            })} */}





            {tempApi != undefined && <MaterialReactTable

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
                            let x = [...tempApi]
                            x.splice(hoveredRow.index, 0, draggingRow.original)
                            x.splice(draggingRow.index + 1, 1)
                            setTempApi([...x])
                        }
                    },
                })}
                muiTablePaperProps={{
                    elevation: 0,
                }}
            />}
        </div>
    )
}

export default APiListDrawer;
