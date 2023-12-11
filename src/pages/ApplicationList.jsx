import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getApplication } from "../Services/QfService";
import { Button, MenuItem, Tooltip, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { moduledata } from "../Components/Application/CreateApplication";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteApplication } from "../Services/QfService";
import { Stack } from "@mui/system";
import LanguageIcon from "@mui/icons-material/Language";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import ApiIcon from "@mui/icons-material/Api";
import JoinInnerRoundedIcon from "@mui/icons-material/JoinInnerRounded";
import ConfirmPop from "../CustomComponent/ConfirmPop";
import TableActions from "../CustomComponent/TableActions";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ExpandMore } from "../CustomComponent/ExpandMore";

export default function ApplicationsList() {
    const { setHeader, setSnackbarData } = useHead();
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [application, setApplication] = useState([]);
    const location = useLocation();
    let [popup, setPopup] = useState({ moduleId: 0, status: false });

    const [expanded, setExpanded] = useState([]);
    const [sizeDiff, setSizeDiff] = useState(0);

    const handledeleteApplication = (module_id, id) => {
        deleteApplication(module_id, id).then((res) => {
            if (res) {
                getApplication(setApplication, auth?.info?.id);
                setSnackbarData({
                    status: true,
                    message: "Application Deleted Successfully",
                    severity: "success",
                });
            }
        });
        setPopup({ moduleId: 0, status: false });
    };

    const handleExpand = (id) => {
        id = parseInt(id);
        if (expanded.includes(id)) {
            setSizeDiff(0);
            setExpanded((prevState) => {
                return prevState.filter((applicationId) => applicationId !== id);
            });
            setApplication((prevState) => {
                return prevState.filter((module) => module.parent_module_id !== id);
            });
        } else {
            setExpanded((prevState) => {
                return [id, ...prevState];
            });
            setApplication((prevState) => {
                const index = prevState.findIndex((module) => module.module_id === id);
                const subModules = prevState[index].sub_modules_list;
                const newArr = [...prevState];
                newArr.splice(index + 1, 0, ...subModules);
                setSizeDiff((prevsd) => {
                    return prevsd + subModules?.length;
                });
                return newArr;
            });
        }
    };

    const applicationColumns = [
        {
            field: "module_name",
            headerName: "Application Name",
            flex: 3,
            sortable: false,
            renderCell: (param) => {
                return (
                    <Stack direction="row" spacing={1}>
                        {param.row.is_parent_module ? (
                            {
                                1: (
                                    <Tooltip title="API">
                                        <ApiIcon sx={{ color: "#ffd700 " }} />
                                    </Tooltip>
                                ),
                                2: (
                                    <Tooltip title="Web">
                                        <LanguageIcon sx={{ color: "#0fadc8" }} />
                                    </Tooltip>
                                ),
                                3: (
                                    <Tooltip title="Android">
                                        <AndroidIcon sx={{ color: "#a4c639" }} />
                                    </Tooltip>
                                ),
                                4: (
                                    <Tooltip title="Ios">
                                        <AppleIcon sx={{ color: "#A2AAAD" }} />
                                    </Tooltip>
                                ),
                                13: (
                                    <Tooltip title="Mobile-Web">
                                        <AdUnitsIcon sx={{ color: "green" }} />
                                    </Tooltip>
                                ),
                                19: (
                                    <Tooltip title="Link-Project">
                                        <JoinInnerRoundedIcon sx={{ color: "gray" }} />
                                    </Tooltip>
                                ),
                            }[param?.row?.module_type] ?? (
                                <AppleIcon sx={{ color: "white", display: "none" }} />
                            )
                        ) : (
                            <div style={{ width: "25px" }}></div>
                        )}
                        <Typography
                            onClick={() => {
                                if (param?.row.module_type === 19) {
                                    setSnackbarData({
                                        status: true,
                                        message: "Link Project don't have Pages and Screens",
                                        severity: "info",
                                    });
                                } else {
                                    navigate(`${param?.row?.module_name}`, { state: param?.row });
                                }
                            }}
                            variant="p"
                            className="nameColumn"
                        >
                            {param?.row?.module_name}
                        </Typography>
                    </Stack>
                );
            },
        },
        {
            field: "module_desc",
            headerName: "Description",
            flex: 6,
            sortable: false,
            renderCell: (param) => {
                return (
                    <>
                        <TableActions heading={param?.row?.module_desc}>
                            <MenuItem
                                onClick={() => {
                                    moduledata.module_name = param.row.module_name;
                                    moduledata.base_url = param.row.base_url;
                                    moduledata.module_desc = param.row.module_desc;
                                    moduledata.module_type = param.row.module_type;
                                    moduledata.module_id = param.row.module_id;
                                    moduledata.is_sub_module = param?.row?.is_parent_module
                                        ? undefined
                                        : true;
                                    moduledata.parent_module_id = param?.row?.is_parent_module
                                        ? undefined
                                        : param.row.parent_module_id;
                                    navigate("Update", { state: param?.row });
                                }}
                            >
                                <EditOutlinedIcon sx={{ color: "blue", mr: 1 }} />
                                Edit
                            </MenuItem>
                            {param.row.is_parent_module && (
                                <MenuItem
                                    onClick={() => {
                                        moduledata.module_name = param.row.module_name;
                                        moduledata.base_url = param.row.base_url;
                                        moduledata.module_desc = param.row.module_desc;
                                        moduledata.module_type = param.row.module_type;
                                        moduledata.is_sub_module = true;
                                        moduledata.parent_module_id = param.row.module_id;
                                        navigate("CreateSubApplication", { state: param?.row });
                                    }}
                                >
                                    <AddCircleOutlineIcon sx={{ color: "pink", mr: 1 }} />
                                    Add Subapplicaton
                                </MenuItem>
                            )}
                            <MenuItem
                                onClick={() =>
                                    setPopup({ moduleId: param?.row?.module_id, status: true })
                                }
                            >
                                <DeleteOutlineIcon sx={{ color: "red", mr: 1 }} />
                                Delete
                            </MenuItem>
                        </TableActions>
                    </>
                );
            },
        },
        {
            field: " ",
            header: "isOpen",
            flex: 0.1,
            sortable: false,
            renderCell: (param) => {
                return (
                    <>
                        {param.row.is_parent_module === true &&
                            param.row.sub_modules_list?.length > 0 && (
                                <span onClick={() => handleExpand(param.row.module_id)}>
                                    <ExpandMore
                                        expand={expanded.includes(param.row.module_id)}
                                        aria-expanded={expanded.includes(param.row.module_id)}
                                        aria-label="show more"
                                        disableFocusRipple
                                        disableRipple
                                        sx={{ color: "black", padding: "0px" }}
                                    >
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                </span>
                            )}
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        setHeader((ps) => {
            return {
                ...ps,
                name:
                    location?.state === "recentApplication"
                        ? "Recent Applications"
                        : "Search Applications",
            };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location?.state]);

    useEffect(() => {
        getApplication(setApplication, auth?.info?.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="apptable">
            <div className="intable">
                <div style={{ float: "right" }}>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/Application/Create")}
                    >
                        Create Application
                    </Button>
                </div>
            </div>
            <Table
                rows={
                    location?.state === "recentApplication"
                        ? application?.slice(0, 10 + sizeDiff)
                        : application
                }
                columns={applicationColumns}
                getRowId={(row) => row?.module_id}
                searchPlaceholder="Search Applications"
                rowHeight={65}
            />
            <ConfirmPop
                open={popup?.status}
                handleClose={() => setPopup({ moduleId: 0, status: false })}
                heading={"Delete Application"}
                message={"Are you sure you want to delete this application"}
                onConfirm={() =>
                    handledeleteApplication(popup?.moduleId, auth?.info?.id)
                }
            ></ConfirmPop>
        </div>
    );
}
