import { useEffect, useState } from "react";
import useHead from "../../hooks/useHead";
import Table from "../../CustomComponent/Table";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { executePipeline, getPipelinesHistory } from "../../Services/QfService";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import useAuth from "../../hooks/useAuth";

export default function PipelineAutomation() {
    const { setHeader } = useHead();
    const navigate = useNavigate();
    const location = useLocation();
    const [history, setHistory] = useState([]);
    const [releaseLog, setReleaseLog] = useState([]);
    const [msg, setMsg] = useState(false);
    const { auth } = useAuth();
    const loggedInId = auth.info.id;

    useEffect(() => {
        getPipelinesHistory(setHistory, setReleaseLog, location.state.id);
        setHeader((ps) => {
            return {
                ...ps,
                name: "Pipeline Automation",
            };
        });
    }, []);

    const instanceColumns = [
        {
            field: "name",
            headerName: "Name",
            flex: 3,
            sortable: false,
        },
        {
            field: "description",
            headerName: "Description",
            flex: 3,
            sortable: false,
        },
        {
            field: "created_at_string",
            headerName: "Released at",
            flex: 3,
            sortable: false,
        },
        {
            field: "Actions",
            headerName: "Actions",
            flex: 3,
            sortable: false,
            align: "center",
            headerAlign: "center",
            renderCell: (param) => {
                return (
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => navigate("report", { state: { id: param.row.id } })}
                    >
                        Report
                    </Button>
                );
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
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
            >
                <Typography>
                    Release:
                    <Link to="viewLogs">View Log</Link>
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => executePipeline(setMsg, location.state.id, loggedInId)}
                >
                    Release Now
                </Button>
            </Stack>
            <Table
                searchPlaceholder="Search Pipelines"
                rows={history}
                columns={instanceColumns}
            />
            <Outlet />
        </>
    );
}
