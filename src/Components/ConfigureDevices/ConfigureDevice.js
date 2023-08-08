import React from "react";
import Table from "../../CustomComponent/Table";
import { useState, useEffect } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton, Tooltip, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router";
import useHead from "../../hooks/useHead";
import AddConfigurationPopUp from "./AddConfigurationPopUp";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import ConfirmPop from "../../CustomComponent/ConfirmPop";
import { useLocation } from "react-router-dom";

const ConfigureDevice = () => {
  const [configurations, setConfigurations] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [specificationId, setSpecificationId] = useState();
  const [popup, setPopup] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [snack, setSnack] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [fetchSuccessMsg, setFetchSuccessMsg] = useState(false);
  const [fetchFailMsg, setFetchFailMsg] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const projectId = location?.state?.projectId;
  const { setHeader } = useHead();
  const columns = [
    {
      field: "name",
      headerName: "Configurations",
      flex: 6,
      sortable: false,
      align: "left",
      renderCell: (param) => {
        return (
          <>
            <span
              className="nameColumn"
              onClick={() => {
                setSpecificationId(param.row.specificationId);
                location.state.pathname == "/TestcaseExecution" &&
                  navigate("/TestcaseExecution/UpdateDevice", {
                    state: {
                      id: param.row.specificationId,
                      projectId: projectId,
                    },
                  });

                location.state.pathname == "/TestsetExecution" &&
                  navigate("/TestsetExecution/UpdateDevice", {
                    state: {
                      id: param.row.specificationId,
                      projectId: projectId,
                    },
                  });
              }}
            >
              {param.row.name}
            </span>
          </>
        );
      },
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      align: "left",
      renderCell: (param) => {
        return (
          <>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  setSpecificationId(param.row.specificationId);
                  console.log(specificationId);
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
  function getConfigurations(projectId) {
    axios
      .get(`/qfservice/mobileconfiguration?project_id=${projectId}`)
      .then((res) => {
        if (res.data.data.length > 0) {
          setConfigurations(res?.data?.data);
          setFetchSuccessMsg(true);
          setTimeout(() => {
            setFetchSuccessMsg(false);
          }, 3000);
        } else {
          setConfigurations([]);
          setFetchFailMsg(true);
          setTimeout(() => {
            setFetchFailMsg(false);
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function deleteApiRequest(specificationId) {
    axios
      .delete(
        `/qfservice/mobileconfiguration/${specificationId}/deleteconfiguration`
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == "SUCCESS") {
          setSuccessDelete(true);
          getConfigurations(projectId);
          setTimeout(() => {
            setSuccessDelete(false);
          }, 3000);
          getConfigurations(selectedProject?.project_id);
        }
      })
      .catch((res) => {
        console.log(res);
      });
    setConfirm(false);
  }
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Configurations",
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
    getConfigurations(projectId);
  }, [projectId]);

  useEffect(() => {
    setSpecificationId(specificationId);
  }, [specificationId]);
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button
          variant="contained"
          onClick={() => {
            location.state.pathname == "/TestcaseExecution" &&
              navigate("/TestcaseExecution/AddConfigureDevice", {
                state: {
                  projectId: projectId,
                },
              });

            location.state.pathname == "/TestsetExecution" &&
              navigate("/TestsetExecution/AddConfigureDevice", {
                state: {
                  projectId: projectId,
                },
              });
          }}
        >
          Add Configuration
        </Button>
      </Grid>
      <Table
        searchPlaceholder="Search Configurations"
        rows={configurations}
        columns={columns}
        hidefooter={true}
        getRowId={(row) => row.specificationId}
        hideSearch={true}
      ></Table>
      {popup && (
        <AddConfigurationPopUp
          open={true}
          close={setPopup}
          snackbar={setSnack}
          projectId={projectId}
          setSnack={setSnack}
          getConfigurations={getConfigurations}
        />
      )}
      {successMsg && (
        <SnackbarNotify
          open={successMsg}
          close={setSuccessMsg}
          msg="Successfully setted as default"
          severity="success"
        />
      )}
      {fetchSuccessMsg && (
        <SnackbarNotify
          open={fetchSuccessMsg}
          close={setFetchSuccessMsg}
          msg="Configurations fetched successfully"
          severity="success"
        />
      )}
      {fetchFailMsg && (
        <SnackbarNotify
          open={fetchFailMsg}
          close={setFetchFailMsg}
          msg="No configurations found for this project"
          severity="error"
        />
      )}
      {successDelete && (
        <SnackbarNotify
          open={successDelete}
          close={setSuccessDelete}
          msg="Deleted configuration successfully"
          severity="success"
        />
      )}
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

export default ConfigureDevice;
