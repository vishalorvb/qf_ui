import useHead from "../../hooks/useHead";
import ProjectnApplicationSelector from "../ProjectnApplicationSelector";
import { getTestsetReport } from "../../Services/DashboardService";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import AccordionTemplate from "../../CustomComponent/AccordionTemplate";
import Table from "../../CustomComponent/Table";
import { dateFormater } from "../../utilities/Utility";

function TestsetReport() {
  const {
    globalProject,
    setglobalProject,
    globalApplication,
    setglobalApplication,
    setSnackbarData,
  } = useHead();

  let [report, setReport] = useState([]);
  let [limit, setLimit] = useState(2);

  let columns = [
    {
      field: "pass",
      headerName: "Pass/Fail",
      flex: 2,
      sortable: false,
      align: "left",
      renderCell: (param) => {
        return <div>{param.row.pass_fail_string}</div>;
      },
    },
    {
      field: "date",
      headerName: "Date",
      flex: 2,
      sortable: false,
      align: "left",
      renderCell: (param) => {
        return <div>{dateFormater(param.row.created_at)}</div>;
      },
    },
  ];

  useEffect(() => {
    console.log(report);
  }, [report]);
  useEffect(() => {
    setReport([]);
    globalProject &&
      globalApplication &&
      getTestsetReport(
        globalProject.project_id,
        globalApplication.module_id,
        limit,
        setReport
      );
  }, [globalProject, globalApplication, limit]);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={6}>
          <ProjectnApplicationSelector
            globalProject={globalProject}
            setglobalProject={setglobalProject}
            globalApplication={globalApplication}
            setglobalApplication={setglobalApplication}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <label htmlFor="">Size:</label>
          <select
            onChange={(e) => {
              setLimit(e.target.value);
            }}
          >
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </Grid>
      </Grid>
      <div>
        {report?.map((r) => (
          <div style={{ position: "relative", marginTop: "10px" }}>
            {/*<AccordionTemplate defaultState={true} name={r.testset_name}>*/}
            <div
              style={{
                position: "absolute",
                top: "-20px",
                background: "#e8f2fd",
                padding: "10px",
              }}
            >
              <label for="">{r.testset_name}</label>
            </div>
            <Table
              rows={r.pass_fail}
              columns={columns}
              hidefooter={true}
              hideSearch={true}
              getRowId={(row) => row.created_at}
            ></Table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestsetReport;
