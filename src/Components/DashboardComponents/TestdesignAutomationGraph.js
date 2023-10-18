import { Language } from "@mui/icons-material";
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

export default function TestDesignAutomationGraph({
  info,
  testDesignPeriod,
  automation,
  defects,
  coverage,
}) {
  const testDesignGraphData = {
    title: {
      text: "Automation of Test Design",
      align: "left",
      style: {
        "font-size": "20px",
        "font-weight": "bold",
        "font-family": "Roboto",
      },
    },
    xAxis: {
      categories: testDesignPeriod,
      crosshair: true,
    },
    yAxis: {
      allowDecimals: true,
      padding: 1,
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: [
      {
        name: "Automation",
        data: automation,
      },
      {
        name: "Defects",
        data: defects,
      },
      {
        name: "Coverage",
        data: coverage,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };

  const row_data = [
    {
      summary: "Total Regression Testcases",
      info:
        info?.regression_testcases_count !== undefined
          ? info?.regression_testcases_count
          : 0,
    },
    {
      summary: "Identified Automation Testcases",
      info:
        info?.automation_testcases_by_sprint !== undefined
          ? info?.automation_testcases_by_sprint
          : 0,
    },
    {
      summary: "Yet to Automate Testcases",
      info:
        info?.yet_to_automate_testcases !== undefined
          ? info?.yet_to_automate_testcases
          : 0,
    },
    {
      summary: "Test Datasets Created by Automated Testcases",
      info:
        info?.datasets_created_for_automated_testcases !== undefined
          ? info?.datasets_created_for_automated_testcases
          : 0,
    },
  ];

  return (
    <Paper variant="outlined">
      <HighchartsReact highcharts={Highcharts} options={testDesignGraphData} />

      <TableContainer style={{ marginTop: "20px", marginBottom: "10px" }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Summary</TableCell>
              <TableCell align="right">Info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row_data.map((row) => (
              <TableRow
                key={row.summary}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.summary}
                </TableCell>
                <TableCell align="right">{row.info}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
