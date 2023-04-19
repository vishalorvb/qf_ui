
import { Grid, Button, IconButton, Tooltip, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Table from '../../CustomComponent/Table'
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { SelectElement, useForm } from 'react-hook-form-mui';
import axios from '../../api/axios';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AddTestSetLinkProject from './AddTestSetLinkProject';
import ConfirmPop from '../../CustomComponent/ConfirmPop';
import { postVal } from './AddTestSetLinkProject';
import { postValue } from './EditTestLinkProject';
import LinkFeatureMenu from './LinkFeatureMenu';
import useHead from '../../hooks/useHead';
import SnackbarNotify from '../../CustomComponent/SnackbarNotify';
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";




const LinkProjectExecution = () => {
  const [execLoc, setExecLoc] = useState("local");
  const [execEnvList, setExecEnvList] = useState([]);
  const [openTestsetPopup, setOpenTestsetPopup] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [testsetEditData, setTestsetEditData] = useState();
  const [testsetData, setTestsetData] = useState([]);
  const [selectedTestsetData, setSelectedTestsetData] = useState([]);
  const [specificationId, setSpecificationId] = useState();
  const [successDelete, setSuccessDelete] = useState(false);
  const { setHeader } = useHead();
  const [buildEnvList, setBuildEnvList] = useState([]);
  const [buildEnvId, setBuildEnvId] = useState()
  const navigate = useNavigate();
  const location = useLocation();
  let projectId = location.state?.projectId;
  let applicationId = location.state?.applicationId;


  console.log(location.state?.projectId);
  console.log(location.state?.applicationId);

  const schema = yup.object().shape({
    executionLoc: yup.string().required(),
    buildenvName: yup.string().required(),
    browser: yup.array().required(),
    commitMsg: execLoc !== "local" && yup.string().required(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

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
    }
  }, []);


  useEffect(() => {
    getEnvironment()
  }, [projectId, applicationId])

  function getEnvironment() {
    applicationId !== undefined &&
      axios
        .get(
          `/qfservice/build-environment?project_id=${projectId}&module_id=${applicationId}`
        )
        .then((resp) => {
          setBuildEnvId(resp?.data?.data[0]?.id)
          const buildEnv = resp?.data?.data;

          setBuildEnvList(() => {
            return buildEnv.map((be) => {
              return {
                id: be.id + "&" + be.name + "&" + be.runtime_variables,
                label: be.name,
              };
            });
          });
        });
  }

  useEffect(() => {
    getTestsets();
    console.log(selectedTestsetData)

  }, []);

  function getTestsets() {
    axios
      .get(
        `qfservice/webtestset/getWebTestsetInfoByProjectIdByApplicationId?project_id=${projectId}&module_id=${applicationId}`
      )
      .then((resp) => {
        // const testsets = resp?.data?.info
        setTestsetData(resp?.data?.info);
      });
  }

  console.log(applicationId)
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

            <input style={{ minHeight: "20px" }} type='radio' name='testset' onClick={() => setSelectedTestsetData(param.row.testset_id)}></input>
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
                  console.log(param.row)
                  postValue.testset_id = param.row.testset_id;
                  postValue.testset_name = param.row.testset_name;
                  postValue.testset_desc= param.row.testset_desc;
                  postValue.cucumber_tags = param.row.cucumber_tags;
                  postValue.module_id = param.row.module_id;
                  postValue.project_id = location.state?.projectId

                  console.log(postValue)
                  navigate("/TestsetExecution/LinkProjectExecution/EditLinkTestset", {
                    // state: {
                    //   projectId: location.state?.projectId,
                    //   applicationId: applicationId,
                    //   param: param.row
                    // },
                  })
                }}
              >
                <EditIcon style={{ color: "black" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  console.log(param.row.testset_id)
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
        `/qfservice/webtestset/deleteWebTestset?testset_id=${specificationId}`
      )
      .then((res) => {
        // console.log(res.data.message);
        if (res.data.message == "Testset deleted succesfully.") {
          setSuccessDelete(true);
          setTimeout(() => {
            setSuccessDelete(false);
          }, 3000);
          getTestsets()
        }
      })
      .catch((res) => {
        console.log(res);
      });
    setConfirm(false);
  }
  function LinkExecute(params) {

  }
  console.log(projectId);
  console.log(applicationId);

  return (
    <>
      <Grid container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing="1"
        mt={1}>
        <Grid item md={8} container spacing={1} display="flex">
          <Grid item md={2}>
            <SelectElement
              name="executionLoc"
              label="Execution Location"
              size="small"
              fullWidth
              control={control}
              onChange={(e) => setExecLoc(e)}
              options={execEnvList}
            /></Grid>
          <Grid item md={2}>
            <Stack direction="column">
              <SelectElement
                name="buildenvName"
                label="build env. Name"
                size="small"
                fullWidth
                control={control}
                options={buildEnvList}
              ></SelectElement>
              <h5
                style={{ cursor: "pointer", color: "#009fee", marginTop: "3px" }}
                onClick={() => {
                  Navigate("/TestcaseExecution/AddEnvironment", {
                    state: { projectId: projectId, applicationId: applicationId },
                  });
                }}
              >
                + Add Environment
              </h5>
            </Stack>
          </Grid>
          <Grid item md={2}> <LinkFeatureMenu buildEnvId={buildEnvId} /> </Grid>
          <Grid item md={2}>
            <Button fullWidth variant="contained"
              onClick={() => {
                navigate("/TestsetExecution/LinkProjectExecution/AddLinkTestset", {
                  state: { projectId: location.state?.projectId, applicationId: applicationId },
                });
              }}
              style={{ backgroundColor: "#009fee" }}
            >
              Add Testset
            </Button></Grid>
        </Grid>
        <Grid item md={1.3}>
          <Button fullWidth variant="contained" style={{ backgroundColor: "#009fee" }} onClick={LinkExecute}>Execute</Button>
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
    </>

  )
}

export default LinkProjectExecution