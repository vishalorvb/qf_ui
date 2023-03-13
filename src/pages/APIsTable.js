import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import ConfirmPop from "../CustomComponent/ConfirmPop";
import { Apidata } from "../Components/ApiComponents/Data";
import { getApis } from "../Services/ApiService";
import { deleteApiRequest } from "../Services/ApiService";
export default function APIsTable() {
  const { setHeader } = useHead();
  const location = useLocation();
  const navigate = useNavigate();
  let [apis, setApis] = useState([]);
  let [popup, setPopup] = useState(false);
  let [apiid, setApiid] = useState();
 
  function handleDelete(apiid) {
    // deleteApi(apiid).then((res) => {
    //   if (res == null) {
    //     getApis(location.state.id, setApis);
    //   }
    // });
    // setPopup(false);
    deleteApiRequest(apiid).then(res=>{
      if(res){
        getApis(setApis, location.state.id);
      }
      setPopup(false);
    })
  }

  function handleEdit(row) {
    Apidata.api_url = row.api_url
    Apidata.api_name = row.api_name
    Apidata.module_id = row.module_id
    Apidata.request_type = row.request_type
    Apidata.body_type = row.body_type
    Apidata.api_description = row.api_description
    Apidata.api_id = row.api_id
  }




  useEffect(() => {
    getApis(setApis, location.state.id);
  }, []);

  useEffect(() => {
    Apidata.module_id = location.state.id
  }, [])

  let requests = [" ", "Get", "Post", "Put", "Delete"];
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
      field: "reque",
      headerName: "Request Type",
      renderCell: (param) => {
        let x = param.row.request_type;
        return requests[x];
      },
      flex: 2,
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
            <Tooltip title="Edit">
              <IconButton
                onClick={(e) => {
                  handleEdit(param.row);
                  navigate("create");
                }}
              >
                <EditIcon className="editIcon" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={(e) => {
                  setApiid(param.row.api_id);
                  setPopup(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
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
        plusCallback: () =>
          navigate("create",{ state: { id: location.state.id }}),
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
    getApis(location.state.id, setApis);
  }, []);

  return (
    <>
      <Table rows={apis} columns={pageColumns} getRowId={(row) => row.api_id} />
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
