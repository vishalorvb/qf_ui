import {Autocomplete, Button, Grid, IconButton, Paper, Tooltip} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Table from "../CustomComponent/Table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import { useNavigate } from "react-router-dom";
import { getTestsets } from "../Services/TestsetService";
import { getProject } from "../Services/ProjectService";
import useHead from "../hooks/useHead";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { axiosPrivate } from "../api/axios";
import useAuth from "../hooks/useAuth";
import DeleteTestset from "../Components/TestSet/DeleteTestset";
import SnackbarNotify from '../CustomComponent/SnackbarNotify';

function Testset() {
  const [testsetObject, setTestsetObject] = useState([]);
  const [projectObject, setProjectObject] = useState([]);
  const [projectId, setProjectId] = useState(null);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openExecute, setOpenExecute] = useState(false);
  const [editObject, setEditObject] = useState([]);
  const [deleteObject, setDeleteObject] = useState([]);
  const [executeObject, setExecuteObject] = useState([]);
  const [delSuccessMsg, setDelSuccessMsg] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();
  console.log(auth.info);
  const loggedInId = auth.info.id;

  const addUserHandler = (e) => {
    // setOpen(true);
    navigate("createTestcase", { state: e });
  };

  const editUserHandler = (e) => {
    // setOpenEdit(true);
    // setEditObject(e);
    navigate("AddTestcaseToTestset", { state: e });
  };

  const deleteUserHandler = (e) => {
    console.log(e.testset_id);
    setOpenDelete(true);
    setDeleteObject(e);
  };

  const executeHandler = (e) => {
    setOpenExecute(true);
    setExecuteObject(e);
  };

  const onChangeHandler = () => {
    setOpen1(true);
  };
  
  const columns = [
    // { headerName: "S.No",field:'sno' ,valueGetter: (index) => index.api.getRowIndex(index.row.id) + 1, flex: 1, headerAlign: "center", sortable: false, align: 'center' },
    {
      field: "testset_name",
      headerName: "Testset Name",
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: "left",
    },
    {
      field: "testset_desc",
      headerName: "Testset Description",
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: "left",
    },
    {
      field: "",
      headerName: "Actions",
      flex: 3,
      sortable: false,
      renderCell: (param) => {
        return (
          <>
            <Tooltip title="Delete">
              <IconButton
                onClick={(e) => {
                  deleteUserHandler(param.row);
                }}
              >
                <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Testcase">
              <IconButton
                onClick={(e) => {
                  editUserHandler(param.row);
                }}
              >
                <EditOutlinedIcon></EditOutlinedIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Execute">
              <IconButton
                onClick={(e) => {
                  executeHandler(param.row);
                }}
              >
                <PlayCircleOutlinedIcon></PlayCircleOutlinedIcon>
              </IconButton>
            </Tooltip>
          </>
        );
      },
      headerAlign: "center",
      align: "center",
    },
  ];

  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Testset",
        plusButton: true,
        plusCallback: addUserHandler,
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

  const submit = () => {
    axiosPrivate
      .get(
        `qfservice/webtestset/getWebTestsetInfoByProjectId?project_id=${projectId}`
      )
      .then((res) => {
        console.log(res.data.info);
        setTestsetObject(res.data.info);
      });
  };

  useEffect(() => {
    getProject(setProjectObject,loggedInId);
  }, []);

  return (
    <div>
      <Paper
        elevation={0}
        sx={{ padding: "2px", marginTop: "10px", marginBottom: "10px" }}
      >
        <Container
          component={"div"}
          maxWidth={false}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "10px",
            justifyContent: "flex-start",
          }}
        >
          <Grid
            container
            item
            xs={12}
            sm={6}
            md={4}
            xl={4}
            sx={{ marginBottom: "10px" }}
          >
            <Grid item xs={6} sm={6} md={3.5} xl={4}>
              <label>
                Project <span className="importantfield">*</span>:
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={8} xl={7}>
              <Autocomplete
                size="small"
                options={projectObject}
                getOptionLabel={(option) => option.project_name}
                onChange={(e, value) => {
                  // Uid.current = value.id;
                  setProjectId(value.project_id);
                  onChangeHandler();
                }}
                noOptionsText={"User not found"}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      name="userAutocomplete"
                      {...params.inputProps}
                      placeholder="Please Select"
                    />
                  </div>
                )}
              />
            </Grid>
          </Grid>
          {/* <Grid
            container
            item
            xs={12}
            sm={6}
            md={4}
            xl={4}
            sx={{ marginBottom: "10px" }}
          >
            <Grid item xs={6} sm={6} md={3.5} xl={4}>
              <label>
                Workflow <span className="importantfield">*</span>:
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={8} xl={7}>
              <Autocomplete
                size="small"
                options={workflowsObject}
                getOptionLabel={(option) => option.module_name}
                onChange={(e, value) => {
                  // Workflow_Id.current = value.module_id;
                  setWorkflowId(value.module_id);
                }}
                noOptionsText={"Workflows not found"}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      name="workflowAutocomplete"
                      {...params.inputProps}
                      placeholder="Please Select"
                    />
                  </div>
                )}
              />
            </Grid>
          </Grid> */}
          <Button
            variant="contained"
            onClick={submit}
            startIcon={<SearchOutlinedIcon />}
            // sx={{
            //   marginLeft: "45%",
            //   marginRight: "auto",
            //   marginBottom: "10px",
            //   marginTop: "25px",
            // }}
          >
            Search
          </Button>
        </Container>
      </Paper>
      <SnackbarNotify open={delSuccessMsg} close={setDelSuccessMsg} msg="Testset deleted successfully" severity="success"/>
      <div
        className="recenttable"
        style={{ flot: "right", marginBottom: "10px" }}
      ></div>
      <div className="datatable" style={{ marginTop: "20px" }}>
      {openDelete ? <DeleteTestset object={deleteObject} openDelete={openDelete} setOpenDelete={setOpenDelete}  setDelSuccessMsg={setDelSuccessMsg} getTestsets={submit}/> : ""}
        <Table
          columns={columns}
          rows={testsetObject}
          // hidefooter={false}
          getRowId={(row) => row.testset_id}
        />
      </div>
      {/* : ""} */}
    </div>
  );
}

export default Testset;
