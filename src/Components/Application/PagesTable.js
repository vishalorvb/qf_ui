import { useEffect, useState } from "react";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useHead from "../../hooks/useHead";
import useAuth from "../../hooks/useAuth";
import { getPages } from "../../Services/ApplicationService";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Table from "../../CustomComponent/Table";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import TableActions from "../../CustomComponent/TableActions";
import axios from "../../api/axios";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import UsbIcon from "@mui/icons-material/Usb";
import ConfirmPop from "../../CustomComponent/ConfirmPop";
import UpdatePage from "./ScreenComponents/UpdatePage";
import { postVal } from "./ScreenComponents/UpdatePage";
export default function PagesTable(props) {
  const { location } = props;
  const { header, setHeader } = useHead();
  const navigate = useNavigate();
  let [page, setPage] = useState([]);
  const [snackbarMsg, setSnackbarMsg] = useState(false);
  let [popup, setPopup] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleDelete = (pageId) => {
    axios
      .delete(`/qfservice/webpages/deleteWebPage?web_page_id=${pageId}`)
      .then((resp) => {
        setSnackbarMsg(resp?.data?.message);
      });
    setPopup(false);
  };

  const pageColumns = [
    {
      field: "name",
      headerName: "Pages",
      flex: 3,
      sortable: false,
      renderCell: (param) => {
        return (
          <Typography
            onClick={() =>
              navigate("PageElements", {
                state: {
                  id: param?.row?.web_page_id,
                  name: param?.row?.name,
                },
              })
            }
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
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (param) => {
        return (
          <>
            <Tooltip title="Create Screen">
              <IconButton
                onClick={() =>
                  navigate("SelectElements", { state: param?.row })
                }
              >
                <AddToQueueIcon />
              </IconButton>
            </Tooltip>
            <TableActions>
              <MenuItem>
                <EditOutlinedIcon sx={{ color: "blue", mr: 1 }} /> Edit
              </MenuItem>
              <MenuItem onClick={() => setPopup(true)}>
                <DeleteOutlineIcon sx={{ color: "red", mr: 1 }} /> Delete
              </MenuItem>
              <MenuItem
                onClick={() =>
                  navigate("MapDiffElements", { state: param?.row })
                }
              >
                <UsbIcon sx={{ color: "red", mr: 1 }} /> Map Diff Elements
              </MenuItem>
            </TableActions>
            {popup && (
              <ConfirmPop
                open={popup}
                handleClose={() => setPopup(false)}
                heading={"Delete Page"}
                message={"Are you sure you want to delete this page?"}
                onConfirm={() => handleDelete(param?.row?.web_page_id)}
              ></ConfirmPop>
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getPages(setPage, location?.state?.module_id);
    console.log(location?.state);
  }, [snackbarMsg]);
  return (
    <>
      <Table
        searchPlaceholder="Search Pages"
        rows={page}
        columns={pageColumns}
        getRowId={(row) => row?.web_page_id}
      />
      <Outlet />
      <SnackbarNotify
        open={snackbarMsg !== false}
        close={setSnackbarMsg}
        msg={snackbarMsg}
        severity="success"
      />
    </>
  );
}
