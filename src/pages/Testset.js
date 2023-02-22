import {
  Autocomplete,
  Button,
  Grid,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Table from "../CustomComponent/Table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { getTestsets } from "../Services/TestsetService";
import { getProject } from "../Services/ProjectService";
import useHead from "../hooks/useHead";
import { getModules } from "../Services/ProjectService";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { axiosPrivate } from "../api/axios";

function Testset() {
  const [usersObject, setUsersObject] = useState([]);
  const [testsetObject, setTestsetObject] = useState([]);
  const [projectObject, setProjectObject] = useState([]);
  const [workflowsObject, setWorkflowsObject] = useState([]);
  const [workflowId, setWorkflowId] = useState(0);
  const [projectId, setProjectId] = useState(null);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editObject, setEditObject] = useState([]);
  const [deleteObject, setDeleteObject] = useState([]);
  const navigate = useNavigate();

  const addUserHandler = (e) => {
    // setOpen(true);
    navigate("createTestcase", { state: e });
  };

  const addUser1Handler = (e) => {
    // setOpen(true);
    navigate("AddTestcaseToTestset", { state: e });
  };

  const editUserHandler = (e) => {
    // setOpenEdit(true);
    // setEditObject(e);
    navigate("AddTestcaseToTestset", { state: e });
  };

  const deleteUserHandler = (e) => {
    setOpenDelete(true);
    setDeleteObject(e);
  };

  const onChangeHandler = () => {
    setOpen1(true);
  };

  // const getTestsets = () => {
  //   axios
  //     .get(`http://10.11.12.240/qfservice/workflow/1031/api/testsets`)
  //     .then((Response) => {
  //       var response = Response.data;
  //       console.log(response.data);
  //       setTestsetObject(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     });
  // };
  console.log(projectId);
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
            <Tooltip title="Add Testcase">
              <IconButton
                onClick={(e) => {
                  addUser1Handler(param.row);
                }}
              >
                <AddOutlinedIcon></AddOutlinedIcon>
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
                  deleteUserHandler(param.row);
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
    // getTestsets(setTestsetObject, projectId, workflowId);
    axiosPrivate
      .get(
        `qfservice/webtestset/api/v1/projects/${projectId}/workflow/${workflowId}/web/testsets`
      )
      .then((res) => {
        console.log(res.data.data);
        setTestsetObject(res.data.result);
      });
  };

  useEffect(() => {
    getProject(setProjectObject);
  }, []);

  useEffect(() => {
    getModules(setWorkflowsObject, projectId);
  }, [projectId, workflowId]);

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
          </Grid>
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
      {/* {open1 ? */}
      <div
        className="recenttable"
        style={{ flot: "right", marginBottom: "10px" }}
      ></div>
      <div className="datatable" style={{ marginTop: "20px" }}>
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
