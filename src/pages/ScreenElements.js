import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useHead from "../hooks/useHead";

export default function ScreenElements() {
  const { setHeader } = useHead();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Screens",
        plusButton: true,
        plusCallback: () => console.log("hurray"),
      };
    });
    return () =>
      setHeader((ps) => {
        return {
          ...ps,
          name: "",
          plusButton: false,
          plusCallback: () => console.log("null"),
        };
      });
  }, []);

  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "name",
        header: "Field Name",
      },
      {
        accessorKey: "type",
        header: "Field Type",
      },
      {
        accessorKey: "locators",
        header: "Field Locators",
      },
    ],
    []
    //end
  );

  const data = [{ name: "a", type: "b", locators: "c" }];

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnActions={false}
      initialState={{ showGlobalFilter: true }}
      enableToolbarInternalActions={false}
      muiTableBodyRowProps={{ hover: false }}
    />
  );
}
