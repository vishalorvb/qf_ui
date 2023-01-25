import Table from "../../CustomComponent/Table";
import { getPipelinesHistoryReport } from "../../Services/DevopsServices";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
export default function CodeQuality() {
  const [result, setResult] = useState([]);
  const location = useLocation();
  useEffect(() => {
    getPipelinesHistoryReport(setResult, location.state.id, "SONAR");
  }, []);

  const applicationColumns = [
    {
      field: "#",
      headerName: "#",
      flex: 1,
      sortable: false,
    },
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

  return (
    <>
      <Table
        rows={result}
        columns={applicationColumns}
        getRowId={(row) => row.key}
      />
    </>
  );
}
