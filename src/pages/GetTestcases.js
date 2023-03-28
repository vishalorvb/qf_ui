import { Autocomplete, Button, Container, Grid, Paper, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";
import Table from "../CustomComponent/Table";
import useHead from "../hooks/useHead";

function GetTestcases() {
  const [testcaseObject, setTestcaseObject] = useState([]);
  const [applicationObject, setApplicationObject] = useState([]);
  const [applicationId, setApplicationId] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState({
    module_name: "Application",
  });

  useEffect(() => {
    axiosPrivate.get(`qfservice/applications`).then((res) => {
      console.log(res.data.result);
      let applications = res.data.result;
      setApplicationObject(applications);
      setSelectedApplication(applications[0]);
    });
  }, []);

  useEffect(() => {
    axiosPrivate.get(`qfservice/webtestcase/getWebTestcasesInfoByApplication?application_id=${applicationId}`).then((res) => {
      console.log(res.data.info);
      setTestcaseObject(res.data.info);
    });
  }, [applicationId]);

  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Testcases",
        plusButton: false,
        // plusCallback: () => setPopup(true),
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

  const columns = [
    {
      field: "testcase_id",
      headerName: "Testcase ID",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "name",
      headerName: "Testcase name",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "project.project_name",
      headerName: "Project Name",
      renderCell: (param) => {
        console.log(param.row.project.project_name)
        return (
          <div>
            {param.row.project.project_name}
          </div>
        );
      },
      flex: 3,
      sortable: false,
      align: "left",
    },
  ];

  return (
    <div>
      <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={2}
      mb={1}
    >
      <Autocomplete
        disablePortal
        disableClearable
        id="application_id"
        options={applicationObject}
        value={selectedApplication || null}
        sx={{ width: "20%" }}
        getOptionLabel={(option) => option.module_name}
        onChange={(e, value) => {
          console.log(value);
          setSelectedApplication(value);
          setApplicationId(value.module_id);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Applications" size="small" />
        )}
      />
    </Stack>
      <Table
        rows={testcaseObject}
        columns={columns}
        hidefooter={true}
        getRowId={(row) => row.testcase_id}
      ></Table>
    </div>
  );
}

export default GetTestcases;
