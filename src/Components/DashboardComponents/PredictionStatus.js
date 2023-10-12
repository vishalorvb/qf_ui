import {
  Alert,
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

import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";
import { useNavigate } from "react-router-dom";

highchartsMore(Highcharts);
solidGauge(Highcharts);

export default function PredictionStatus({
  showFailMsg,
  failMsg,
  faildata,
  percentage,
}) {
  const navigate = useNavigate();

  console.log(percentage);

  const automationGraphData = {
    chart: {
      type: "solidgauge",
      height: "60%",
    },

    title: {
      text: "",
      style: {
        fontSize: "24px",
      },
    },

    tooltip: {
      enabled: false,
    },

    pane: {
      startAngle: 0,
      endAngle: 360,
      background: [
        {
          outerRadius: "112%",
          innerRadius: "88%",
          backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0])
            .setOpacity(0.3)
            .get(),
          borderWidth: 0,
        },
      ],
    },

    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: [],
    },

    plotOptions: {
      solidgauge: {
        dataLabels: {
          enabled: false,
        },
        linecap: "round",
        stickyTracking: false,
        rounded: true,
      },
    },

    series: [
      {
        dataLabels: {
          enabled: true,
          inside: false,
          overflow: "none",
          backgroundColor: "none",
          color: "rgba(255,255,255,0.75)",
          borderWidth: 0,
          y: -10,
          style: {
            fontSize: "16px",
          },
          formatter: function () {
            return (
              `<span style="font-size:2em; color: {this.color}; font-weight: bold">` +
                percentage ?? 0 + " %" + "</span>"
            );
          },
        },
        name: "Move",
        data: [
          {
            color: Highcharts.getOptions().colors[0],
            radius: "112%",
            innerRadius: "88%",
            y: percentage ?? 0,
          },
        ],
      },
    ],
  };

  return (
    <Paper variant="outlined">
      <TableContainer>
        <Stack gap={1} pt={0.5} pl={0.5}>
          <Typography variant="h6">
            QualityFusion prediction : Success of Testcases in next sprint
          </Typography>
          <HighchartsReact
            highcharts={Highcharts}
            options={automationGraphData}
          />
          {showFailMsg && (
            <Alert severity="error">
              {failMsg != "Jira is not configured" ? failMsg : ""}
            </Alert>
          )}
        </Stack>
        {faildata?.length > 0 && (
          <Table
            size="small"
            aria-label="a dense table"
            onClick={() => navigate("Dashboard/failedTestcases")}
          >
            <TableHead>
              <TableRow>
                <TableCell>Fail Prediction Testcases</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {faildata?.map((row) => (
                <TableRow
                  key={row.summary}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row[0]}
                  </TableCell>
                  <TableCell align="right">{row[1]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Paper>
  );
}
