import React from "react";
import {
  IconButton,
  Autocomplete,
  Button,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import Table from "../../CustomComponent/Table";
import { useEffect, useState, useRef } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import AddEnvironmentPop from "./AddEnvironmentPop";
import EditEnvironmentPop from "./EditEnvironmentPop";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import axios from "../../api/axios";
import ConfirmPop from "../../CustomComponent/ConfirmPop";
import useHead from "../../hooks/useHead";
const AddEnvironemt = () => {
  const [tbData, setTbData] = useState([]);
  const [addEnvironmentPop, setAddEnvironmentPop] = useState(false);
  const [editEnvironmentPop, setEditEnvironmentPop] = useState(false);
  const [reportSuccessMsg, setReportSuccessMsg] = useState(false);
  const [reportFailMsg, setReportFailMsg] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [close, setClose] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [specificationId, setSpecificationId] = useState();
  const [editEnvironmentData, setEditEnvironmentData] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const { setHeader } = useHead();


  let project_id = location.state.projectId;
  let application_id = location.state.applicationId;

  useEffect(() => {
    getBuilEnvironment();
  }, []);

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Build Environment",
      };
    });
  }, []);

  

  async function getBuilEnvironment() {
    axios
      .get(
        `/qfservice/build-environment?project_id=${project_id}&module_id=${application_id}`
      )
      .then((res) => {
        console.log(res.data.data.length);
        if (res.data.data.length > 0) {
          setTbData(res.data.data);
          setReportSuccessMsg(true);
          setTimeout(() => {
            setReportSuccessMsg(false);
          }, 3000);
        } else {
          setTbData("");
          setReportFailMsg(true);
          setTimeout(() => {
            setReportFailMsg(false);
          }, 3000);
        }
      });
  }
  function deleteApiRequest(specificationId) {
    axios
      .post(
        `qfservice/DeleteBuildEnvironment?build_environment_id=${specificationId}`
      )
      .then((res) => {
        if (res.data.message === "Successfully deleted Build Environment") {
          setSuccessDelete(true);
          setTimeout(() => {
            setSuccessDelete(false);
            getBuilEnvironment();
          }, 3000);
          return true;
        }
      });
    setConfirm(false);
  }

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: "left",
    },
    {
      field: "description",
      headerName: "Desription",
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: "center",
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 2,
      sortable: false,
      align: "left",
      renderCell: (param) => {
        return (
          <>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  setEditEnvironmentData(param.row);
                  setEditEnvironmentPop(true);
                }}
              >
                <EditIcon style={{ color: "black" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  setSpecificationId(param.id);
                  setConfirm(true);
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >

        <Button
          sx={{ marginLeft: 2 }}
          variant="contained"
          onClick={(e) => {
            setAddEnvironmentPop(true);
          }}
          // startIcon={<SearchOutlinedIcon />}
        >
          + Add Environment
        </Button>
      </Grid>
      <SnackbarNotify
        open={reportSuccessMsg}
        close={setReportSuccessMsg}
        msg="We got the report successfully"
        severity="success"
      />
      <SnackbarNotify
        open={reportFailMsg}
        close={setReportFailMsg}
        msg="No reports found"
        severity="error"
      />
      <SnackbarNotify
        open={successDelete}
        close={setSuccessDelete}
        msg="Deleted successfully"
        severity="success"
      />
      <div className="datatable" style={{ marginTop: "15px" }}>
        <Table
          searchPlaceholder="Search Environment"
          columns={columns}
          rows={tbData}
          getRowId={(row) => row.id}
        />
      </div>
      <AddEnvironmentPop
        addEnvironmentPop={addEnvironmentPop}
        close={setAddEnvironmentPop}
        getBuilEnvironment={getBuilEnvironment}
        projectId={project_id}
        applicationId={application_id}
      />
      <EditEnvironmentPop
        editEnvironmentPop={editEnvironmentPop}
        close={setEditEnvironmentPop}
        row={tbData}
        getBuilEnvironment={getBuilEnvironment}
        editEnvironmentData={editEnvironmentData}
        projectId={project_id}
        applicationId={application_id}
      />
      {confirm && (
        <ConfirmPop
          open={true}
          handleClose={(e) => setConfirm(false)}
          heading={"Delete Configuration"}
          message={"Are you sure you want to delete the Configuration ?"}
          onConfirm={(e) => deleteApiRequest(specificationId)}
        ></ConfirmPop>
      )}
    </>
  );
};

export default AddEnvironemt;
