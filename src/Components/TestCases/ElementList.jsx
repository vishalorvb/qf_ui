import { useEffect, useMemo, useState } from "react";
import { getElement } from "../../Services/QfService";
import Table from "../../CustomComponent/Table";
import AccordionTemplate from "../../CustomComponent/AccordionTemplate";
import DragDrop from "../../CustomComponent/DragDrop";
import { Button, Grid } from "@mui/material";
import useHead from "../../hooks/useHead";

function ElementList({ screenList, setScreenList }) {
  let [element, setElement] = useState([]);
  let [open, setOpen] = useState(false);
  const { setSnackbarData } = useHead();

  let col = [
    {
      field: "name",
      headerName: "Element Name",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "input_type",
      headerName: "Input Type",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "tag_name",
      headerName: "Tag Name",
      flex: 3,
      sortable: false,
      align: "left",
    },
  ];

  let dragDropCol = useMemo(
    () => [
      {
        accessorKey: "locators",
        header: " ",
        Cell: ({ cell, column, row, table }) => {
          return (
            <AccordionTemplate name={row.original.name} toggle={open}>
              <Table
                hideSearch={true}
                rows={
                  element.find((e) => e.screenId === row.original.screen_id)
                    ?.elements ?? []
                }
                columns={col}
                hidefooter={true}
                getRowId={(row) => row?.element_id}
              ></Table>
            </AccordionTemplate>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open, element]
  );
  useEffect(() => {
    screenList.forEach((screen) => {
      if (!element.find((element) => element.screenId === screen.screenId)) {
        getElement(screen.screen_id, () => {}).then((res) => {
          setElement((pv) => {
            let x = [...pv];
            let obj = {
              screenName: screen.name,
              screenId: screen.screen_id,
              elements: res,
            };
            x.push(obj);
            return x;
          });
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenList]);

  useEffect(() => {}, [element]);

  return (
    <div>
      {screenList.length > 0 && (
        <div>
          <Grid container spacing={2} justifyContent="right" alignItems="right">
            <Grid item xs={2} md={2}>
              <Button onClick={(e) => setOpen(!open)} variant="contained">
                {open ? "Hide All" : "Expand All"}
              </Button>
            </Grid>
          </Grid>

          <DragDrop
            columns={dragDropCol}
            row={screenList}
            setRow={(e) => {
              setSnackbarData({
                status: true,
                message: "Screen order updated Successfully",
                severity: "success",
              });
              setScreenList(e);
            }}
          ></DragDrop>
        </div>
      )}
    </div>
  );
}

export default ElementList;
