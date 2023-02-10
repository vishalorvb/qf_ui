import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { getApis } from "../Services/ProjectService";

export default function APIsTable() {
  const { setHeader } = useHead();
  const location = useLocation()
  const navigate = useNavigate();
 

  let[apis,setApis] = useState([])

  const pageColumns = [
    {
      field: "api_name",
      headerName: "API Name",
      flex: 3,
      sortable: false,
    },
    {
      field: "api_description",
      headerName: "Description",
      flex: 4,
      sortable: false,
    },
    {
      field: "request_type",
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
            <IconButton onClick={() => navigate("create", { state: { id: param.row.id } })}>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];


  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "API Requests",
        plusButton: true,
        plusCallback: () => navigate("create",{state:{id:location.state.id}}),
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

useEffect(() => {
getApis(location.state.id,setApis)
}, [])

  return (
    <>
      <Table rows={apis} columns={pageColumns}
      getRowId={row => row.api_id}
      />
      <Outlet />
    </>
  );
}
