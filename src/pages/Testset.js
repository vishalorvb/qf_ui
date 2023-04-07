import { IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "../CustomComponent/Table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate } from "react-router-dom";
import useHead from "../hooks/useHead";
import axios, { axiosPrivate } from "../api/axios";
import useAuth from "../hooks/useAuth";
import DeleteTestset from "../Components/TestSet/DeleteTestset";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";
import ProjectnApplicationSelector from "../Components/ProjectnApplicationSelector";
import TestcaseSelectAndExecute from "../Components/Execution/TestcaseSelectAndExecute";
import AirplayIcon from "@mui/icons-material/Airplay";

function Testset() {
  const [testsetObject, setTestsetObject] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openExecute, setOpenExecute] = useState(false);
  const [deleteObject, setDeleteObject] = useState([]);
  const [executeObject, setExecuteObject] = useState([]);
  const [delSuccessMsg, setDelSuccessMsg] = useState(false);
  const [selectedProject, setSelectedProject] = useState({
    project_name: "Project",
  });
  const [selectedApplication, setSelectedApplication] = useState({});
  const navigate = useNavigate();
  const { auth } = useAuth();
  console.log(auth.info);
  const loggedInId = auth.info.id;

  const createTestcaseHandler = (e) => {
    console.log(selectedProject?.project_id);
    console.log(selectedApplication?.module_id);
    navigate("createTestset", {
      state: {
        param1: e,
        param2: selectedProject?.project_id,
        param3: selectedApplication?.module_id,
      },
    });
  };

  const editTestcaseHandler = (e) => {
    navigate("AddTestcaseToTestset", {
      state: {
        param1: e,
        param2: selectedProject?.project_id,
        param3: selectedApplication?.module_id,
      },
    });
  };

  const deleteTestcaseHandler = (e) => {
    console.log(e.testset_id);
    setOpenDelete(true);
    setDeleteObject(e);
  };

  function onChangeHandler() {
    axios
      .get(
        `qfservice/webtestset/getWebTestsetInfoByProjectIdByApplicationId?project_id=${selectedProject?.project_id}&module_id=${selectedApplication?.module_id}`
      )
      .then((resp) => {
        const testsets = resp?.data?.info ? resp?.data?.info : [];
        setTestsetObject(testsets);
      });
  }

  const columns = [
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
    // {
    //   field: "",
    //   headerName: "Actions",
    //   flex: 3,
    //   sortable: false,
    //   renderCell: (param) => {
    //     return (
    //       <>
    //         <Tooltip title="Delete">
    //           <IconButton
    //             onClick={(e) => {
    //               deleteTestcaseHandler(param.row);
    //             }}
    //           >
    //             <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
    //           </IconButton>
    //         </Tooltip>
    //         <Tooltip title="Edit Testset">
    //           <IconButton
    //             onClick={(e) => {
    //               editTestcaseHandler(param.row);
    //             }}
    //           >
    //             <EditOutlinedIcon></EditOutlinedIcon>
    //           </IconButton>
    //         </Tooltip>
    //         <Tooltip title="Testcases ReOrder">
    //           <IconButton
    //             onClick={() =>
    //               navigate("UpdateTestcasesOrder", {
    //                 state: {
    //                   applicationId: selectedApplication?.module_id,
    //                   testsetId: param.row.testset_id,
    //                   projectId: selectedProject?.project_id,
    //                 },
    //               })
    //             }
    //           >
    //             <AirplayIcon />
    //           </IconButton>
    //         </Tooltip>
    //       </>
    //     );
    //   },
    //   headerAlign: "center",
    //   align: "center",
    // },
  ];

  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Testset",
        plusButton: false,
        buttonName: "Create Testset",
        plusCallback: ()=>createTestcaseHandler(),
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
  }, [selectedProject,selectedApplication]);

  useEffect(() => {
    selectedApplication?.module_id &&
      axios
        .get(
          `qfservice/webtestset/getWebTestsetInfoByProjectIdByApplicationId?project_id=${selectedProject?.project_id}&module_id=${selectedApplication?.module_id}`
        )
        .then((resp) => {
          const testsets = resp?.data?.info ? resp?.data?.info : [];
          setTestsetObject(testsets);
        });
  }, [selectedApplication]);

  return (
    <div>
      {/* <Paper
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
                Application <span className="importantfield">*</span>:
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={8} xl={7}>
              <Autocomplete
                size="small"
                options={workflowObject}
                getOptionLabel={(option) => option.module_name}
                onChange={(e, value) => {
                  // Workflow_Id.current = value.module_id;
                  setApplicationId(value.module_id);
                }}
                noOptionsText={"Applications not found"}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      name="applicationAutocomplete"
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
      </Paper> */}
      <ProjectnApplicationSelector
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        selectedApplication={selectedApplication}
        setSelectedApplication={setSelectedApplication}
      />
      <SnackbarNotify
        open={delSuccessMsg}
        close={setDelSuccessMsg}
        msg="Testset deleted successfully"
        severity="success"
      />
      <div
        className="recenttable"
        style={{ flot: "right", marginBottom: "10px" }}
      ></div>
      <div className="datatable" style={{ marginTop: "20px" }}>
        {openDelete ? (
          <DeleteTestset
            object={deleteObject}
            openDelete={openDelete}
            setOpenDelete={setOpenDelete}
            setDelSuccessMsg={setDelSuccessMsg}
            getTestsets={onChangeHandler}
          />
        ) : (
          ""
        )}
        {openExecute ? (
          <TestcaseSelectAndExecute
            object={executeObject}
            openDelete={openExecute}
            setOpenDelete={setOpenExecute}
            getTestsets={onChangeHandler}
            projectId={selectedProject?.project_id}
            applicationId={selectedApplication?.module_id}
          />
        ) : (
          ""
        )}
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
