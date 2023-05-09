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
export default function PagesTable(props) {
  const { location } = props;
  const { header, setHeader } = useHead();
  const navigate = useNavigate();

  let [page, setPage] = useState([]);

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
                  id: param.row.web_page_id,
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
              <MenuItem>
                <DeleteOutlineIcon sx={{ color: "red", mr: 1 }} /> Delete
              </MenuItem>
            </TableActions>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getPages(setPage, location.state.module_id);
    console.log(location.state);
  }, []);
  return (
    <>
      <Table
        searchPlaceholder="Search Pages"
        rows={page}
        columns={pageColumns}
        getRowId={(row) => row.web_page_id}
      />
      <Outlet />
    </>
  );
}
