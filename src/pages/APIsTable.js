import { useEffect } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, Outlet } from "react-router-dom";
import { IconButton } from "@mui/material";

export default function APIsTable() {
  const { setHeader } = useHead();

  const pageColumns = [
    {
      field: "name",
      headerName: "Pages",
      flex: 3,
      sortable: false,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 4,
      sortable: false,
    },
    {
      field: "type",
      headerName: "Request Type",
      flex: 1,
      sortable: false,
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 2,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (param) => {
        return (
          <div>
            <Link to={String(param.row.id)}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const pages = [
    {
      id: 1,
      name: "Application 1",
      description: "Description 1",
    },
    {
      id: 2,
      name: "Application 2",
      description: "Description 2",
    },
    {
      id: 3,
      name: "Application 3",
      description: "Description 3",
    },
    {
      id: 4,
      name: "Application 4",
      description: "Description 4",
    },
  ];

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "APIs Table",
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

  return (
    <>
      <Table rows={pages} columns={pageColumns} />
      <Outlet />
    </>
  );
}
