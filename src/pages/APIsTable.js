import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { getApis } from "../Services/ProjectService";
import { deleteApi } from "../Services/ProjectService";
import ConfirmPop from "../CustomComponent/ConfirmPop";

export default function APIsTable() {
  const { setHeader } = useHead();
  const location = useLocation()
  const navigate = useNavigate();
  let [apis, setApis] = useState([])
  let [popup, setPopup] = useState(false)
  let [apiid,setApiid] = useState()

  function handleDelete(apiid){
    deleteApi(apiid).then(res=>{
      if (res == null){
        getApis(location.state.id, setApis)
      }
    })
    setPopup(false)
  }

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
            <IconButton onClick={(e) => navigate("create", { state: { projectid: location.state.id, moduleid: param.row.api_id } })}>
              <EditIcon />
            </IconButton>
            <IconButton
              // onClick={e => console.log(param.row.api_id)}
              onClick={e =>{
                setApiid(param.row.api_id)
                setPopup(true)
              }}
            >
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
        plusCallback: () => navigate("create", { state: { projectid: location.state.id, moduleid: null } }),
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
    getApis(location.state.id, setApis)
  }, [])

  return (
    <>
      <Table rows={apis} columns={pageColumns}
        getRowId={row => row.api_id}
      />
      <Outlet />
      <ConfirmPop
                open={popup}
                handleClose={(e) => setPopup(false)}
                heading={"Delete API"}
                message={"Are you sure you want to delete this API"}
                onConfirm={(e) => handleDelete(apiid)}
            ></ConfirmPop>
    </>
  );
}
