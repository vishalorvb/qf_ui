import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Link, Outlet } from "react-router-dom";

export default function Pipeline() {
  const { setHeader } = useHead();

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Pipeline Instances",
        plusButton: true,
        plusCallback: () => console.log("null"),
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

  const instanceColumns = [
    {
      field: "name",
      headerName: "Name",
      flex: 3,
      sortable: false,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
      sortable: false,
    },
    {
      field: "lastUpdate",
      headerName: "Last Updated",
      flex: 3,
      sortable: false,
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 3,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (param) => {
        return (
          <div>
            <Link to={String(param.row.id)}>
              <EditOutlinedIcon />
            </Link>
            <DeleteOutlinedIcon />
          </div>
        );
      },
    },
  ];

  const instances = [
    {
      id: 1,
      name: "Instance 1",
      description: "Description 1",
    },
    {
      id: 2,
      name: "Instance 2",
      description: "Description 2",
    },
    {
      id: 3,
      name: "Instance 3",
      description: "Description 3",
    },
    {
      id: 4,
      name: "Instance 4",
      description: "Description 4",
    },
  ];
  return (
    <>
      <Table rows={instances} columns={instanceColumns} />
      <Outlet />
    </>
  );
}
