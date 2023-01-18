import { useEffect } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import { Routes, Route, Link, Outlet } from "react-router-dom";

export default function WebApp() {
  const { setHeader } = useHead();

  const applicationColumns = [
    {
      field: "name",
      headerName: "Application Name",
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
              <NearMeOutlinedIcon />
            </Link>
          </div>
        );
      },
    },
  ];

  const applications = [
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
      return { ...ps, name: "Web" };
    });
  }, []);

  return (
    <>
      <Table rows={applications} columns={applicationColumns} />
      <Outlet />
    </>
  );
}
