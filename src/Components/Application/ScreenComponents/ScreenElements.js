import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useHead from "../../../hooks/useHead";
import axios from "../../../api/axios";
import ElementsDetails from "../../../CustomComponent/ElementsDetails";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import { IconButton } from "@mui/material";

export default function ScreenElements() {
  const { setHeader } = useHead();
  const location = useLocation();
  const [data, setData] = useState(() => []);

  const [order, setOrder] = useState([]);

  const [popup, setPopup] = useState(false);
  const [elementid, setElementid] = useState(0);

  useEffect(() => {
    axios
      .get(
        `qfservice/screen/getScreenElementsList?screen_id=${location?.state?.screen_id}`
      )
      .then((resp) => {
        console.log(resp?.data?.info);
        setData(resp?.data?.info);
      });

    setHeader((ps) => {
      return {
        ...ps,
        name: "Screen Elements",
        plusButton: false,
      };
    });
  }, []);

  const updateScreenOrder = () => {
    axios
      .post(`qfservice/screen/updateOrderOfScreenElements`, {
        screenId: location?.state?.screen_id,
        screen_element_ids: order,
      })
      .then((resp) => {
        console.log(resp);
      });
  };

  useEffect(() => {
    updateScreenOrder();
  }, [order]);

  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "name",
        header: "Field Name",
      },
      {
        accessorKey: "input_type",
        header: "Field Type",
      },
      {
        accessorKey: "locators",
        header: "Field Locators",
        Cell: ({ cell, column, row, table }) => (
          <IconButton
            onClick={() => {
              console.log(row.original);
              setElementid(row.original.element_id);
              setPopup(true);
            }}
          >
            <NearMeOutlinedIcon />
          </IconButton>
        ),
      },
    ],
    []
    //end
  );

  return (
    <>
      {popup && (
        <ElementsDetails
          ElementId={elementid}
          setPopup={setPopup}
        ></ElementsDetails>
      )}
      <MaterialReactTable
        columns={columns}
        data={data}
        enableColumnActions={false}
        initialState={{ showGlobalFilter: true, density: "compact" }}
        enableToolbarInternalActions={false}
        muiTableBodyRowProps={{ hover: false }}
        enableRowOrdering
        enableSorting={false}
        muiTableBodyRowDragHandleProps={({ table }) => ({
          onDragEnd: () => {
            const { draggingRow, hoveredRow } = table.getState();
            if (hoveredRow && draggingRow) {
              data.splice(
                hoveredRow.index,
                0,
                data.splice(draggingRow.index, 1)[0]
              );
              setData([...data]);
              setOrder(() => {
                return data.map((d) => d.screen_element_id);
              });
              console.log(data);
            }
          },
        })}
        muiTablePaperProps={{
          elevation: 0,
        }}
      />
    </>
  );
}
