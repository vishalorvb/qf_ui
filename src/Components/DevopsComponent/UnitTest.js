import Table from "../../CustomComponent/Table";
import { getPipelinesHistoryReport } from "../../Services/DevopsServices";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
export default function UnitTest() {
  const [result, setResult] = useState([]);
  const location = useLocation();
  useEffect(() => {
    getPipelinesHistoryReport(setResult, location.state.id, "UNITTEST");
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

  return (
    <>
      <Table
        rows={result}
        columns={applicationColumns}
        getRowId={(row) => row.message + row.testcaseName + row.result}
      />
    </>
  );
}
