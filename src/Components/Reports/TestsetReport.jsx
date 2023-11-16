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

    let [report, setReport] = useState([])
    let [limit, setLimit] = useState(2)


    let columns = [
        {
            field: "pass",
            headerName: "Pass",
            flex: 2,
            sortable: false,
            align: "left",
            renderCell: (param) => {
                return (
                    <div>
                        {param.row.pass_fail_string}
                    </div>
                );
            },
        },
        {
            field: "fail",
            headerName: "Fail",
            flex: 2,
            sortable: false,
            align: "left",
            renderCell: (param) => {
                return (
                    <div>
                        {param.row.pass_fail_string}
                    </div>
                );
            },
        },
        {
            field: "date",
            headerName: "Date",
            flex: 2,
            sortable: false,
            align: "left",
            renderCell: (param) => {
                return (
                    <div>
                        {dateFormater(param.row.created_at)}

                    </div>
                );
            },
        },
    ]



    useEffect(() => {
        globalProject && globalApplication && getTestsetReport(globalProject.project_id, globalApplication.module_id, limit, setReport)
    }, [globalProject, globalApplication, limit])
    return (
        <div>
            <Grid container spacing={2} >
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
                        onChange={e => {
                            setLimit(e.target.value)
                        }}
                    >
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </select>
                </Grid>
            </Grid>

            <div style={{ marginTop: "20px" }}>
                {report.map(r =>
                    <AccordionTemplate defaultState={true} name={r.testset_name}>
                        <Table
                            rows={r.pass_fail}
                            columns={columns}
                            hidefooter={true}
                            hideSearch={true}
                            getRowId={(row) => row.created_at}
                        ></Table>
                    </AccordionTemplate>
                )}

            </div>

        </div>
    )
}

export default TestsetReport
