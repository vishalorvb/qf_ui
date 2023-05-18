import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Stack } from "@mui/system";
import MaterialReactTable from "material-react-table";
import axios from "../../api/axios";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";

const drawerWidth = 240;
export let selected_screen;

let snackbarMessage = ""
let snackbarType = "success"

export default function PersistentDrawerRight({
  testcaseId,
  screen,
  screenId,
  setScreenId,

}) {

  const [tempScreen, setTempScreen] = useState()
  const [order, setOrder] = useState([]);
  let [snackbar, setSnackbar] = useState(false)


  const columns = useMemo(
    () => [
      {
        accessorKey: "locators",
        header: " ",
        Cell: ({ cell, column, row, table }) => {
          return (
            <div style={{
              backgroundColor: screenId.includes(row.original.screen_id) && "#e8edf2",
              cursor: "pointer",
            }}
              onClick={e => {
                handleClick(row.original.screen_id)
              }}
            >
              <h4>{row.original.name}</h4>
              <h5>{row.original.description}</h5>
            </div>
          )
        },
      },
    ],
    []
  );


  const updateScreenOrder = () => {
    axios
      .post(`/qfservice/webtestcase/updateOrderOfScreensInTestcase`, {
        testcaseId: testcaseId,
        screen_ids: order,
      })
      .then((resp) => {
        if (resp.data.status == "SUCCESS") {
          snackbarMessage = "Screen Order Updated"
          setSnackbar(true)
        }
      });
  };

  useEffect(() => {
    if (order != undefined && order.length > 0) {
      updateScreenOrder();
    }
  }, [order]);

  function handleClick(e) {
    setScreenId([e]);
  }


  useEffect(() => {
    setScreenId([screen[0].screen_id]);
    setTempScreen([...screen]);
  }, [screen]);


  return (
    <>
      <Typography align="center" m={2} sx={{ backgroundColor: "#e8edf2", padding: "10px", color: "002980" }}>
        List of screens
      </Typography>

      {tempScreen != undefined && <MaterialReactTable

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
              let x = [...tempScreen]
              x.splice(hoveredRow.index, 0, draggingRow.original)
              x.splice(draggingRow.index + 1, 1)
              setTempScreen([...x])
              let id = x?.map(s => {
                return s.screen_id
              })
              setOrder(id)
            }
          },
        })}
        muiTablePaperProps={{
          elevation: 0,
        }}
      />}
      <SnackbarNotify
        open={snackbar}
        close={setSnackbar}
        msg={snackbarMessage}
        severity={snackbarType}
      />
    </>
  );
}
