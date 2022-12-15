
import EditIcon from '@mui/icons-material/Edit';
import SchemaIcon from '@mui/icons-material/Schema';
import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleIcon from '@mui/icons-material/PlayCircleOutline';
import AnalyticsIcon from '@mui/icons-material/AnalyticsOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PreviewIcon from '@mui/icons-material/Preview';
import Table from '../../Table';
import { baseUrl } from '../../../Environment';
import { StyledTextField } from '../../CustomTextField';





import React, { useEffect, useRef, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Button, Grid, MenuItem, Paper, Select, TextField } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';



function SearchProject() {

    const userId = 112;
    let [AutomationType, setAutomationType] = useState([])
    let [project, setProject] = useState([])
    let [filteredProject, setFilteredProject] = useState([])

    let automationId = useRef()
    let projectId;
    let repository = useRef()


    function getAutomationType() {
        axios.get(baseUrl + "/ProjectMS/Project/getAutomationType").then(response => {
            setAutomationType(response.data)
            console.log(response.data)
        })
    }
    function getProject() {
        axios.get(baseUrl + "/ProjectMS/Project/getProject?userId=" + userId).then(response => {
            setProject(response.data)
            console.log(response.data)
        })
    }

    function searchHadler() {
        console.log("automation" + automationId.current.value)
        console.log("project" + projectId)
        console.log("repo" + repository.current.value)
        let result = project.filter((pro) => {
            console.log("inside filter")
            return (
                pro.automation_framework_type == automationId.current.value &&
                pro.project_id == projectId &&
                pro.repository_url == repository.current.value
            )
        })


        setFilteredProject(result)
    }

    const columns = [
        {

            headerName: 'S.No',
            field: 'sno',
            valueGetter: (index) => index.api.getRowIndex(index.row.id) + 1,
            flex: 1,
            align: 'center',
            sortable: false,
        },
        {
            field: 'project_name',
            headerName: 'Project Name',
            flex: 3

        },
        {
            field: 'automation_name',
            headerName: 'Automation Type',
            flex: 3

        },

        {
            headerName: 'Action',
            field: "action",
            renderCell: (param) => {
                return (
                    <>
                        <Tooltip title="Overview">
                            <IconButton> <PreviewIcon ></PreviewIcon></IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                            <IconButton><EditIcon ></EditIcon></IconButton>
                        </Tooltip>
                        <Tooltip title="Workflow">
                            <IconButton><SchemaIcon ></SchemaIcon></IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton><DeleteIcon ></DeleteIcon></IconButton>
                        </Tooltip>
                        <Tooltip title="User">
                            <IconButton><PeopleIcon ></PeopleIcon></IconButton>
                        </Tooltip>
                        <Tooltip title="Execution">
                            <IconButton><PlayCircleIcon ></PlayCircleIcon></IconButton>
                        </Tooltip>
                        <Tooltip title="Analytics">
                            <IconButton><AnalyticsIcon ></AnalyticsIcon></IconButton>
                        </Tooltip>
                    </>
                )
            },
            flex: 4,
            headerAlign: "center",
            align: 'center',
            sortable: false,
        }
    ];


    useEffect(() => {
        getAutomationType()
        getProject()
    }, [])
    useEffect(() => {
        console.log(filteredProject)
    }, [filteredProject])

    return (
        <div>

            <div className="search-form">
                <Paper elevation={1} sx={{ padding: '10px' }}>
                    <Container component={'div'} sx={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', justifyContent: "space-between", marginLeft: "0px", alignItems: "center" }} >
                        <Grid container item xs={12} sm={6} md={4} sx={{ marginBottom: '10px' }} >
                            <Grid item xs={6} sm={6} md={5}><label>Automation Type <span className="importantfield" >*</span>:</label></Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                <StyledTextField
                                    id="id"
                                    select
                                    label=""
                                    sx={{ width: '100%', padding: "0px", }}
                                    inputRef={automationId}
                                >
                                    {AutomationType.map(data => <MenuItem value={data.id}>{data.name}</MenuItem>)}
                                </StyledTextField>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={6} md={4} sx={{ marginBottom: '10px' }} >
                            <Grid item xs={6} sm={6} md={4}><label>Project Name<span className="importantfield" >*</span>:</label></Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                <Autocomplete
                                    ref={projectId}
                                    disablePortal
                                    id="project_id"
                                    options={project}
                                    getOptionLabel={option => option.project_name}
                                    sx={{ width: "100%" }}
                                    renderInput={(params) => <div ref={params.InputProps.ref}>
                                                            <input type="text" {...params.inputProps} />
                                                        </div>}
                                    onChange={(e, value) => {
                                        projectId = value.project_id
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={6} md={4} sx={{ marginBottom: '10px' }} >
                            <Grid item xs={6} sm={6} md={5}><label>Repository <span className="importantfield" >*</span>:</label></Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                <StyledTextField
                                    id="id"
                                    select
                                    label=""
                                    sx={{ width: '100%', padding: "0px" }}
                                    inputRef={repository}
                                >
                                    {project.map(data => <MenuItem value={data.repository_url}>{data.repository_url}</MenuItem>)}
                                </StyledTextField>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} justifyContent="center" >
                            <Grid item xs={2}>
                                <Button size='medium' onClick={searchHadler} variant="contained"><SearchIcon /> Search</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
            </div>
            <div className="tabledata">
                {filteredProject.length > 0 && <Table
                    rows={filteredProject}
                    columns={columns}
                    hidefooter={true}
                ></Table>}
            </div>

        </div>
    )
}

export default SearchProject
