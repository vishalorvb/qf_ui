/*
**********  Vishal Kumar (4734) ********

input parameters (in State):
       ;
        testcaseId ;
        ScreenList[] ;
        Callback(selected_ScreenId) ;

Result:
        Create and update dataset of web type
*/

import { Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import axios from "axios";
import SnackbarNotify from "../../../CustomComponent/SnackbarNotify";
import { qfservice } from "../../../Environment";

export let selected_screen;

let snackbarMessage = "";
let snackbarType = "success";

export default function ScreenList({ testcaseId, screen, setScreenId }) {
  const [tempScreen, setTempScreen] = useState();
  const [order, setOrder] = useState([]);
  let [snackbar, setSnackbar] = useState(false);
  let [selectedScreenIds, setSelectedScreenIds] = useState(0);

  const columns = useMemo(
    () => [
      {
        accessorKey: "locators",
        header: " ",
        Cell: ({ cell, column, row, table }) => {
          return (
            <div
              style={{
                backgroundColor:
                  selectedScreenIds === row.original.screen_id ? "#e8edf2" : "",
                cursor: "pointer",
              }}
              onClick={(e) => {
                setSelectedScreenIds(row.original.screen_id);
                setScreenId(row.original.screen_id);
              }}
            >
              <h4>{row.original.name}</h4>
              <h5>{row.original.description}</h5>
            </div>
          );
        },
      },
    ],
    [selectedScreenIds]
  );

  const updateScreenOrder = () => {
    axios
      .post(
        `${qfservice}/qfservice/webtestcase/updateOrderOfScreensInTestcase`,
        {
          testcaseId: testcaseId,
          screen_ids: order,
        }
      )
      .then((resp) => {
        if (resp.data.status === "SUCCESS") {
          snackbarMessage = "Screen Order Updated";
          setSnackbar(true);
        }
      });
  };

  useEffect(() => {
    if (order !== undefined && order.length > 0) {
      updateScreenOrder();
    }
  }, [order]);

  useEffect(() => {
    setScreenId([screen.screen_id]);
    setTempScreen([...screen]);
    setSelectedScreenIds(screen[0]?.screen_id);
  }, [screen]);

  return (
    <>
      <Typography
        align="center"
        m={2}
        sx={{ backgroundColor: "#e8edf2", padding: "10px", color: "002980" }}
      >
        List of screens
      </Typography>

      {tempScreen !== undefined && (
        <MaterialReactTable
          columns={columns}
          data={tempScreen}
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
                let x = [...tempScreen];
                x.splice(hoveredRow.index, 0, draggingRow.original);
                x.splice(draggingRow.index + 1, 1);
                setTempScreen([...x]);
                let id = x?.map((s) => {
                  return s.screen_id;
                });
                setOrder(id);
              }
            },
          })}
          muiTablePaperProps={{
            elevation: 0,
          }}
        />
      )}
      <SnackbarNotify
        open={snackbar}
        close={setSnackbar}
        msg={snackbarMessage}
        severity={snackbarType}
      />
    </>
  );
}
