import { Autocomplete, Button, Container, Grid, Paper } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react'
import Table from '../CustomComponent/Table';
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment';
import axios from 'axios';
import { baseUrl } from '../../Environment';
import { validateForm, resetClassName } from '../../FormValidation';
import SnackbarNotify from '../CustomComponent/SnackbarNotify';

function Report() {

    const [fromDate, setFromDate] = useState(moment().format('YYYY-MM-DD'));
    let From_Date = useRef();
    const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD'));
    let To_Date = useRef();
    const [usersObject, setUsersObject] = useState([]);
    const [projectsObject, setProjectsObject] = useState([]);
    const [workflowsObject, setWorkflowsObject] = useState([]);
    const [userId, setUserId] = useState(0);
    // const [user,setUser] = useState(null);
    // let Uid = useRef();
    const [projectId, setProjectId] = useState(0);
    const [project, setProject] = useState({project_name:""});
    // let Project_Id = useRef();
    const [workflowId, setWorkflowId] = useState(0);
    const [workflow, setWorkflow] = useState({module_name:""});
    // let Workflow_Id = useRef();
    const [tbData, setTbData] = useState([]);
    const [reportSuccessMsg, setReportSuccessMsg] = useState(false);
    const [validationMsg, setValidationMsg] = useState(false);
    let autoComplete = ["userAutocomplete", "projectAutocomplete", "workflowAutocomplete"];
    let requiredFields = [From_Date,To_Date];

    const columns = [
        { headerName: "S.No", field: 'sno', valueGetter: (index) => index.api.getRowIndex(index.row.id) + 1, flex: 1, headerAlign: "center", sortable: false, align: 'center' },
        {
            field: 'testcases',
            headerName: 'Testcase/Testset/Job/Host',
            flex: 3,
            headerAlign: "center",
            sortable: false,
            align: 'left',
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.testcase_name + "/ " + params.row.testset_name}
                    </div>
                )
            }
        },
        {
            field: 'created_at',
            headerName: 'Date',
            flex: 3,
            headerAlign: "center",
            sortable: false,
            align: 'left',
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.created_at}
                    </div>
                )
            }
        },
        {
            field: 'executed_by',
            headerName: 'Executed By',
            flex: 3,
            headerAlign: "center",
            sortable: false,
            align: 'left'
        },
        {
            field: 'report_result',
            headerName: 'Result',
            flex: 3,
            headerAlign: "center",
            sortable: false,
            align: 'left'
        }
    ];
    
    const getUsers = () => {
        axios
            .get(baseUrl + `/OrganisationMS/Users/getAllUsers`)
            .then((Response) => {
                var response = Response.data;
                setUsersObject(response);
            })
            .catch((error) => {
                console.log(error)
            });
    };
    
    const getProjects = () => {
        axios
            .get(baseUrl + `/ProjectsMS/Project/getProject?userId=${userId}`)
            .then((Response) => {
                var response = Response.data;
                if(response.length == 0)
                {
                    setWorkflowsObject([]);
                }
                setProjectsObject(response);
            })
            .catch((error) => {
                console.log(error)
            });
    };

    const getWorkflows = () => {
        axios
            .get(baseUrl + `/ProjectsMS/Project/getProjectWorkflows?projectId=${projectId}`)
            .then((Response) => {
                var response = Response.data;
                setWorkflowsObject(response);
                // if (response) {
                //     setReportSuccessMsg(true);
                //     setTimeout(() => {
                //         setReportSuccessMsg(false)
                //     }, 2000);
                // }
            })
            .catch((error) => {
                console.log(error)
            });
    };

    useEffect(() => {
        getUsers();
        getProjects();
        getWorkflows();
    }, [userId, projectId, workflowId]);

    const submit = (e) => {
        e.preventDefault();
        if (validateForm(requiredFields, [], [], [], [], autoComplete, "error")) {
            var data = {
                workflowId: workflowId,
                fromDate: fromDate + " 00:00:00",
                toDate: toDate + " 00:00:00"
            }
            axios
                .post(baseUrl + "/OrganisationMS/Reports/getAllReports", data)
                .then((Response) => {
                    setTbData(Response.data);
                })
                .catch((error) => {
                    console.log(error)
                });
            console.log("Valid Form");
        }
        else {
            setValidationMsg(true);
            setTimeout(() => {
                setValidationMsg(false)
            }, 2000);
            console.log("Invalid form");
        }
    }
    
    return (
        <div onClick={resetClassName}>
            <Paper elevation={1} sx={{ padding: '2px', marginTop: "10px", marginBottom: "10px" }}>
                <Container component={'div'} maxWidth={false} sx={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', marginTop: "10px", justifyContent: 'flex-start' }} >
                    <Grid container item xs={12} sm={6} md={4} xl={4} sx={{ marginBottom: '10px' }} >
                        <Grid item xs={6} sm={6} md={3.5} xl={4}><label>User <span className="importantfield" >*</span>:</label></Grid>
                        <Grid item xs={6} sm={6} md={8} xl={7}>
                            <Autocomplete
                                // value={user}
                                size="small"
                                options={usersObject}
                                getOptionLabel={(option) => (option.fname) + " " + (option.lname)}
                                onChange={(e, value) => {
                                    // Uid.current = value.id;
                                    setUserId(value.id);
                                    setProject(null);
                                    setWorkflow(null);
                                    setProjectId(0);
                                }}
                                noOptionsText={'User not found'}
                                renderInput={(params) =>
                                    <div ref={params.InputProps.ref}>
                                    <input type="text" name="userAutocomplete" {...params.inputProps} 
                                        placeholder="Please Select" />
                                  </div>
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={6} md={4} xl={4} sx={{ marginBottom: '10px' }} >
                        <Grid item xs={6} sm={6} md={3.5} xl={4}><label>Projects <span className="importantfield" >*</span>:</label></Grid>
                        <Grid item xs={6} sm={6} md={8} xl={7}>
                            <Autocomplete
                                value={project}
                                size="small"
                                options={projectsObject}
                                getOptionLabel={(option) => option.project_name}
                                onChange={(e, value) => {
                                    // Project_Id.current = value.project_id; 
                                    setProjectId(value.project_id);
                                    setProject(value);
                                    setWorkflow(null);
                               }}
                                noOptionsText={'Projects not found'}
                                renderInput={(params) =>
                                    <div ref={params.InputProps.ref}>
                                    <input type="text" name="projectAutocomplete" {...params.inputProps} placeholder="Please Select" />
                                  </div>
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={6} md={4} xl={4} sx={{ marginBottom: '10px' }} >
                        <Grid item xs={6} sm={6} md={3.5} xl={4}><label>Workflow <span className="importantfield" >*</span>:</label></Grid>
                        <Grid item xs={6} sm={6} md={8} xl={7}>
                            <Autocomplete
                             value={workflow}
                                size="small"
                                options={workflowsObject}
                                getOptionLabel={(option) => option.module_name}
                                onChange={(e, value) => {
                                    // Workflow_Id.current = value.module_id 
                                    setWorkflowId(value.module_id);
                                    setWorkflow(value);
                               }}
                                noOptionsText={'Workflows not found'}
                                renderInput={(params) =>
                                    <div ref={params.InputProps.ref}>
                                    <input type="text" name="workflowAutocomplete" {...params.inputProps} placeholder="Please Select" />
                                  </div>
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={6} md={4} xl={4} sx={{ marginBottom: '10px' }} >
                        <Grid item xs={6} sm={6} md={3.5} xl={4}><label>From Date <span className="importantfield" >*</span>:</label></Grid>
                        <Grid item xs={6} sm={6} md={8} xl={7} style={{ width: "310px" }} >
                            <input
                                id="date"
                                type="date"
                                ref={From_Date}
                                defaultValue={fromDate}
                                sx={{ width: 158 }}
                                onChange={(newValue) => {
                                    setFromDate(moment(newValue).format('YYYY-MM-DD'));
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={6} md={4} xl={4} sx={{ marginBottom: '10px' }} >
                        <Grid item xs={6} sm={6} md={3.5} xl={4}><label>To Date  <span className="importantfield" >*</span>:</label></Grid>
                        <Grid item xs={6} sm={6} md={8} xl={7}>
                            <input
                                id="date"
                                type="date"
                                ref={To_Date}
                                defaultValue={toDate}
                                sx={{ width: 158 }}
                                onChange={(newValue) => {
                                    setToDate(moment(newValue).format('YYYY-MM-DD'));
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button variant="contained" onClick={submit} startIcon={<SearchIcon />} sx={{ marginLeft: "45%", marginRight: "auto", marginBottom: "10px", marginTop:"25px" }}>
                        Search
                    </Button>
                </Container>
            </Paper>
            <SnackbarNotify open={reportSuccessMsg} close={setReportSuccessMsg} msg="We got the report" severity="success"/>
            <SnackbarNotify open={validationMsg} close={setValidationMsg} msg="Fill all the required fields" severity="error"/>
            <div className="datatable" style={{ marginTop: "15px" }}>
                <Table
                    columns={columns}
                    rows={tbData}
                    hidefooter={false}
                />
            </div>
        </div>
    )
}

export default Report