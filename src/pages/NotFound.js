import { Divider } from "@mui/material";
// import { useEffect } from "react";
import useHead from "../hooks/useHead";
import { Autocomplete, Button, Grid, IconButton, Paper, Tooltip } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Table from "../CustomComponent/Table";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useLocation } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { getTestcases } from "../Services/ProjectService";
import TestsetPopup from "../Components/TestSet/TestsetPopup";
// import NotFound from "../pages/"

export default function NotFound() {
  const { setHeader } = useHead();
  const [testcaseObject, setTestcaseObject] = useState([]);
  const [datasetObject, setDatasetObject] = useState([]);
  const [Data, setData] = useState([]);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [deleteObject, setDeleteObject] = useState([]);

  const columns = [
    {
      field: 'testcase_name',
      headerName: 'Testcase Name',
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: 'left'
    },
    {
      field: 'testcase_desc',
      headerName: 'Description',
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: 'left'
    },
    {
      field: 'dataset_name_in_testcase',
      headerName: 'Dataset ',
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: 'left',
      renderCell: (params) => {
        return (
          <div>
            <Autocomplete
              size="small"
              options={params.row.datasetsList}
              getOptionLabel={(option) => option.dataset_name_in_testcase}
              onChange={(e, value) => {
                // console.log(value.testcase_id);
                // Uid.current = value.id;
                // setUserId(value.id);
                // setDatasetObject(testcaseObject.datasetsList.dataset_name_in_testcase);
                // handleDataset(value.testcase_id)
              }}
              noOptionsText={"Dataset not found"}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input
                    type="text"
                    name="dataAutocomplete"
                    {...params.inputProps}
                    placeholder="Please Select"
                  />
                </div>
              )}
            />
          </div>
        )
      }
    }
  ];

  console.log(testcaseObject);

  //   const deleteUserHandler = (e) => {
  //     console.log("first")
  //     console.log(e);
  //     setOpenDelete(true);
  //     setDeleteObject(e);
  //   };

  function handleDataset(testcaseId) {
    // setRadio(testcaseId) 
    let temp = (testcaseObject.filter(ts => {
      if (ts.testcase_id == testcaseId) {
        return ts.datasetsList
      }
    }))
    setDatasetObject(temp[0].datasetsList)
  }

  const submit = (e) => {
    e.preventDefault();

  }

  const addHandler = (e) => {
    e.preventDefault();

  }

  useEffect(() => {
    getTestcases(setTestcaseObject, 1031);
  }, [])

  useEffect(() => {
    setHeader((ps) => {
      return { ...ps, name: "notFound" };
    });
  }, []);

  return (
    <div>
      <Paper
        elevation={1}
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
                Test Cases <span className="importantfield">*</span>:
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={8} xl={7}>
              <Autocomplete
                size="small"
                options={testcaseObject}
                getOptionLabel={(option) => option.testcase_name}
                onChange={(e, value) => {
                  console.log(value.testcase_id);
                  // Uid.current = value.id;
                  // setUserId(value.id);
                  // setDatasetObject(testcaseObject.datasetsList.dataset_name_in_testcase);
                  handleDataset(value.testcase_id)
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
                Datasets <span className="importantfield">*</span>:
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={8} xl={7}>
              <Autocomplete
                size="small"
                options={datasetObject}
                getOptionLabel={(option) => option.dataset_name_in_testcase}
                onChange={(e, value) => {
                  // Project_Id.current = value.project_id;
                }}
                noOptionsText={"Datasets not found"}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      name="DatasetAutocomplete"
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
            onClick={addHandler}
            startIcon={<AddOutlinedIcon />}
            sx={{
              marginLeft: "45%",
              marginRight: "auto",
              marginBottom: "10px",
              marginTop: "25px",
            }}
          >
            Add
          </Button>
        </Container>
      </Paper >
      <div className="datatable" style={{ marginTop: "15px" }}>
        <Paper elevation={1}
          sx={{ padding: "2px", marginTop: "10px", marginBottom: "10px" }}>
          <div >
            <form>
              <div>
                <Container component={'div'} sx={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }} >
                  <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                    <Grid item xs={6} sm={6} md={3}><label>Testset Name <span className="importantfield" >*</span>:</label></Grid>
                    <Grid item xs={6} sm={6} md={8}>
                      <input type="text" name="" placeholder="Enter First Name" />
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                    <Grid item xs={6} sm={6} md={3}><label>Testset Description <span className="importantfield" >*</span>:</label></Grid>
                    <Grid item xs={6} sm={6} md={8}> <input type="text" name="" placeholder="Enter Last Name" /></Grid>
                  </Grid>
                  {/* <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }}>
                    <Grid item xs={6} sm={6} md={3}>
                      <Button
                        variant="contained"
                        onClick={submit}
                        startIcon={<AddOutlinedIcon />}
                        sx={{
                          marginLeft: "45%",
                          marginRight: "auto",
                          marginBottom: "10px",
                          marginTop: "25px",
                        }}
                      >
                        Create
                      </Button>
                    </Grid>
                  </Grid> */}
                  <Button
                        variant="contained"
                        onClick={submit}
                        startIcon={<AddOutlinedIcon />}
                        sx={{
                          marginLeft: "45%",
                          marginRight: "auto",
                          marginBottom: "10px",
                          marginTop: "25px",
                        }}
                      >
                        Create
                      </Button>
                </Container>
              </div>
            </form>
          </div>
          <Table
            columns={columns}
            rows={testcaseObject}
            //   hidefooter={false}
            getRowId={row => row.testcase_id}
          />

        </Paper>
      </div>
    </div>
  );
}
