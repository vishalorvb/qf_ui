import { Autocomplete, Button, Container, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";
import Table from "../CustomComponent/Table";
import useHead from "../hooks/useHead";

function GetTestcases() {
  const [testcaseObject, setTestcaseObject] = useState([]);
  //   const [radio, setRadio] = useState(0);
  //   const [datasets, Setdatasets] = useState([]);
  const [applicationObject, setApplicationObject] = useState([]);
  const [applicationId, setApplicationId] = useState([]);
  // let [addTestcase, setAddTestcase] = useState();
  //   let [popup, setPopup] = useState(false);
  //   let [steps, setSteps] = useState(false);
  //   let [snack, setSnack] = useState(false);
  //   const { auth } = useAuth();
  //   const navigate = useNavigate();

  //   function handleRadio(testcaseId) {
  //     setRadio(testcaseId);
  //     let temp = testcases.filter((ts) => {
  //       if (ts.testcase_id == testcaseId)
  //         return ts.datasetsList;
  //       }
  //     });
  //     Setdatasets(temp[0].datasetsList);
  //   }

  //   function handleSteps(para) {
  //     console.log(para);
  //     setSteps(true);
  //   }

  //   function handleSteps(para) {
  //     console.log(para);
  //     setSteps(true);
  //   }

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
      field: "project_name",
      headerName: "Project Name",
      flex: 3,
      sortable: false,
      align: "left",
    },
  ];

  useEffect(() => {
    // getApplication(setApplication, auth.info.id)
    axiosPrivate.get(`qfservice/applications`).then((res) => {
      console.log(res.data.result);
      setApplicationObject(res.data.result);
      // setTSCreateSuccessMsg(true);
      // setTimeout(() => {
      //   setTSCreateSuccessMsg(false);
      // }, 3000);
    });
  }, []);

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

  const submit = () => {
    axiosPrivate
      .get(
        `qfservice/webtestcase/getWebTestcasesInfoByApplication?application_id=${applicationId}`
      )
      .then((res) => {
        console.log(res.data.info);
        setTestcaseObject(res.data.info);
      });
  };

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
          <Grid container>
            <Grid item>
              <h3>Application Name :</h3>
              <Autocomplete
                disablePortal
                id="module_id"
                options={applicationObject}
                getOptionLabel={(option) => option.module_name}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input type="text" {...params.inputProps} />
                  </div>
                )}
                onChange={(e, value) => {
                  setApplicationId(value.module_id);
                }}
              />
            </Grid>
          </Grid>
          <Button variant="contained" onClick={submit}>
            Search
          </Button>
        </Container>
      </Paper>
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
