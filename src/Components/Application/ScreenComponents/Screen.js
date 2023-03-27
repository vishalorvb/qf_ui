import { useEffect, useState } from "react";
import useHead from "../../../hooks/useHead";
import Table from "../../../CustomComponent/Table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { IconButton, Tooltip } from "@mui/material";
import ConfirmPop from "../../../CustomComponent/ConfirmPop";
export default function Screens() {
  const { setHeader } = useHead();
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState([]);
  const [popup, setPopup] = useState(false);
  const [screenId, setscreenId] = useState();

  const pageColumns = [
    {
      field: "name",
      headerName: "Screens",
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
            <Tooltip title="View">
              <IconButton
                onClick={() =>
                  navigate("screenelements", {
                    state: { id: param.row.screen_id },
                  })
                }
              >
                <VisibilityOutlinedIcon className="eyeIcon" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                onClick={() =>
                  navigate("UpdateScreen", {
                    state: {
                      screenId: param.row.screen_id,
                      pageId: param.row.web_page_id,
                      name: param.row.name,
                      desc: param.row.description,
                      applicationId: location?.state?.id,
                    },
                  })
                }
              >
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={(e) => {
                  console.log(param.row.screen_id);
                  setscreenId(param.row.screen_id);
                  setPopup(true);
                }}
              >
                <DeleteOutlineIcon></DeleteOutlineIcon>
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    axios
      .delete(`/qfservice/screen/deleteScreen?screen_id=${id}`)
      .then((resp) => {
        console.log(resp);
        resp?.data?.status === "SUCCESS" && getScreens();
        resp?.data?.status === "SUCCESS" && setPopup(false);
      });
  };

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Screens",
        plusButton: true,
        buttonName: "Create Screen",
        plusCallback: () =>
          navigate("createscreen", { state: { id: location?.state?.id } }),
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

  const getScreens = () => {
    axios
      .get(`/qfservice/screen/getScreensList?module_id=${location?.state?.id}`)
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
        rows={page}
        columns={pageColumns}
        getRowId={(row) => row.screen_id}
      />
      <Outlet />
      <ConfirmPop
        open={popup}
        handleClose={() => setPopup(false)}
        heading={"Delete Screen"}
        message={"Are you sure you want to delete this Screen"}
        onConfirm={() => handleDelete(screenId)}
      ></ConfirmPop>
    </>
  );
}
