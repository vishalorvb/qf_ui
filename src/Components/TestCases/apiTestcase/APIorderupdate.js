import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import useHead from "../../../hooks/useHead";
import { qfservice } from "../../../Environment";

export default function APIorderupdate() {
  const { setHeader } = useHead();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${qfservice}/qfservice/testcase/${location?.state?.testcaseId}/apis`
      )
      .then((resp) => {
        setData(() =>
          resp.data.data.apisList.filter((api) => api.is_selected === true)
        );
      });

    setHeader((ps) => {
      return {
        ...ps,
        name: "API in Testcase",
        plusButton: false,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateScreenOrder = () => {
    order.length > 0 &&
      axios
        .post(`${qfservice}/qfservice/UpdateOrderOfAPIsInTestcase`, {
          testcaseId: location?.state?.testcaseId,
          api_ids: order,
        })
        .then((resp) => {
          console.log(resp);
        });
  };

  useEffect(() => {
    updateScreenOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "api_name",
        header: "API Name",
      },
      {
        accessorKey: "api_description",
        header: "Description",
      },
    ],
    []
    //end
  );

  return (
    <>
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
                return data.map((d) => d.api_id);
              });
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
