import React from "react";
import { IconButton, Button, Tooltip } from "@mui/material";
import Table from "../../CustomComponent/Table";
import { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useLocation } from "react-router-dom";
import AddEnvironmentPop from "./AddEnvironmentPop";
import EditEnvironmentPop from "./EditEnvironmentPop";
import axios from "axios";
import ConfirmPop from "../../CustomComponent/ConfirmPop";
import useHead from "../../hooks/useHead";
import { postVal } from "../Execution/EditEnvironmentPop";
import { qfservice } from "../../Environment";

export default function AddEnvironemt() {
    const [tbData, setTbData] = useState([]);
    const [addEnvironmentPop, setAddEnvironmentPop] = useState(false);
    const [editEnvironmentPop, setEditEnvironmentPop] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [specificationId, setSpecificationId] = useState();
    const location = useLocation();
    const { setHeader, setSnackbarData } = useHead();

    let project_id = location.state.projectId;
    let application_id = location.state.applicationId;

    useEffect(() => {
        getBuilEnvironment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setHeader((ps) => {
            return {
                ...ps,
                name: "Build Environment",
            };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getBuilEnvironment() {
        axios
            .get(
                `${qfservice}/build-environment?project_id=${project_id}&module_id=${application_id}`
            )
            .then((res) => {
                if (res.data.data?.length > 0) {
                    setTbData(res.data.data);
                } else {
                    setTbData([]);
                    setSnackbarData({
                        status: true,
                        message: "No reports found",
                        severity: "error",
                    });
                }
            });
    }
    function deleteApiRequest(specificationId) {
        axios
            .post(
                `${qfservice}/DeleteBuildEnvironment?build_environment_id=${specificationId}`
            )
            .then((res) => {
                if (res.data.message === "Successfully deleted Build Environment") {
                    setSnackbarData({
                        status: true,
                        message: res.data.message,
                        severity: "success",
                    });
                    getBuilEnvironment();
                }
            });
        setConfirm(false);
    }

    const columns = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            sortable: false,
        },
        {
            field: "base_url",
            headerName: "URL",
            flex: 3,
            sortable: false,
        },
        {
            field: "description",
            headerName: "Description",
            flex: 2,
            sortable: false,
        },
        {
            field: "Action",
            headerName: "Action",
            flex: 1,
            sortable: false,
            renderCell: (param) => {
                return (
                    <>
                        <Tooltip title="Edit">
                            <IconButton
                                onClick={(e) => {
                                    // console.log(param.row)
                                    postVal.name = param.row.name;
                                    postVal.description = param.row.description;
                                    postVal.base_url = param.row.base_url;
                                    postVal.id = param.row.id;
                                    postVal.project_id = param.row.project_id;
                                    postVal.module_id = param.row.module_id;
                                    setEditEnvironmentPop(true);
                                }}
                            >
                                <EditIcon style={{ color: "black" }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton
                                onClick={() => {
                                    setSpecificationId(param.id);
                                    setConfirm(true);
                                }}
                            >
                                <DeleteOutlineIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                );
            },
        },
    ];

    return (
        <>
            <div className="apptable">
                <div className="intable">
                    <div style={{ padding: "20px", display: "inline", float: "right" }}>
                        <Button
                            variant="contained"
                            onClick={(e) => {
                                setAddEnvironmentPop(true);
                            }}
                        >
                            Add Environment
                        </Button>
                    </div>
                </div>
                <Table
                    searchPlaceholder="Search Environment"
                    columns={columns}
                    rows={tbData}
                    getRowId={(row) => row.id}
                />
            </div>
            <AddEnvironmentPop
                addEnvironmentPop={addEnvironmentPop}
                close={setAddEnvironmentPop}
                getBuilEnvironment={getBuilEnvironment}
                projectId={project_id}
                applicationId={application_id}
            />
            <EditEnvironmentPop
                editEnvironmentPop={editEnvironmentPop}
                close={setEditEnvironmentPop}
                row={tbData}
                getBuilEnvironment={getBuilEnvironment}
                projectId={project_id}
                applicationId={application_id}
            />
            {confirm && (
                <ConfirmPop
                    open={true}
                    handleClose={(e) => setConfirm(false)}
                    heading={"Delete Configuration"}
                    message={"Are you sure you want to delete the Configuration ?"}
                    onConfirm={(e) => deleteApiRequest(specificationId)}
                ></ConfirmPop>
            )}
        </>
    );
}
