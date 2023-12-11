import Table from "../../CustomComponent/Table";
import { getPipelinesHistoryReport } from "../../Services/QfService";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert } from "@mui/material";
export default function UnitTest() {
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  useEffect(() => {
    getPipelinesHistoryReport(
      setResult,
      setError,
      location.state.id,
      "UNITTEST"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      flex: 3,
      sortable: false,
    },
    {
      field: "testcaseName",
      headerName: "Testcase",
      flex: 3,
      sortable: false,
    },
    {
      field: "result",
      headerName: "Result",
      flex: 2,
      sortable: false,
    },
  ];

  return result?.length > 0 ? (
    <Table
      searchPlaceholder="Search Results"
      rows={result}
      columns={applicationColumns}
      getRowId={(row) => row.message + row.testcaseName + row.result}
    />
  ) : (
    <Alert severity="error">{error}</Alert>
  );
}
