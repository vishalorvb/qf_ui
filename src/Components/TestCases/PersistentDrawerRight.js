import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Stack } from "@mui/system";
import MaterialReactTable from "material-react-table";

const drawerWidth = 240;
export let selected_screen;

export default function PersistentDrawerRight({
  screen,
  screenId,
  setScreenId,
}) {

  const columns = useMemo(
    //column definitions...
    () => [
  
      {
        accessorKey: "locators",
        header: "Test",
        Cell: ({ cell, column, row, table }) => {
          console.log(row.original.name)
          return (
            <div>
              <h4>{row.original.name}</h4>
              <h5>{row.original.description}</h5>
            </div>
          )
        },
      },
    ],
    []
    //end
  );


  function handleClick(e) {
    setScreenId([e]);
  }

  useEffect(() => { }, [screenId]);

  useEffect(() => {
    setScreenId([screen[0].screen_id]);
  }, [screen]);


  return (
    <>
      <Typography align="center" m={2} sx={{ backgroundColor: "#e8edf2", padding: "10px", color: "002980" }}>
        List of screens
      </Typography>
      {screen.map((s) => {
        return (
          <Stack
            mt={1}
            ml={1}
            direction="column"
            sx={{
              backgroundColor: screenId.includes(s.screen_id) && "#e8edf2",
              cursor: "pointer",
            }}
            onClick={() => handleClick(s.screen_id)}
          >
            <Typography variant="p" sx={{ fontWeight: "bold" }}>
              {s.name}
            </Typography>
            <Typography variant="caption">{s.description}</Typography>
            <Divider />
          </Stack>
        );
      })}






      <MaterialReactTable
        columns={columns}
        data={screen}
        enableColumnActions={false}
        initialState={{ showGlobalFilter: true, density: "compact" }}
        enableToolbarInternalActions={false}
        muiTableBodyRowProps={{ hover: false }}
        enableRowOrdering
        enableSorting={false}
        muiTableBodyRowDragHandleProps={({ table }) => ({
          onDragEnd: () => {
            const { draggingRow, hoveredRow } = table.getState();

          },
        })}
        muiTablePaperProps={{
          elevation: 0,
        }}
      />

    </>
  );
}
