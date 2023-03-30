import { Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import Table from "../../../CustomComponent/Table";
import { getApis } from "../../../Services/ApiService";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import SnackbarNotify from "../../../CustomComponent/SnackbarNotify";
import { useLocation } from "react-router-dom";
import useHead from "../../../hooks/useHead";

function ApiTestcase() {
  const { setHeader } = useHead();
  const [preSelectedElement, setPreSelectedElement] = useState([]);
  const [api, setApi] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const columns = [
    {
      field: "api_name",
      headerName: "API Name",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "api_description",
      headerName: "Description",
      flex: 3,
      sortable: false,
      align: "left",
    },
  ];

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Testcases API Update",
      };
    });
    return () =>
      setHeader((ps) => {
        return {
          ...ps,
          name: "",
        };
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios
      .get(`/qfservice/testcase/${location?.state?.testcaseId}/apis`)
      .then((resp) => {
        setApi(resp.data.data.apisList);
        setPreSelectedElement(() =>
          resp.data.data.apisList
            .filter((api) => api.is_selected === true)
            .map((api) => api.api_id)
        );
      });
  }, []);

  function createTestcase() {
    const testcasedata = {
      module_id: location.state.applicationId,
      project_id: location.state.projectId,
      testcase_id: location.state.testcaseId,
      testcase_sprints: [],
      apis_list: preSelectedElement.map((id) => {
        return { api_id: id };
      }),
    };

    axios.post(`/qfservice/addApisToTestcase`, testcasedata).then((resp) => {
      console.log(resp);
      resp.data.error === null && setSuccess(true);
      setTimeout(() => {
        resp.data.error === null && navigate(-1);
      }, 1000);
    });
  }

  function handleClick() {
    if (preSelectedElement.length === 0) {
      setError(true);
      return;
    } else {
      createTestcase();
    }
  }
  return (
    <>
      {/* <Grid container justifyContent="flex-start" columnSpacing={2}>
          <Grid item xs={3} md={3} lg={3}>

            <select
              onChange={e => { testcasedata.testcase_sprints[0].sprint_name = e.target.value }}
            >
              <option> Select</option>
              <option value="Sprint 1"> Sprint 1</option>
              <option value="Sprint 2"> Sprint 2</option>
              <option value="Sprint 3"> Sprint 3</option>
            </select>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <select
              onChange={e => { testcasedata.testcase_sprints[0].issue_id = e.target.value }}
            >
              <option> isssues</option>
              <option value="1" > isssue 1</option>
              <option value="2"> isssue 2</option>
              <option value="3"> isssue 3</option>
            </select>
          </Grid>
        </Grid> */}
      <Table
        rows={api}
        columns={columns}
        hidefooter={true}
        checkboxSelection={true}
        getRowId={(row) => row.api_id}
        selectionModel={preSelectedElement}
        setSelectionModel={setPreSelectedElement}
      ></Table>
      <Grid container justifyContent="flex-end">
        <Grid item xs={3} md={2} lg={1.2}>
          <Button variant="contained" onClick={handleClick}>
            Save
          </Button>
        </Grid>
      </Grid>
      <SnackbarNotify
        open={error}
        close={setError}
        msg={"Please select atleast one API!"}
        severity="error"
      />
      <SnackbarNotify
        open={success}
        close={setSuccess}
        msg={"Testcase created successfully."}
        severity="success"
      />
    </>
  );
}

export default ApiTestcase;
