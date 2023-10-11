import { Grid, Button, IconButton, Tooltip, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "../../CustomComponent/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { SelectElement, useForm } from "react-hook-form-mui";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ConfirmPop from "../../CustomComponent/ConfirmPop";
import { postValue } from "./EditTestLinkProject";
import LinkFeatureMenu from "./LinkFeatureMenu";
import useHead from "../../hooks/useHead";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ProjectnApplicationSelector from "../ProjectnApplicationSelector";
import { qfservice } from "../../Environment";

const LinkProjectExecution = () => {
  const [execLoc, setExecLoc] = useState("local");
  const [execEnvList, setExecEnvList] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [snack, setSnack] = useState(false);
  const [testsetData, setTestsetData] = useState([]);
  const [selectedTestsetData, setSelectedTestsetData] = useState([]);
  const [specificationId, setSpecificationId] = useState();
  const [successDelete, setSuccessDelete] = useState(false);
  const {
    setHeader,
    globalProject,
    setglobalProject,
    globalApplication,
    setglobalApplication,
  } = useHead();
  const [buildEnvList, setBuildEnvList] = useState([]);
  const [buildEnvId, setBuildEnvId] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [remoteAPiFails, setRemoteAPiFails] = useState(false);
  const [jarConnected, setJarConnected] = useState(false);
  const [clientInactive, setClientInactive] = useState(false);
  const [remoteExecutionsuccess, setRemoteExecutionsuccess] = useState(false);
  // coselectedProjectnst [, setglobalProject] = useState({
  //   project_name: "Project",
  // });
  // const [globalApplication, setglobalApplication] = useState({});
  let projectId = location.state?.projectId;
  let applicationId = location.state?.applicationId;
  const { auth } = useAuth();
  const schema = yup.object().shape({
    executionLoc: yup.string().required(),
    buildenvName: yup.string().required(),
    browser: yup.array().required(),
    commitMsg: execLoc !== "local" && yup.string().required(),
  });
  console.log(applicationId);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  let user_id = auth?.userId;

  console.log(execLoc);

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Link Project Execution",
      };
    });
    return () => {
      setHeader((ps) => {
        return {
          ...ps,
          name: "Testset Execution",
        };
      });
    };
  }, []);

  useEffect(() => {
    getExecutionEnvironment();
  }, [projectId, applicationId]);

  function getExecutionEnvironment() {
    applicationId !== undefined &&
      axios
        .get(
          `${qfservice}/qfservice/execution-environment?module_id=${applicationId}&project_id=${projectId}`
        )
        .then((resp) => {
          const execEnv = resp?.data?.data;
          setExecEnvList(() => {
            return execEnv.map((ee) => {
              return { id: ee.value, label: ee.name };
            });
          });
        });
  }

  useEffect(() => {
    getTestsets();
    console.log(selectedTestsetData);
  }, []);

  function getTestsets() {
    axios
      .get(
        `qfservice/webtestset/getWebTestsetInfoByProjectIdByApplicationId?project_id=${globalProject.project_id}&module_id=${globalApplication.module_id}`
      )
      .then((resp) => {
        // const testsets = resp?.data?.info
        // console.log(resp.data.info)
        if (resp.data.info != null) {
          setTestsetData(resp?.data?.info);
        }
      });
  }

  // console.log(applicationId)
  const columns = [
    {
      field: " ",
      headerName: " ",
      flex: 0.5,
      sortable: false,
      align: "left",
      renderCell: (param) => {
        return (
          <>
            <input
              style={{ minHeight: "20px" }}
              type="radio"
              name="testset"
              onClick={() => setSelectedTestsetData(param.row.testset_id)}
            ></input>
          </>
        );
      },
    },
    {
      field: "testset_name",
      headerName: "Testset",
      flex: 2,
      sortable: false,
      align: "left",
    },
    {
      field: "testset_desc",
      headerName: "Description",
      flex: 2,
      sortable: false,
      align: "left",
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
                  console.log(param.row);
                  postValue.testset_id = param.row.testset_id;
                  postValue.testset_name = param.row.testset_name;
                  postValue.testset_desc = param.row.testset_desc;
                  postValue.cucumber_tags = param.row.cucumber_tags;
                  postValue.module_id = param.row.module_id;
                  postValue.project_id = globalProject.project_id;

                  console.log(postValue);
                  navigate("/EditLinkTestset", {
                    // state: {
                    //   projectId: location.state?.projectId,
                    //   applicationId: applicationId,
                    //   param: param.row
                    // },
                  });
                }}
              >
                <EditIcon style={{ color: "black" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  console.log(param.row.testset_id);
                  setSpecificationId(param.row.testset_id);
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

  // console.log(specificationId)
  function deleteApiRequest(specificationId) {
    axios
      .delete(
        `${qfservice}/qfservice/webtestset/deleteWebTestset?testset_id=${specificationId}`
      )
      .then((res) => {
        // console.log(res.data.message);
        if (res.data.message == "Testset deleted succesfully.") {
          setSuccessDelete(true);
          setTimeout(() => {
            setSuccessDelete(false);
          }, 3000);
          getTestsets();
        }
      })
      .catch((res) => {
        console.log(res);
      });
    setConfirm(false);
  }

  function LinkExecute(params) {
    if (selectedTestsetData?.length != 0) {
      console.log(params?.executionLoc);

      const executionData = {
        testset_id: selectedTestsetData,
        run_environment: "jenkins",
      };
      // console.log(executionData)
      axios
        .post(
          `${qfservice}/qfservice/ExecuteLinkTestset?user_id=${user_id}&project_id=${projectId}`,
          executionData
        )
        .then((resp) => {
          resp?.status === "FAIL" && setRemoteAPiFails(true);
          execLoc === "jenkins"
            ? resp?.status === "SUCCESS" &&
              axios
                .postForm(`http://127.0.0.1:8765/connect`, {
                  data: resp?.data?.info,
                  jarName: `code`,
                })
                .then((resp) => {
                  setJarConnected(true);
                })
                .catch((err) => {
                  err.message === "Network Error" && setClientInactive(true);
                })
            : setRemoteExecutionsuccess(true);
        });
    } else {
      setSnack(true);
      setTimeout(() => {
        setSnack(false);
      }, 3000);
    }
  }

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing="1"
        mt={1}
      >
        <Grid item md={8} container spacing={1} display="flex">
          <Grid item md={2}>
            <label>Execution Location</label>
            <SelectElement
              name="executionLoc"
              // label="Execution Location"
              size="small"
              fullWidth
              control={control}
              onChange={(e) => setExecLoc(e)}
              options={execEnvList}
            />
          </Grid>
          <Grid item md={2} mt={2.3}>
            {" "}
            <LinkFeatureMenu buildEnvId={buildEnvId} />{" "}
          </Grid>
          <Grid item md={2} mt={2.3}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                navigate("/AddLinkTestset", {
                  state: {
                    projectId: globalProject.project_id,
                    applicationId: globalApplication.module_id,
                  },
                });
              }}
              style={{ backgroundColor: "#009fee" }}
            >
              Add Testset
            </Button>
          </Grid>
        </Grid>
        <Grid item md={1.3} mt={2.3}>
          <Button
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#009fee" }}
            onClick={LinkExecute}
          >
            Execute
          </Button>
        </Grid>
      </Grid>
      <div className="datatable" style={{ marginTop: "15px" }}>
        <Table
          columns={columns}
          hideSearch={true}
          rows={testsetData}
          getRowId={(row) => row?.testset_id}
        />
      </div>

      {confirm && (
        <ConfirmPop
          open={true}
          handleClose={(e) => setConfirm(false)}
          heading={"Delete Testset"}
          message={"Are you sure you want to delete the Testset ?"}
          onConfirm={(e) => deleteApiRequest(specificationId)}
        ></ConfirmPop>
      )}
      <SnackbarNotify
        open={successDelete}
        close={setSuccessDelete}
        msg="Deleted Testset successfully"
        severity="success"
      />
      <SnackbarNotify
        open={snack}
        close={setSnack}
        msg="Please select Testset."
        severity="error"
      />
    </>
  );
};

export default LinkProjectExecution;
