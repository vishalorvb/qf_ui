//import { useEffect, useState } from "react";
//import useHead from "../hooks/useHead";
//import Table from "../CustomComponent/Table";
//import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
//import { Outlet, useNavigate } from "react-router-dom";
//import { getReleaseInstances } from "../Services/DevopsServices";
//import { Autocomplete, Grid, Menu, MenuItem, Typography } from "@mui/material";
//import axios from "../api/axios";
//import SnackbarNotify from "../CustomComponent/SnackbarNotify";
//import ConfirmPop from "../CustomComponent/ConfirmPop";
//import MoreVertIcon from "@mui/icons-material/MoreVert";
//import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
//import useAuth from "../hooks/useAuth";
//import { getProject } from "../Services/ProjectService";
//import { dateFormater } from "../utilities/Utility";
//let rowData;

//export default function Release() {
//    const { setHeader, globalProject, setglobalProject } = useHead();
//    const [openDelete, setOpenDelete] = useState(false);
//    const [instance, setInstance] = useState([]);
//    const [project, setProject] = useState([]);
//    const [msg, setMsg] = useState(false);
//    const navigate = useNavigate();
//    const { auth } = useAuth();


//    const addReleaseInstances = (e) => {
//        navigate("/release/createAnsibleInstance", { state: globalProject });
//    };

//    useEffect(() => {
//        setHeader((ps) => {
//            return {
//                ...ps,
//                name: "Release Instances",
//                plusButton: false,
//                buttonName: "Create Instance",
//                plusCallback: addReleaseInstances,
//            };
//        });
//        return () =>
//            setHeader((ps) => {
//                return {
//                    ...ps,
//                    name: "",
//                    plusButton: false,
//                    plusCallback: () => console.log("null"),
//                };
//            });
//    }, [globalProject]);

//    useEffect(() => {
//        getProject(setProject, auth.userId);
//    }, []);
//    useEffect(() => {
//        if (globalProject == null) {
//            setglobalProject(project[0]);
//        }
//    }, [project]);

//    const getReleaseInstancesfromModule = () => {
//        globalProject?.project_id
//            ? getReleaseInstances(setInstance, globalProject?.project_id)
//            : setInstance([]);
//    };

//    useEffect(() => {
//        getReleaseInstancesfromModule();
//    }, [globalProject]);

//    const deleteRelease = (row) => {
//        axios
//            .delete(
//                `qfservice/DeleteRelease?release_id=${row?.id}&project_id=${globalProject?.project_id}`
//            )
//            .then((resp) => {
//                console.log(resp);
//                setMsg(resp?.data?.message);
//                resp?.data?.message && getReleaseInstancesfromModule();
//            });
//    };

//    const setRowData = (e) => {
//        console.log(e)
//        setOpenDelete(true);
//        rowData(e);
//    };

//    const instanceColumns = [
//        {
//            field: "release_name",
//            headerName: "Name",
//            flex: 3,
//            sortable: false,
//            renderCell: (param) => {
//                return (
//                    <Typography
//                        variant="p"
//                        onClick={() =>
//                            navigate("history", { state: { releaseId: param.row.id, projectId: globalProject.project_id } })
//                        }
//                        style={{ color: "#009fee", cursor: "pointer" }}
//                    >
//                        {param.row.release_name}
//                    </Typography>
//                );
//            },
//        },
//        {
//            field: "release_desc",
//            headerName: "Description",
//            flex: 3,
//            sortable: false,
//        },
//        {
//            field: "updated_at",
//            headerName: "Last Updated",
//            flex: 5,
//            sortable: false,
//            renderCell: (param) => {
//                return ReleaseActionCell(param, setRowData);
//            },
//        },
//    ];

//    return (
//        <>
//            <SnackbarNotify
//                open={msg && true}
//                close={setMsg}
//                msg={msg}
//                severity="success"
//            />
//            <ConfirmPop
//                heading={"Delete Release"}
//                open={openDelete}
//                handleClose={() => setOpenDelete(false)}
//                message={"Do You really want to delete this release"}
//                onConfirm={deleteRelease(rowData)}
//            />

//            <div className="apptable">
//                <div className="intable">
//                    <Grid container spacing={2} justifyContent="right">
//                        <Grid item md={5}>
//                            <label htmlFor="">Projects</label>
//                            <Autocomplete
//                                disablePortal
//                                disableClearable
//                                id="project_id"
//                                options={project}
//                                value={globalProject || null}
//                                getOptionLabel={(option) => option.project_name}
//                                onChange={(e, value) => {
//                                    setglobalProject(value);
//                                }}
//                                renderInput={(params) => (
//                                    <div ref={params.InputProps.ref}>
//                                        <input type="text" {...params.inputProps} />
//                                    </div>
//                                )}
//                            />
//                        </Grid>
//                    </Grid>
//                </div>

//                <Table rows={instance} columns={instanceColumns} />
//                {/* <SelectCreateInstanceModal
//          createInstate={createInstance}
//          setCreateInstance={setCreateInstance}
//          module={module}
//        /> */}
//            </div>
//            <Outlet />
//        </>
//    );
//}

