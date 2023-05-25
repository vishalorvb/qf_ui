import { useEffect, useState } from "react";
import useHead from "../../../hooks/useHead";
import Table from "../../../CustomComponent/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, IconButton, MenuItem, Tooltip } from "@mui/material";
import ConfirmPop from "../../../CustomComponent/ConfirmPop";
import { Apidata } from "../../ApiComponents/Data";
import { getApis } from "../../../Services/ApiService";
import { deleteApiRequest } from "../../../Services/ApiService";
import TableActions from "../../../CustomComponent/TableActions";
export default function APIsTable() {
  const { setHeader, setSnackbarData } = useHead();
  const location = useLocation();
  const navigate = useNavigate();
  let [apis, setApis] = useState([]);
  let [popup, setPopup] = useState(false);
  let [apiid, setApiid] = useState();

  function handleDelete(apiid) {
    deleteApiRequest(apiid).then((res) => {
      if (res) {
        getApis(setApis, location.state.module_id);
        setSnackbarData({
          status: true,
          message: "API deleted successfully",
          severity: "success",
        });
      }
      setPopup(false);
    });
  }

  function handleEdit(row) {
    Apidata.api_url = row.api_url;
    Apidata.api_name = row.api_name;
    Apidata.module_id = row.module_id;
    Apidata.request_type = row.request_type;
    Apidata.body_type = row.body_type;
    Apidata.api_description = row.api_description;
    Apidata.api_id = row.api_id;
  }

  useEffect(() => {
    getApis(setApis, location.state.module_id);
  }, []);

  useEffect(() => {
    Apidata.module_id = location.state.module_id;
  }, []);

  let requests = [" ", "Get", "Post", "Put", "Delete"];
  const pageColumns = [
    {
      field: "api_name",
      headerName: "API Name",
      flex: 2,
      sortable: false,
    },
    {
      field: "reque",
      headerName: "Request Type",
      renderCell: (param) => {
        let x = param.row.request_type;
        return requests[x];
      },
      flex: 1,
      sortable: false,
    },
    {
      field: "api_description",
      headerName: "Description",
      flex: 4,
      sortable: false,
      renderCell: (param) => {
        return (
          <TableActions heading={param.row.api_description}>
            <MenuItem
              onClick={(e) => {
                handleEdit(param.row);
                navigate("Update");
              }}
            >
              <EditIcon sx={{ color: "blue", mr: 1 }} /> Edit
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                setApiid(param.row.api_id);
                setPopup(true);
              }}
            >
              <DeleteIcon sx={{ color: "red", mr: 1 }} /> Delete
            </MenuItem>
          </TableActions>
        );
      },
    },

    // {
    //   field: "Actions",
    //   headerName: "Actions",
    //   flex: 2,
    //   sortable: false,
    //   align: "center",
    //   headerAlign: "center",
    //   renderCell: (param) => {
    //     return (
    //       <div>
    //         <Tooltip title="Edit">
    //           <IconButton
    //             onClick={(e) => {
    //               handleEdit(param.row);
    //               navigate("Update");
    //             }}
    //           >
    //             <EditIcon className="editIcon" />
    //           </IconButton>
    //         </Tooltip>
    //         <Tooltip title="Delete">
    //           <IconButton
    //             onClick={(e) => {
    //               setApiid(param.row.api_id);
    //               setPopup(true);
    //             }}
    //           >
    //             <DeleteIcon />
    //           </IconButton>
    //         </Tooltip>
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <div className="apptable">
      <div className="intable">
        <Button
          variant="contained"
          onClick={() =>
            navigate("Create", { state: { id: location.state.module_id } })
          }
        >
          Create API
        </Button>
      </div>

      <Table
        searchPlaceholder="Search APIs"
        rows={apis}
        columns={pageColumns}
        getRowId={(row) => row.api_id}
      />
      <Outlet />
      <ConfirmPop
        open={popup}
        handleClose={(e) => setPopup(false)}
        heading={"Delete API"}
        message={"Are you sure you want to delete this API"}
        onConfirm={(e) => handleDelete(apiid)}
      ></ConfirmPop>
    </div>
  );
}
