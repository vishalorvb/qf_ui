import { Autocomplete, Button, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "../api/axios";
import AccordionTemplate from "../CustomComponent/AccordionTemplate";
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
    navigate("cycles", {
      //   state: {
      //     param1: e,
      //     param2: selectedProject?.project_id,
      //     param3: selectedApplication?.module_id,
      //   },
    });
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
            <label htmlFor="">
              Projects <span className="importantfield">*</span>
            </label>
            <Autocomplete
              disablePortal
              disableClearable
              id="project_id"
              options={project}
              value={selectedProject || null}
              sx={{ width: "100%" }}
              getOptionLabel={(option) => (option.project_name ? option.project_name : "")}
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
            <label htmlFor="">
              Testsets <span className="importantfield">*</span>
            </label>
            <Autocomplete
              disablePortal
              disableClearable
              id="testset_id"
              options={testset}
              value={selectedTestset || null}
              sx={{ width: "100%" }}
              getOptionLabel={(option) => (option.testset_name ? option.testset_name : "")}
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
          <Grid item md={6} mt={2.5} ml={3}>
            <Button variant="contained" type="submit">
              Add
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <AccordionTemplate name="DRIVEN_WEB" defaultState={true}>
        <Table
          searchPlaceholder="Search Testset"
          columns={columns}
          //   rows={drivenWebTSObject}
          rows={project}
          getRowId={(row) => row.project_id}
        />
        <Stack mt={2} spacing={2} direction="column" mb={3}>
          <p for="">
            Total Phases {0}{" "}
            <span
              onClick={() => phaseHandler()}
              style={{ color: "#009fee", cursor: "pointer" }}
            >
              {" "}
              Click
            </span>
          </p>
          <p for="">
            Total Cycles {1}{" "}
            <span
              onClick={() => cyclesHandler()}
              style={{ color: "#009fee", cursor: "pointer" }}
            >
              {" "}
              Click
            </span>
          </p>
        </Stack>
      </AccordionTemplate>
      <AccordionTemplate name="Automation Demo" defaultState={true}>
        <Table
          searchPlaceholder="Search Testset"
          columns={columns}
          //   rows={drivenWebTSObject}
          rows={project}
          getRowId={(row) => row.project_id}
        />
        <Stack mt={2} spacing={2} direction="column" mb={3}>
          <p for="">
            Total Phases {}{" "}
            <span
              onClick={() => phaseHandler()}
              style={{ color: "#009fee", cursor: "pointer" }}
            >
              {" "}
              Click
            </span>
          </p>
          <p for="">
            Total Cycles {}{" "}
            <span
              onClick={() => cyclesHandler()}
              style={{ color: "#009fee", cursor: "pointer" }}
            >
              {" "}
              Click
            </span>
          </p>
        </Stack>
      </AccordionTemplate>
      <AccordionTemplate name="INF Driven" defaultState={true}>
        <Table
          searchPlaceholder="Search Testset"
          columns={columns}
          //   rows={drivenWebTSObject}
          rows={project}
          getRowId={(row) => row.project_id}
        />
        <Stack mt={2} spacing={2} direction="column" mb={3}>
          <p for="">
            Total Phases {}{" "}
            <span
              onClick={() => phaseHandler()}
              style={{ color: "#009fee", cursor: "pointer" }}
            >
              {" "}
              Click
            </span>
          </p>
          <p for="">
            Total Cycles {}{" "}
            <span
              onClick={() => cyclesHandler()}
              style={{ color: "#009fee", cursor: "pointer" }}
            >
              {" "}
              Click
            </span>
          </p>
        </Stack>
      </AccordionTemplate>
      <AccordionTemplate name="UCX_DRIVEN_ADMIN_IOS_APP" defaultState={true}>
        <Table
          searchPlaceholder="Search Testset"
          columns={columns}
          //   rows={drivenWebTSObject}
          rows={project}
          getRowId={(row) => row.project_id}
        />
        <Stack mt={2} spacing={2} direction="column" mb={3}>
          <p for="">
            Total Phases {}{" "}
            <span
              onClick={() => phaseHandler()}
              style={{ color: "#009fee", cursor: "pointer" }}
            >
              {" "}
              Click
            </span>
          </p>
          <p for="">
            Total Cycles {}{" "}
            <span
              onClick={() => cyclesHandler()}
              style={{ color: "#009fee", cursor: "pointer" }}
            >
              {" "}
              Click
            </span>
          </p>
        </Stack>
      </AccordionTemplate>
      <AccordionTemplate name="DRIVEN_IOS" defaultState={true}>
        <Table
          searchPlaceholder="Search Testset"
          columns={columns}
          //   rows={drivenWebTSObject}
          rows={project}
          getRowId={(row) => row.project_id}
        />
        <Stack mt={2} spacing={2} direction="column" mb={3}>
          <p for="">
            Total Phases {}{" "}
            <span
              onClick={() => phaseHandler()}
              style={{ color: "#009fee", cursor: "pointer" }}
            >
              {" "}
              Click
            </span>
          </p>
          <p for="">
            Total Cycles {}{" "}
            <span
              onClick={() => cyclesHandler()}
              style={{ color: "#009fee", cursor: "pointer" }}
            >
              {" "}
              Click
            </span>
          </p>
        </Stack>
      </AccordionTemplate>
      <AccordionTemplate name="DRIVEN_ANDROID" defaultState={true}>
      <Table
        searchPlaceholder="Search Testset"
        columns={columns}
        //   rows={drivenWebTSObject}
        rows={project}
        getRowId={(row) => row.project_id}
      />
      <Stack mt={2} spacing={2} direction="column" mb={3}>
        <p for="">
          Total Phases {}{" "}
          <span
            onClick={() => phaseHandler()}
            style={{ color: "#009fee", cursor: "pointer" }}
          >
            {" "}
            Click
          </span>
        </p>
        <p for="">
          Total Cycles {}{" "}
          <span
            onClick={() => cyclesHandler()}
            style={{ color: "#009fee", cursor: "pointer" }}
          >
            {" "}
            Click
          </span>
        </p>
      </Stack>
      </AccordionTemplate>
    </>
  );
}

export default BIReports;