//const ReleaseActionCell = (param, setRowData) => {
//    const navigate = useNavigate();
//    const [anchorEl, setAnchorEl] = useState(null);
//    const open = Boolean(anchorEl);
//    const handleClick = (event) => {
//        setAnchorEl(event.currentTarget);
//    };
//    const handleClose = () => {
//        setAnchorEl(null);
//    };
//    return (
//        <div className="descColumn">
//            <Typography variant="p">{dateFormater(param.row.updated_at)}</Typography>
//            <MoreVertIcon
//                id="basic-button"
//                aria-controls={open ? "basic-menu" : undefined}
//                aria-haspopup="true"
//                aria-expanded={open ? "true" : undefined}
//                onClick={handleClick}
//                className="descOption"
//            />

//            <Menu
//                id="basic-menu"
//                anchorEl={anchorEl}
//                open={open}
//                onClose={handleClose}
//                MenuListProps={{
//                    "aria-labelledby": "basic-button",
//                }}
//            >
//                <MenuItem
//                    onClick={() =>
//                        navigate("UpdateAnsibleInstance", {
//                            state: param?.row,
//                        })
//                    }
//                >
//                    <EditOutlinedIcon sx={{ color: "blue", mr: 1 }} />
//                    Edit
//                </MenuItem>
//                <MenuItem onClick={() => setRowData(param.row)}>
//                    <DeleteOutlineIcon sx={{ color: "red", mr: 1 }} />
//                    Delete
//                </MenuItem>
//            </Menu>
//        </div>
//    );
//};



import React, { useEffect, useState } from 'react'
import ProjectnApplicationSelector from '../Components/ProjectnApplicationSelector'
import TableActions from '../CustomComponent/TableActions';
import { dateFormater } from '../utilities/Utility';
import { getReleaseInstances } from '../Services/DevopsServices';
import { deleteInstance } from '../Services/DevopsServices';
import { MenuItem, Typography } from '@mui/material';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Table from '../CustomComponent/Table';
import { useNavigate } from 'react-router-dom';
import useHead from '../hooks/useHead';
import ConfirmPop from '../CustomComponent/ConfirmPop';


function Release() {

    let [instance, setInstance] = useState([])
    let [releaseId, setReleaseId] = useState("")
    const { setSnackbarData, globalProject } = useHead();
    const navigate = useNavigate();
    let [popup, setPopup] = useState(false)

    useEffect(() => {
        getReleaseInstances(setInstance, globalProject?.project_id)
    }, [globalProject])

    const col = [
        {
            field: "release_name",
            headerName: "Name",
            flex: 3,
            sortable: false,
            renderCell: (param) => {
                return (
                    <Typography
                        variant="p"
                        onClick={() =>
                            navigate("history", { state: { releaseId: param.row.id, projectId: globalProject?.project_id } })
                        }
                        style={{ color: "#009fee", cursor: "pointer" }}
                    >
                        {param.row.release_name}
                    </Typography>
                );
            },
        },
        {
            field: "release_desc",
            headerName: "Description",
            flex: 3,
            sortable: false,
        },
        {
            field: "updated_at",
            headerName: "Last Updated",
            flex: 5,
            sortable: false,
            renderCell: (param) => {
                return (
                    <TableActions heading={dateFormater(param.row.updated_at)}>
                        <MenuItem
                            onClick={() =>
                                navigate("UpdateAnsibleInstance", {
                                    state: param?.row,
                                })
                            }
                        >
                            <EditOutlinedIcon sx={{ color: "blue", mr: 1 }} />
                            Edit
                        </MenuItem>
                        <MenuItem
                            onClick={(e) => {
                                setReleaseId(param.row.id)
                                setPopup(true);
                            }}
                        >
                            <DeleteOutlineIcon sx={{ color: "red", mr: 1 }} />
                            Delete
                        </MenuItem>
                    </TableActions>
                )
            },
        },
    ];

    return (
        <div className="apptable">
            <div className="intable">
                <ProjectnApplicationSelector
                    isApplication={false}
                />
            </div>
            <Table
                searchPlaceholder="Search Release"
                rows={instance}
                columns={col}
                hidefooter={true}
                getRowId={(row) => row.id}
            ></Table>
            <ConfirmPop
                open={popup}
                handleClose={() => {

                    setPopup(false)
                }}
                heading={"Delete Instance"}
                message={"Are you sure you want to delete this Instance?"}
                onConfirm={() => {
                    //DeleteTestCase(deletTestcaseId).then((res) => {
                    //    if (res) {
                    //        GetTestCase(
                    //            setTestcases,
                    //            project?.project_id,
                    //            application?.module_id
                    //        );
                    //        setSnackbarData({
                    //            status: true,
                    //            message: "Testcase Deleted Successfully",
                    //            severity: "success",
                    //        });
                    //    }
                    //});
                    deleteInstance(globalProject?.project_id, releaseId).then(res => {
                        setSnackbarData({
                            status: true,
                            message: "Instance Deleted Successfully",
                            severity: "success",
                        });
                        getReleaseInstances(setInstance, globalProject?.project_id)
                    })
                    setPopup(false);
                }}
            ></ConfirmPop>
        </div>
    )
}

export default Release
