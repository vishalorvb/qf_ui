import { useEffect, useState } from "react";
import Table from "../../../CustomComponent/Table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { MenuItem, Typography } from "@mui/material";
import ConfirmPop from "../../../CustomComponent/ConfirmPop";
import TableActions from "../../../CustomComponent/TableActions";
import SnackbarNotify from "../../../CustomComponent/SnackbarNotify";
import { qfservice } from "../../../Environment";
export default function Screens({ location }) {
  const navigate = useNavigate();
  const [page, setPage] = useState([]);
  const [popup, setPopup] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [screenId, setscreenId] = useState();

  const pageColumns = [
    {
      field: "name",
      headerName: "Screens",
      flex: 3,
      sortable: false,
      renderCell: (param) => {
        return (
          <Typography
            onClick={() => navigate(`screenelements`, { state: param?.row })}
            variant="p"
            className="nameColumn"
          >
            {param?.row?.name}
          </Typography>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
      sortable: false,
      renderCell: (param) => {
        return (
          <TableActions heading={param?.row?.description}>
            <MenuItem
              onClick={() =>
                navigate("UpdateScreen", {
                  state: param?.row,
                })
              }
            >
              <EditOutlinedIcon sx={{ color: "blue", mr: 1 }} /> Edit
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                console.log(param?.row?.screen_id);
                setscreenId(param?.row?.screen_id);
                setPopup(true);
              }}
            >
              <DeleteOutlineIcon sx={{ color: "red", mr: 1 }} /> Delete
            </MenuItem>
          </TableActions>
        );
      },
    },
    // {
    //   field: "Actions",
    //   headerName: "Actions",
    //   flex: 3,
    //   sortable: false,
    //   align: "center",
    //   headerAlign: "center",
    //   renderCell: (param) => {
    //     return (
    //       <div>
    //         <Tooltip title="View">
    //           <IconButton
    //             onClick={() =>
    //               navigate("screenelements", {
    //                 state: { id: param.row.screen_id },
    //               })
    //             }
    //           >
    //             <VisibilityOutlinedIcon className="eyeIcon" />
    //           </IconButton>
    //         </Tooltip>
    //         <Tooltip title="Edit">
    //           <IconButton
    //             onClick={() =>
    //               navigate("UpdateScreen", {
    //                 state: {
    //                   screenId: param.row.screen_id,
    //                   pageId: param.row.web_page_id,
    //                   name: param.row.name,
    //                   desc: param.row.description,
    //                   applicationId: location?.state?.module_id,
    //                 },
    //               })
    //             }
    //           >
    //             <EditOutlinedIcon />
    //           </IconButton>
    //         </Tooltip>
    //         <Tooltip title="Delete">
    //           <IconButton
    //             onClick={(e) => {
    //               console.log(param.row.screen_id);
    //               setscreenId(param.row.screen_id);
    //               setPopup(true);
    //             }}
    //           >
    //             <DeleteOutlineIcon></DeleteOutlineIcon>
    //           </IconButton>
    //         </Tooltip>
    //       </div>
    //     );
    //   },
    // },
  ];

  const handleDelete = (id) => {
    axios
      .delete(`${qfservice}/qfservice/screen/deleteScreen?screen_id=${id}`)
      .then((resp) => {
        console.log(resp);
        resp?.data?.status === "SUCCESS" && getScreens();
        resp?.data?.status === "SUCCESS" && setDeleted(true);
        resp?.data?.status === "SUCCESS" && setPopup(false);
      });
  };

  const getScreens = () => {
    axios
      .get(
        `${qfservice}/qfservice/screen/getScreensList?module_id=${location?.state?.module_id}`
      )
      .then((resp) => {
        console.log(resp?.data?.info);
        const data = resp?.data?.info;
        setPage(data ? data : []);
      });
  };

  useEffect(() => {
    getScreens();
  }, []);
  return (
    <>
      <Table
        searchPlaceholder="Search Screens"
        rows={page}
        columns={pageColumns}
        getRowId={(row) => row?.screen_id}
      />
      <Outlet />
      <ConfirmPop
        open={popup}
        handleClose={() => setPopup(false)}
        heading={"Delete Screen"}
        message={"Are you sure you want to delete this Screen"}
        onConfirm={() => handleDelete(screenId)}
      ></ConfirmPop>
      <SnackbarNotify
        open={deleted}
        close={setDeleted}
        msg={"Screen deleted Successfully"}
        severity="success"
      />
    </>
  );
}
