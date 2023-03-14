import { Autocomplete, Button, Grid, IconButton, Paper, Tooltip } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Table from "../../CustomComponent/Table";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useLocation } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { getModules, getProject } from "../../Services/ProjectService";
import { getTestcaseDetails } from "../../Services/TestsetService";
import {createTestset} from "../../Services/TestsetService";
import DeleteTestset from "./DeleteTestset";
import { axiosPrivate } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { getTestcase } from "../../Services/TestCaseService";
import Select from '@mui/material/Select';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
import { MenuItem } from '@mui/material';
// import { Multiselect } from "multiselect-react-dropdown";
// import Select from "react-select";

function TestsetCreate() {
    const [testcaseObject, setTestcaseObject] = useState([]);
    const [datasetObject, setDatasetObject] = useState([]);
    // const [Data, setData] = useState([]);
    const [tcObject, setTcObject] = useState([]);
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [testcaseId, setTestcaseId] = useState();
    const [datasetId, setDatasetId] = useState();
    const [testsetName, setTestsetName] = useState("");
    const [testsetDesc, setTestsetDesc] = useState("");
    const [deleteObject, setDeleteObject] = useState([]);
    const [projectObject, setProjectObject] = useState([]);
    const [workflowsObject, setWorkflowsObject] = useState([]);
    const [workflowId, setWorkflowId] = useState(0);
    const [projectId, setProjectId] = useState(null);
    const [testsetObject, setTestsetObject] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const { auth } = useAuth();
    console.log(auth.info);
    const loggedInId = auth.info.id;

  const ITEM_HEIGHT = 18;
  const ITEM_PADDING_TOP = 4;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

    let Data = [];

    const columns = [
        {
            field: 'tcName',
            headerName: 'Testcase Name',
            flex: 3,
            headerAlign: "center",
            sortable: false,
            align: 'left'
        },
        {
            field: 'tcDesc',
            headerName: 'Description',
            flex: 3,
            headerAlign: "center",
            sortable: false,
            align: 'left'
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
        setDatasetObject(temp[0].datasets_List)
    }

    function add(){
        console.log("data");
        
        return(
        //     tcObject.map(data =>{
        //     console.log(data);
        //     Data.push(data)
        // })
        // tcObject.forEach(data => console.log(data))
        Data.push(tcObject)
        );
    }

    var data;
    let array = [];
    const handleChange = (event) => {
      let e = document.getElementById("rightapp")
      // array = [];
      for (let i = 0; i < e.options.length; i++) {
        if (e.options[i].selected) {
          console.log(e.options[i].value);
          let tcId = e.options[i].value;
          axiosPrivate.get("/qfservice/webtestcase/getWebTestcaseInfo?testcase_id=" + tcId).then((res) => {
            console.log(res.data.info);
            data = {
              testcase_id : res.data.info.testcase_id,
              testcase_order : res.data.info.tc_order,
              testcase_dataset_id : 1082
            }
            // settcObject(res.data.result.projects_list);
            // array = [...array, data];
            array.splice(array.length, 0, data);
          });
        }
      }
      // console.log(event);
      // const { value } = event.target;
      // setSelectedOptions(value);
      console.log(array);
    };

    var data1 = {
        "project_id" : projectId,
        "testset_name" : testsetName,
        "testset_desc" : testsetDesc,
        "testcases_list" : array
        // [{ "testcase_id" : 142, "testcase_order": 0,
        // "testcase_dataset_id" : 162, "selected_testcase_dataset_ids" : [162]},
        // { "testcase_id" : 140, "testcase_order": 0,
        // "testcase_dataset_id" : 160, "selected_testcase_dataset_ids" : [160]}]
    }

    const submit = (e) => {
        e.preventDefault();
        handleChange();
        // createTestset(data1);
        axiosPrivate.put("/qfservice/webtestset/createWebTestset", data1).then((res) => {
          console.log("Testset created successfully");
        });
        array = [];
    }

    const addHandler = (e) => {
        console.log(typeof(Data));
        e.preventDefault();
        
        Data.push({tcId:tcObject.testcase_id, tcName:tcObject.testcase_name, tcDesc:tcObject.testcase_desc, dsId:datasetId});
        // add();
        // tcObject.map(data =>{Data.push(data)});
        // Data.push(tcObject);
    }

    const getTestsets = () => {
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
      axiosPrivate.get("/qfservice/projects?user_id=" + loggedInId).then((res) => {
        console.log(res.data.result.projects_list);
        setProjectObject(res.data.result.projects_list);
      });
      // getProject(setProjectObject,loggedInId);
      // console.log(projectObject);
      // getModules(setWorkflowsObject, projectId);
      // getTestsets();
    }, [loggedInId])

    useEffect(() => {
      getTestcase(setTestcaseObject, projectId);
    }, [projectId])
    
    useEffect(() => {
        getTestcaseDetails(setTcObject,workflowId,testcaseId);
    }, [testcaseId,workflowId])

    console.log(tcObject);
    console.log(Data);
    console.log(testcaseId);
    console.log(datasetId);

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
                Project <span className="importantfield">*</span>:
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={8} xl={7}>
            <Autocomplete
                size="small"
                options={projectObject}
                getOptionLabel={(option) => option.project_name}
                onChange={(e, value) => {
                  // Project_Id.current = value.project_id;
                  setProjectId(value.project_id);
                }}
                noOptionsText={"Projects not found"}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      name="projectAutocomplete"
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
                <select
                  id="rightapp"
                  multiple
                  // onChange={handleChange}
                  // value={selectedOptions}
                  // onChange={handleChange}
                  // inputProps={{ name: 'selectedOptions', id: 'selected-options' }}
                  // MenuProps={MenuProps}
                >
                  {testcaseObject.map((option) => (
                    <option key={option.testcase_id} value={option.testcase_id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                  {/* <Multiselect 
                    options={testcaseObject}
                    displayValue = {(option) => option.name}
                  />  */}
                  {/* <Select 
                    options={testcaseObject}
                  /> */}
                  {/* <Autocomplete
                    size="small"
                    options={testcaseObject}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, value) => {
                      console.log(value.testcase_id);
                    //   getTestcaseDetails(setTcObject,1031,value.testcase_id);
                      setTestcaseId(value.testcase_id);
                      // Uid.current = value.id;
                      // setUserId(value.id);
                      // setDatasetObject(testcaseObject.datasetsList.dataset_name_in_testcase);
                      handleDataset(value.testcase_id)
                    }}
                    noOptionsText={"Testcases not found"}
                    renderInput={(params) => (
                      <div ref={params.InputProps.ref}>
                        <input
                          type="text"
                          name="testcaseAutocomplete"
                          {...params.inputProps}
                          placeholder="Please Select"
                        />
                      </div>
                    )}
                  /> */}
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
                    Datasets <span className="importantfield">*</span>:
                  </label>
                </Grid>
                <Grid item xs={6} sm={6} md={8} xl={7}>
                  <Autocomplete
                    size="small"
                    options={datasetObject}
                    getOptionLabel={(option) => option.dataset_name_in_testcase}
                    onChange={(e, value) => {
                        setDatasetId(value.testcase_dataset_id);
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
              </Grid> */}
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
                          <input type="text" name="" placeholder=" Testset Name" onChange={(e)=>setTestsetName(e.target.value)}/>
                        </Grid>
                      </Grid>
                      <Grid container item xs={12} sm={8} md={6} sx={{ marginBottom: '10px' }} >
                        <Grid item xs={6} sm={6} md={3}><label>Testset Description <span className="importantfield" >*</span>:</label></Grid>
                        <Grid item xs={6} sm={6} md={8}> <input type="text" name="" placeholder="" onChange={(e)=>setTestsetDesc(e.target.value)}/></Grid>
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
                rows={Data}
                //   hidefooter={false}
                getRowId={row => row.testcase_id}
              />
    
            </Paper>
          </div>
        </div>
      );
}

export default TestsetCreate