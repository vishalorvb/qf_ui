import React, { useEffect, useState } from "react";
import ProjectnApplicationSelector from "../Components/ProjectnApplicationSelector";
import TableActions from "../CustomComponent/TableActions";
import { dateFormater } from "../utilities/Utility";
import { getReleaseInstances } from "../Services/DevopsServices";
import { deleteInstance } from "../Services/DevopsServices";
import { MenuItem, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Table from "../CustomComponent/Table";
import { useNavigate } from "react-router-dom";
import useHead from "../hooks/useHead";
import ConfirmPop from "../CustomComponent/ConfirmPop";

function Release() {
    let [instance, setInstance] = useState([])
    let [releaseId, setReleaseId] = useState("")
    const { setSnackbarData, globalProject, setShowloader, setHeader } = useHead();
    const navigate = useNavigate();
    let [popup, setPopup] = useState(false)

    useEffect(() => {
        setInstance([]);
        setShowloader(true);
        globalProject?.project_id &&
            getReleaseInstances(setInstance, globalProject?.project_id).then(
                (res) => {
                    setShowloader(false);
                }
            );
    }, [globalProject]);

    useEffect(() => {
        setHeader((ps) => {
            return {
                ...ps,
                name: "Recent Release",
            };
        });
    }, []);
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
                <ProjectnApplicationSelector isApplication={false} />
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
                    setPopup(false);
                }}
                heading={"Delete Instance"}
                message={"Are you sure you want to delete this Instance?"}
                onConfirm={() => {
                    deleteInstance(globalProject?.project_id, releaseId).then((res) => {
                        setSnackbarData({
                            status: true,
                            message: "Instance Deleted Successfully",
                            severity: "success",
                        });
                        getReleaseInstances(setInstance, globalProject?.project_id);
                    });
                    setPopup(false);
                }}
            ></ConfirmPop>
        </div>
    );
}

export default Release;
