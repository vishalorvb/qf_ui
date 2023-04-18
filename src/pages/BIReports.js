import { Autocomplete, Button, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "../api/axios";
import Table from "../CustomComponent/Table";
import useAuth from "../hooks/useAuth";
import useHead from "../hooks/useHead";
import { getProject } from "../Services/ProjectService";

function BIReports() {
  const [selectedProject, setSelectedProject] = useState({
    project_name: "Project",
  });
  const [selectedTestset, setSelectedTestset] = useState({});
  const [project, setProject] = useState([]);
  const [testset, setTestset] = useState([]);
  const navigate = useNavigate();
  const { auth } = useAuth();

  const phaseHandler = (e) => {
    navigate("phases", {
    //   state: {
    //     param1: e,
    //     param2: selectedProject?.project_id,
    //   },
    });

  };

  const cyclesHandler = (e) => {
    // navigate("createTestset", {
    //   state: {
    //     param1: e,
    //     param2: selectedProject?.project_id,
    //     param3: selectedApplication?.module_id,
    //   },
    // });
  };

  const columns = [
    {
      field: "project_name",
      headerName: "Testset Name",
      flex: 4,
      headerAlign: "left",
      sortable: false,
      align: "left",
    },
    {
      field: "_desc",
      headerName: "Testset Description",
      flex: 4,
      headerAlign: "left",
      sortable: false,
      align: "left",
    },
  ];

  useEffect(() => {
    getProject(setProject, auth.userId);
  }, []);
  useEffect(() => {
    setSelectedProject(project[0]);
  }, [project]);
  useEffect(() => {
    setSelectedTestset(testset[0]);
  }, [testset]);

  useEffect(() => {
    selectedProject?.project_id &&
      axios
        .get(
          `qfservice/webtestset/getWebTestsetInfoByProjectIdByApplicationId?project_id=${selectedProject?.project_id}`
        )
        .then((resp) => {
          console.log(resp?.data?.info);
          const testsets = resp?.data?.info ? resp?.data?.info : [];
          setTestset(testsets);
        });
  }, [selectedProject]);

  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Manage BI Reports",
      };
    });
  }, []);

  return (
    <>
      <Grid container>
        <Grid
          item
          container
          justifyContent="flex-start"
          mb={3}
          spacing={2}
          md={12}
        >
          <Grid item md={2}>
            <label for="">
              Projects <span className="importantfield">*</span>
            </label>
            <Autocomplete
              disablePortal
              disableClearable
              id="project_id"
              options={project}
              value={selectedProject || null}
              sx={{ width: "100%" }}
              getOptionLabel={(option) => option.project_name}
              onChange={(e, value) => {
                setSelectedProject(value);
              }}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input type="text" {...params.inputProps} />
                </div>
              )}
            />
          </Grid>
          <Grid item md={2}>
            <label for="">
              Testsets <span className="importantfield">*</span>
            </label>
            <Autocomplete
              disablePortal
              disableClearable
              id="testset_id"
              options={testset}
              value={selectedTestset || null}
              sx={{ width: "100%" }}
              getOptionLabel={(option) => option.testset_name}
              onChange={(e, value) => {
                setSelectedTestset(value);
              }}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input type="text" {...params.inputProps} />
                </div>
              )}
            />
          </Grid>
          <Grid item md={6} mt={3} ml={12}>
            <Button variant="contained" type="submit">
              Add
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <div for="" style={{backgroundColor:"#009fee", padding:"10px"}}>DRIVEN_WEB </div>
      <Table
        searchPlaceholder="Search Testset"
        columns={columns}
        //   rows={drivenWebTSObject}
        rows={project}
        getRowId={(row) => row.project_id}
      />
      <Stack mt={2} spacing={2} direction="column" mb={3}>
        <p for="">Total Phases {0} <span onClick={() =>phaseHandler()} style={{ color: "#009fee", cursor: "pointer" }}> Click</span></p>
        <p for="">Total Cycles {1} <span onClick={() =>cyclesHandler()} style={{ color: "#009fee", cursor: "pointer" }}> Click</span></p>
      </Stack>
      <div for="" style={{backgroundColor:"#009fee", padding:"10px"}}>Automation Demo </div>
      <Table
        searchPlaceholder="Search Testset"
        columns={columns}
        //   rows={drivenWebTSObject}
        rows={project}
        getRowId={(row) => row.project_id}
      />
      <Stack mt={2} spacing={2} direction="column" mb={3}>
        <p for="">Total Phases {} <span onClick={() =>phaseHandler()} style={{ color: "#009fee", cursor: "pointer" }}> Click</span></p>
        <p for="">Total Cycles {} <span onClick={() =>cyclesHandler()} style={{ color: "#009fee", cursor: "pointer" }}> Click</span></p>
      </Stack>
      <div for="" style={{backgroundColor:"#009fee", padding:"10px"}}>INF Driven </div>
      <Table
        searchPlaceholder="Search Testset"
        columns={columns}
        //   rows={drivenWebTSObject}
        rows={project}
        getRowId={(row) => row.project_id}
      />
      <Stack mt={2} spacing={2} direction="column" mb={3}>
        <p for="">Total Phases {} <span onClick={() =>phaseHandler()} style={{ color: "#009fee", cursor: "pointer" }}> Click</span></p>
        <p for="">Total Cycles {} <span onClick={() =>cyclesHandler()} style={{ color: "#009fee", cursor: "pointer" }}> Click</span></p>
      </Stack>
      <div for="" style={{backgroundColor:"#009fee", padding:"10px"}}>UCX_DRIVEN_ADMIN_IOS_APP</div>
      <Table
        searchPlaceholder="Search Testset"
        columns={columns}
        //   rows={drivenWebTSObject}
        rows={project}
        getRowId={(row) => row.project_id}
      />
      <Stack mt={2} spacing={2} direction="column" mb={3}>
        <p for="">Total Phases {} <span onClick={() =>phaseHandler()} style={{ color: "#009fee", cursor: "pointer" }}> Click</span></p>
        <p for="">Total Cycles {} <span onClick={() =>cyclesHandler()} style={{ color: "#009fee", cursor: "pointer" }}> Click</span></p>
      </Stack>
      <div for="" style={{backgroundColor:"#009fee", padding:"10px"}}>DRIVEN_IOS </div>
      <Table
        searchPlaceholder="Search Testset"
        columns={columns}
        //   rows={drivenWebTSObject}
        rows={project}
        getRowId={(row) => row.project_id}
      />
      <Stack mt={2} spacing={2} direction="column" mb={3}>
        <p for="">Total Phases {} <span onClick={() =>phaseHandler()} style={{ color: "#009fee", cursor: "pointer" }}> Click</span></p>
        <p for="">Total Cycles {} <span onClick={() =>cyclesHandler()} style={{ color: "#009fee", cursor: "pointer" }}> Click</span></p>
      </Stack>
      <div for="" style={{backgroundColor:"#009fee", padding:"10px"}}>DRIVEN_ANDROID </div>
      <Table
        searchPlaceholder="Search Testset"
        columns={columns}
        //   rows={drivenWebTSObject}
        rows={project}
        getRowId={(row) => row.project_id}
      />
      <Stack mt={2} spacing={2} direction="column" mb={3}>
        <p for="">Total Phases {} <span onClick={() =>phaseHandler()} style={{ color: "#009fee", cursor: "pointer" }}> Click</span></p>
        <p for="">Total Cycles {} <span onClick={() =>cyclesHandler()} style={{ color: "#009fee", cursor: "pointer" }}> Click</span></p>
      </Stack>
    </>
  );
}

export default BIReports;
