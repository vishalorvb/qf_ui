import Table from "../../CustomComponent/Table";
import { getPipelinesHistoryReport } from "../../Services/DevopsServices";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert } from "@mui/material";
export default function CodeQuality() {
    const [error, setError] = useState("");
    const [result, setResult] = useState([]);
    const location = useLocation();
    useEffect(() => {
        getPipelinesHistoryReport(setResult, setError, location.state.id, "SONAR");
    }, []);

    const applicationColumns = [

        {
            field: "message",
            headerName: "Message",
            flex: 4,
            sortable: false,
        },
        {
            field: "component",
            headerName: "Component",
            flex: 4,
            sortable: false,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            sortable: false,
        },
        {
            field: "severity",
            headerName: "Severity",
            flex: 1,
            sortable: false,
        },
        {
            field: "type",
            headerName: "Type",
            flex: 2,
            sortable: false,
        },
        {
            field: "rule",
            headerName: "Rule",
            flex: 3,
            sortable: false,
        },
    ];

    return result?.length > 0 ? (
        <Table
            searchPlaceholder="Search Results"
            rows={result}
            columns={applicationColumns}
            getRowId={(row) => row.key}
        />
    ) : (
        <Alert severity="error">{error}</Alert>
    );
}
