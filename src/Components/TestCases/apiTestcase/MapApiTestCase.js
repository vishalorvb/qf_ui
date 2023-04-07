/*
This component required following parameters and map selected Api to testcase
Required parameters:

module_id: 
project_id: 
testcase_id:

*/




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

export let MapAPiTestCaseData = {
  module_id: 0,
  project_id: 0,
  testcase_id: 0
}

function MapApiTestCase() {
  const { setHeader } = useHead();
  const [preSelectedElement, setPreSelectedElement] = useState([]);
  const [api, setApi] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  // const location = useLocation();
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
      .get(`/qfservice/testcase/${MapAPiTestCaseData?.testcase_id}/apis`)
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
      module_id: MapAPiTestCaseData.module_id,
      project_id: MapAPiTestCaseData.project_id,
      testcase_id: MapAPiTestCaseData.testcase_id,
      testcase_sprints: [],
      apis_list: preSelectedElement.map((id) => {
        return { api_id: id };
      }),
    };

    axios.post(`/qfservice/addApisToTestcase`, testcasedata).then((resp) => {
      console.log(resp);
      resp.data.error === null && setSuccess(true);
      setTimeout(() => {
        resp.data.error === null && navigate("/testcase");
      }, 1000);
    });
  }

  function handleClick() {
    console.log("called")
    if (preSelectedElement.length === 0) {
      setError(true);
      return;
    } else {
      createTestcase();
    }
  }

  useEffect(() => {
    return () => {
      MapAPiTestCaseData.module_id = 0
      MapAPiTestCaseData.project_id = 0
      MapAPiTestCaseData.testcase_id = 0
    }
  }, [])
  return (
    <>

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
        msg={"Api Mapped successfully."}
        severity="success"
      />
    </>
  );
}

export default MapApiTestCase;
