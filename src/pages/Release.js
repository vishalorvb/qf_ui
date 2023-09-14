import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Outlet, useNavigate } from "react-router-dom";
import { getReleaseInstances } from "../Services/DevopsServices";
import { Autocomplete, Grid, Menu, MenuItem, Typography } from "@mui/material";
import axios from "../api/axios";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";
import ConfirmPop from "../CustomComponent/ConfirmPop";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useAuth from "../hooks/useAuth";
import { getProject } from "../Services/ProjectService";
let rowData;

export default function Release() {
    const { setHeader, globalProject, setglobalProject } = useHead();
    const [openDelete, setOpenDelete] = useState(false);
    const [instance, setInstance] = useState([]);
    const [project, setProject] = useState([]);
    const [msg, setMsg] = useState(false);
    const navigate = useNavigate();
    const { auth } = useAuth();

    const addReleaseInstances = (e) => {
        navigate("/release/createAnsibleInstance", { state: globalProject });
    };

    useEffect(() => {
        setHeader((ps) => {
            return {
                ...ps,
                name: "Release Instances",
                plusButton: false,
                buttonName: "Create Instance",
                plusCallback: addReleaseInstances,
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
    }, [globalProject]);

    useEffect(() => {
        getProject(setProject, auth.userId);
    }, []);
    useEffect(() => {
        if (globalProject == null) {
            setglobalProject(project[0]);
        }
    }, [project]);

    const getReleaseInstancesfromModule = () => {
        globalProject?.project_id
            ? getReleaseInstances(setInstance, globalProject?.project_id)
            : setInstance([]);
    };

    useEffect(() => {
        getReleaseInstancesfromModule();
    }, [globalProject]);

    const deleteRelease = (row) => {
        axios
            .delete(
                `qfservice/DeleteRelease?release_id=${row?.id}&project_id=${globalProject?.project_id}`
            )
            .then((resp) => {
                console.log(resp);
                setMsg(resp?.data?.message);
                resp?.data?.message && getReleaseInstancesfromModule();
            });
    };

    const setRowData = (e) => {
        setOpenDelete(true);
        rowData(e);
    };

    const instanceColumns = [
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
                            navigate("history", { state: { releaseId: param.row.id, projectId: globalProject.project_id } })
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
                return ReleaseActionCell(param, setRowData);
            },
        },
    ];

    return (
        <>
            <SnackbarNotify
                open={msg && true}
                close={setMsg}
                msg={msg}
                severity="success"
            />
            {openDelete ? (
                <ConfirmPop
                    heading={"Delete Release"}
                    open={openDelete}
                    handleClose={() => setOpenDelete(false)}
                    message={"Do You really want to delete this release"}
                    onConfirm={deleteRelease(rowData)}
                />
            ) : (
                ""
            )}
            <div className="apptable">
                <div className="intable">
                    <Grid container spacing={2} justifyContent="right">
                        <Grid item md={5}>
                            <label htmlFor="">Projects</label>
                            <Autocomplete
                                disablePortal
                                disableClearable
                                id="project_id"
                                options={project}
                                value={globalProject || null}
                                getOptionLabel={(option) => option.project_name}
                                onChange={(e, value) => {
                                    setglobalProject(value);
                                }}
                                renderInput={(params) => (
                                    <div ref={params.InputProps.ref}>
                                        <input type="text" {...params.inputProps} />
                                    </div>
                                )}
                            />
                        </Grid>
                    </Grid>
                </div>

                <Table rows={instance} columns={instanceColumns} />
                {/* <SelectCreateInstanceModal
          createInstate={createInstance}
          setCreateInstance={setCreateInstance}
          module={module}
        /> */}
            </div>
            <Outlet />
        </>
    );
}

const ReleaseActionCell = (param, setRowData) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className="descColumn">
            <Typography variant="p">{param.row.updated_at}</Typography>
            <MoreVertIcon
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="descOption"
            />

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
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
                <MenuItem onClick={() => setRowData(param.row)}>
                    <DeleteOutlineIcon sx={{ color: "red", mr: 1 }} />
                    Delete
                </MenuItem>
            </Menu>
        </div>
    );
};
