import * as React from "react";
import { useState, useEffect } from "react";
import useHead from "../hooks/useHead";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Autocomplete,
  Stack,
  Avatar,
  TextField,
  Button,
  Container,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import AdbOutlinedIcon from "@mui/icons-material/AdbOutlined";
import AppleIcon from "@mui/icons-material/Apple";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Dashboard() {
  const { setHeader } = useHead();
  const [dataSets, setdataSets] = useState(1);
  const [totalSprint, settotalSprint] = useState(2);
  const [testCases, setTestCases] = useState(0);
  const header = ["Test Cases", "Data Sets", "Total Sprint"];
  const data = [dataSets, totalSprint, testCases];
  const body = ["Total Testcases", "Total Datasets", "Total Sprints"];

  const options = {
    title: {
      text: "Automation",
    },
    series: [
      {
        data: [1, 2, 0],
      },
    ],
  };

  useEffect(() => {
    setHeader((ps) => {
      return { ...ps, name: "Dashboard" };
    });
  }, []);

  const crd = (index) => {
    return (
      <Card sx={{ Width: "100px", display: "flex", height: "90px" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* if(index == 0){ */}
          <Typography
            sx={{
              fontSize: 20,
              backgroundColor: "rgba(137,196,244,1)",
              height: "80px",
              width: "150px",
            }}
            align="center"
            color="text.secondary"
            gutterBottom
          >
            {header[index]}
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", marginLeft: "50px" }}
        >
          <Typography variant="h3" align="left" component="div">
            {data[index]}
          </Typography>
          <Typography variant="subtitle1" align="left" component="div">
            {body[index]}
          </Typography>
        </Box>
        {/* <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton><OpenInNewIcon /></IconButton>
        </CardActions> */}
      </Card>
    );
  };

  function createData(summary, info) {
    return { summary, info };
  }

  const rows = [
    createData("Api Testcases", 0),
    createData("Web Testcases", 1),
    createData("Android Testcases", 0),
    createData("IOS Testcases", 0),
  ];

  return (
    <>
      <div>
        <div style={{ float: "right" }}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={0.5}
          >
            <Typography>Filter by Project and Sprint</Typography>
            <TextField id="outlined-required" />
            <TextField
              id="outlined-read-only-input"
              defaultValue="All `"
              InputProps={{
                readOnly: true,
              }}
            />
            <Button variant="contained">Report Portal</Button>
          </Stack>
        </div>
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {Array.from(Array(3)).map((_, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  {crd(index)}
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Card sx={{ maxWidth: 600 }} elevation={0}>
            <CardContent style={{ marginBottom: "20px", maxWidth: 600 }}>
              <HighchartsReact highcharts={Highcharts} options={options} />
            </CardContent>
            <Stack direction="row" spacing={2} style={{ marginLeft: "20px" }}>
              <Avatar>
                <BrightnessAutoIcon />
              </Avatar>
              <Avatar>
                <LanguageOutlinedIcon />
              </Avatar>
              <Avatar>
                <AdbOutlinedIcon />
              </Avatar>
              <Avatar>
                <AppleIcon />
              </Avatar>
            </Stack>
            <TableContainer
              component={Paper}
              style={{ marginTop: "20px", marginBottom: "10px" }}
            >
              <Table
                sx={{ minWidth: 600 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Summary</TableCell>
                    <TableCell align="right">Info</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.summary}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
          </Card>
        </div>
      </div>
    </>
  );
}
