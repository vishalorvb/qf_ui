import { MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Table from "../CustomComponent/Table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import useHead from "../hooks/useHead";
import axios, { axiosPrivate } from "../api/axios";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";
import ProjectnApplicationSelector from "../Components/ProjectnApplicationSelector";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import TableActions from "../CustomComponent/TableActions";
import ConfirmPop from "../CustomComponent/ConfirmPop";

export default function Testset() {
  const {
    globalProject,
    setglobalProject,
    globalApplication,
    setglobalApplication,
    setSnackbarData,
  } = useHead();
  const [testsets, setTestset] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteObject, setDeleteObject] = useState();
  const [delSuccessMsg, setDelSuccessMsg] = useState(false);

  const navigate = useNavigate();
  const { setHeader } = useHead();

  const deleteTestcaseHandler = (id) => {
    axiosPrivate
      .delete(`/qfservice/webtestset/deleteWebTestset?testset_id=${id}`)
      .then((resp) => {
        setOpenDelete(false);
        onChangeHandler();
        setSnackbarData({
          status: true,
          message: resp?.data?.message,
          severity: resp?.data?.status,
        });
      });
  };

  const onChangeHandler = () => {
    axios
      .get(
        `qfservice/webtestset/getWebTestsetInfoByProjectIdByApplicationId?project_id=${globalProject?.project_id}&module_id=${globalApplication?.module_id}`
      )
      .then((resp) => {
        const testsets = resp?.data?.info ?? [];
        setTestset(testsets);
      });
  };

  const columns = [
    {
      field: "testset_name",
      headerName: "Testset Name",
      flex: 1,
      sortable: false,
      renderCell: (param) => {
        return (
          <Typography
            onClick={() =>
              navigate("Reorder", {
                state: {
                  applicationId: globalApplication?.module_id,
                  testsetId: param.row.testset_id,
                  projectId: globalProject?.project_id,
                },
              })
            }
            variant="p"
            className="nameColumn"
          >
            {param.row.testset_name}
          </Typography>
        );
      },
    },
    {
      field: "testset_desc",
      headerName: "Testset Description",
      flex: 3,
      sortable: false,
      renderCell: (param) => {
        return (
          <TableActions heading={param?.row?.testset_desc}>
            <MenuItem
              onClick={(e) => {
                navigate("CopyTestset", {
                  state: {
                    name: param?.row?.testset_name,
                    id: param?.row?.testset_id,
                    projectId: globalProject?.project_id,
                  },
                });
              }}
            >
              <ContentCopyOutlinedIcon sx={{ color: "green", mr: 1 }} />
              Copy
            </MenuItem>
            <MenuItem
              onClick={() =>
                navigate("Update", {
                  state: {
                    param1: param?.row,
                    param2: globalProject?.project_id,
                    param3: globalApplication?.module_id,
                  },
                })
              }
            >
              <EditOutlinedIcon sx={{ color: "blue", mr: 1 }} />
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenDelete(true);
                setDeleteObject(param?.row?.testset_id);
              }}
            >
              <DeleteOutlineIcon sx={{ color: "red", mr: 1 }} />
              Delete
            </MenuItem>
          </TableActions>
        );
      },
    },
  ];

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Recent Testsets",
      };
    });
  }, [setHeader]);

  useEffect(() => {
    globalApplication?.module_id && onChangeHandler();
  }, [globalApplication]);

  return (
    <>
      <div className="apptable">
        <div className="intable">
          <ProjectnApplicationSelector
            globalProject={globalProject}
            setglobalProject={setglobalProject}
            globalApplication={globalApplication}
            setglobalApplication={setglobalApplication}
          />
        </div>

        <SnackbarNotify
          open={delSuccessMsg}
          close={setDelSuccessMsg}
          msg="Testset deleted successfully"
          severity="success"
        />

        <div className="datatable" style={{ marginTop: "20px" }}>
          <ConfirmPop
            open={openDelete}
            handleClose={() => setOpenDelete(false)}
            heading={"Delete Testset"}
            message={"Are you sure you want to delete this Testset?"}
            onConfirm={() => deleteTestcaseHandler(deleteObject)}
          ></ConfirmPop>

          <Table
            searchPlaceholder="Search Testset"
            columns={columns}
            rows={testsets}
            getRowId={(row) => row.testset_id}
          />
        </div>
      </div>
    </>
  );
}
