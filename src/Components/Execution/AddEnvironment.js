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
const [editEnvironmentData,setEditEnvironmentData] = useState ();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getBuilEnvironment();
  }, []);

  console.log(location.state.projectId)
  console.log(location.state.applicationId)

  function getBuilEnvironment() {
    axios
      .get(`/qfservice/build-environment?project_id=${location.state.projectId}&module_id=${location.state.applicationId}`)
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
          getBuilEnvironment();
          setTimeout(() => {
            setSuccessDelete(false);
          }, 3000);
        }
      })
      .catch((res) => {
        console.log(res);
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

                    setEditEnvironmentData(param.row)
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
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="subtitle1">
          <b style={{ color: "#5C6780", fontSize: "20px" }}>
            Build Environment
          </b>
        </Typography>

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
        <Table columns={columns} rows={tbData} getRowId={(row) => row.id} />
      </div>
      <AddEnvironmentPop
        addEnvironmentPop={addEnvironmentPop}
        close={setAddEnvironmentPop}
        getBuilEnvironment={getBuilEnvironment}
      />
      <EditEnvironmentPop
        editEnvironmentPop={editEnvironmentPop}
        close={setEditEnvironmentPop}
        row={tbData}
        getBuilEnvironment={getBuilEnvironment}
        editEnvironmentData ={editEnvironmentData}
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
