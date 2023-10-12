import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

export default function AutomationGraph({
  info,
  period,
  apiTestcase,
  webTestcase,
  androidTestcase,
  iosTestcase,
}) {
  const automationGraphData = {
    title: {
      text: "Automation",
      align: "left",
      style: {
        "font-size": "20px",
        "font-weight": "bold",
        "font-family": "Roboto",
      },
    },
    xAxis: {
      categories: period,
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

    legend: {
      symbolWidth: 50,
      symbolHeight: 25,
      layout: "horizontal",
    },

    series: [
      {
        name: "API",
        data: apiTestcase,
        color: "yellow",
        marker: {
          width: 16,
          height: 16,
          symbol:
            "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMy41MTcgMjMuNTE2Ij4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggaWQ9ImFwaSIgZD0iTTkuOTY0LDIzLjUxNyw5LjQzOCwyMS40LDYuNTgsMjAuMjIsNC43MTQsMjEuMzQxLDIuMTc2LDE4LjgsMy4zLDE2LjkzOCwyLjExMywxNC4wOCwwLDEzLjU1M1Y5Ljk2NWwyLjExMy0uNTI2TDMuMyw2LjU4MSwyLjE3Niw0LjcxNSw0LjcxNCwyLjE3Nyw2LjU4LDMuMyw5LjQzOCwyLjExNCw5Ljk2NCwwaDMuNTg4bC41MjcsMi4xMTNMMTYuOTM3LDMuMywxOC44LDIuMTc3LDIxLjM0LDQuNzE1LDIwLjIxOSw2LjU4MSwyMS40LDkuNDM5bDIuMTEzLjUyNnYzLjU4OEwyMS40LDE0LjA4bC0xLjE4NCwyLjg1OEwyMS4zNCwxOC44LDE4LjgsMjEuMzQxLDE2LjkzNywyMC4yMiwxNC4wNzksMjEuNGwtLjUyNywyLjExM1pNNC41MzIsMTEuNzU5YTcuMjI3LDcuMjI3LDAsMSwwLDcuMjI3LTcuMjI3QTcuMjM1LDcuMjM1LDAsMCwwLDQuNTMyLDExLjc1OVptMi4wNDUsMi40YS42MTIuNjEyLDAsMCwxLS4zMjEtLjhMNy44MjcsOS42OTRhLjYxMy42MTMsMCwwLDEsMS4xMjYsMGwxLjU3MiwzLjY2M2EuNjEyLjYxMiwwLDAsMS0uMzIxLjguNi42LDAsMCwxLS4yNDEuMDVBLjYxMi42MTIsMCwwLDEsOS40LDEzLjg0TDguMzksMTEuNDg5LDcuMzgxLDEzLjg0YS42MTIuNjEyLDAsMCwxLS44LjMyMVptOC44MzYtLjY1NlY5LjkzNmEuNjEyLjYxMiwwLDEsMSwxLjIyNSwwdjMuNTY5YS42MTIuNjEyLDAsMCwxLTEuMjI1LDBabS00LjIzMiwwVjkuOTM2YS42MTIuNjEyLDAsMCwxLC42MTItLjYxMmgxLjI2MkExLjU1MSwxLjU1MSwwLDAsMSwxNC42LDEwLjg3MnYuMTgzQTEuNTUxLDEuNTUxLDAsMCwxLDEzLjA1NSwxMi42aC0uNjQ5di45YS42MTIuNjEyLDAsMCwxLTEuMjI1LDBabTEuMjI1LTIuMzQ4di4yMjNoLjY0OWEuMzI1LjMyNSwwLDAsMCwuMzI0LS4zMjR2LS4xODNhLjMyNS4zMjUsMCwwLDAtLjMyNC0uMzI0aC0uNjQ5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtMC4wMDEpIiBmaWxsPSIjZmZkNzAwIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz4=)",
        },
      },
      {
        name: "Web",
        data: webTestcase,
        color: "lightblue",
        marker: {
          width: 16,
          height: 16,
          symbol:
            "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMy45OTkgMjQuMDAxIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJ3d3ciIGQ9Ik0tOTMxMy4xMDktMjM3Ny40NjhhMi4xLDIuMSwwLDAsMS0uODkxLTEuNzJ2LTUuNjI0YTIuMTA3LDIuMTA3LDAsMCwxLC44OTEtMS43MkExMi4wNTMsMTIuMDUzLDAsMCwxLTkzMDItMjM5NGExMi4wNiwxMi4wNiwwLDAsMSwxMS4xMSw3LjQ2OCwyLjExMiwyLjExMiwwLDAsMSwuODg4LDEuNzJ2NS42MjRhMi4xMDgsMi4xMDgsMCwwLDEtLjg4OCwxLjcyQTEyLjA1NiwxMi4wNTYsMCwwLDEtOTMwMi0yMzcwLDEyLjA1MywxMi4wNTMsMCwwLDEtOTMxMy4xMDktMjM3Ny40NjhabTExLjgxMiw1Ljk0NGMxLjkyMi0uNjQ1LDMuMTI4LTMuNTY1LDMuNjMzLTUuNTYzaC0zLjYzM1ptLTEuNDA1LDB2LTUuNTU0aC0zLjYzMkMtOTMwNS44My0yMzc1LjA4My05MzA0LjYyNi0yMzcyLjE3MS05MzAyLjctMjM3MS41MjNabTQuMjY3LS41MTJhMTAuNzI5LDEwLjcyOSwwLDAsMCw1LjgxMy01LjA1MWgtMy42QTEzLjI4OCwxMy4yODgsMCwwLDEtOTI5OC40MzctMjM3Mi4wMzVabS03LjEyNSwwYTEzLjIwNywxMy4yMDcsMCwwLDEtMi4yMjEtNS4wNDJoLTMuNTk1QTEwLjczMiwxMC43MzIsMCwwLDAtOTMwNS41NjItMjM3Mi4wMzVabS03LjAzMS03LjE1M2EuNy43LDAsMCwwLC43LjdoMTkuNzgyYS43LjcsMCwwLDAsLjctLjd2LTMuNzI3bC0xLjQyOSwyLjQ5M2EuNzQ2Ljc0NiwwLDAsMS0xLjI2Ny0uMDA3bC0uNzg4LTEuNDE5LS43ODUsMS40MTlhLjc0OC43NDgsMCwwLDEtMS4yNzEsMGwtMS4zMjUtMi4zOTFhLjYzLjYzLDAsMCwxLS4xOTQtLjMwNi41NjkuNTY5LDAsMCwxLS4wNTQuMTMxbC0xLjQyNCwyLjU2N2EuNzQ4Ljc0OCwwLDAsMS0xLjI3MSwwbC0uNzg1LTEuNDE5LS43ODgsMS40MTlhLjc0OC43NDgsMCwwLDEtMS4yNzEsMGwtMS40MjEtMi41NjdhLjU2OS41NjksMCwwLDEtLjA1NC0uMTMxLjYzLjYzLDAsMCwxLS4xOTQuMzA2bC0xLjMyNSwyLjM5MWEuNzQ4Ljc0OCwwLDAsMS0xLjI3MSwwbC0uNzg4LTEuNDE5LS43ODUsMS40MTlhLjcyLjcyLDAsMCwxLS42MzkuMzU1LjcxOS43MTksMCwwLDEtLjYzMS0uMzQ2bC0xLjQyNi0yLjQ5MVptMTguMzQzLTQuMzgzLjc5NSwxLjQzOC44MjctMS40NDVhLjc1MS43NTEsMCwwLDEsLjk2MS0uMjc2LjY4Mi42ODIsMCwwLDEsLjI2Mi4yMDl2LTEuMTY4YS43LjcsMCwwLDAtLjctLjdoLTE5Ljc4MmEuNy43LDAsMCwwLS43Ljd2MS4xNjdhLjY4OC42ODgsMCwwLDEsLjI2Mi0uMjA5Ljc0OS43NDksMCwwLDEsLjk1OS4yNzZsLjgyNywxLjQ0NS44LTEuNDM3YS43NDguNzQ4LDAsMCwxLDEuMjcxLDBsLjc4OCwxLjQxOS43ODUtMS40MTlhLjczMi43MzIsMCwwLDEsLjY4MS0uMzU1bC4wNDIsMGEuNjkxLjY5MSwwLDAsMSwuNjQ1LjQ4NC42NjguNjY4LDAsMCwxLC4zNzItLjQyMS43NS43NSwwLDAsMSwuOTU2LjI4OGwuNzg1LDEuNDE5Ljc4OC0xLjQxOWEuNzE5LjcxOSwwLDAsMSwuNjM2LS4zNTUuNzIyLjcyMiwwLDAsMSwuNjM2LjM1NWwuNzg1LDEuNDE5Ljc4OC0xLjQxOWEuNzQ2Ljc0NiwwLDAsMSwuOTUzLS4yODguNjU3LjY1NywwLDAsMSwuMzcyLjQyMS42OTQuNjk0LDAsMCwxLC42NDYtLjQ4NGwuMDQ0LDBhLjcxOC43MTgsMCwwLDEsLjY3OC4zNTNsLjc4OCwxLjQxOS43ODUtMS40MTlhLjcyNi43MjYsMCwwLDEsLjYzNi0uMzU1QS43MjcuNzI3LDAsMCwxLTkyOTQuMjUtMjM4My41NzFabS00LTguMTQ0YTEzLjQ0OCwxMy40NDgsMCwwLDEsMi4wMzEsNC43OTRoMy42YTEwLjcsMTAuNywwLDAsMC01LjgxMy01LjA0NEMtOTI5OC4zNzQtMjM5MS44ODMtOTI5OC4zMTEtMjM5MS44LTkyOTguMjUtMjM5MS43MTVabS0zLjA0OCw0Ljc5NGgzLjYzM2MtLjUtMi0xLjcwOS00LjkwOS0zLjYzMy01LjU1NlptLTMuMzEyLTMuOTcxYTExLjc5MSwxMS43OTEsMCwwLDAtMS43MjUsMy45NzFoMy42MzJ2LTUuNTU2QTQuMjA3LDQuMjA3LDAsMCwwLTkzMDQuNjEtMjM5MC44OTJabS02Ljc2NywzLjk3MWgzLjU5NWExMy41LDEzLjUsMCwwLDEsMi4wMzEtNC43OTRjLjA2My0uMDg2LjEyNC0uMTY4LjE4OS0uMjVBMTAuNzA4LDEwLjcwOCwwLDAsMC05MzExLjM3Ny0yMzg2LjkyMVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDkzMTQgMjM5NC4wMDEpIiBmaWxsPSJsaWdodGJsdWUiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz4=)",
        },
      },
      {
        name: "Android",
        data: androidTestcase,
        color: "green",
        marker: {
          width: 16,
          height: 16,
          symbol:
            "url(data:image/svg+xml;base64,PHN2ZyBpZD0iYW5kcm9pZCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxOS42MzkgMjMuNTE3Ij4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBpZD0iWE1MSURfMjIxXyIgZD0iTTgzLjEsMTE1LjE3OGExLjUwOCwxLjUwOCwwLDAsMCwxLjQ3Mi0xLjQ3MnYtMy40MzhoLjk4M2EuOTI5LjkyOSwwLDAsMCwuOTgzLS45ODNWOTkuNDY2SDc0Ljc0OXY5LjgxOWEuOTI5LjkyOSwwLDAsMCwuOTgzLjk4M2guOTgzdjMuNDM4YTEuNDcyLDEuNDcyLDAsMSwwLDIuOTQ0LDB2LTMuNDM4aDEuOTY2djMuNDM4QTEuNTA3LDEuNTA3LDAsMCwwLDgzLjEsMTE1LjE3OFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MC44MjIgLTkxLjY2KSIgZmlsbD0iZ3JlZW4iPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBpZD0iWE1MSURfMjIyXyIgZD0iTTIzOC45MjgsMTA5LjI4NWExLjUwNywxLjUwNywwLDAsMCwxLjQ3Mi0xLjQ3MnYtNi44NzZhMS40NzIsMS40NzIsMCwwLDAtMi45NDQsMHY2Ljg3NkExLjUwNywxLjUwNywwLDAsMCwyMzguOTI4LDEwOS4yODVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjIwLjc2MSAtOTEuNjYpIiBmaWxsPSJncmVlbiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJYTUxJRF8yMjNfIiBkPSJNMjYuMTgyLDEwOS4yODVhMS41MDcsMS41MDcsMCwwLDAsMS40NzItMS40NzJ2LTYuODc2YTEuNDcyLDEuNDcyLDAsMCwwLTIuOTQ0LDB2Ni44NzZBMS41MDcsMS41MDcsMCwwLDAsMjYuMTgyLDEwOS4yODVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjQuNzEgLTkxLjY2KSIgZmlsbD0iZ3JlZW4iPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBpZD0iWE1MSURfMjI0XyIgZD0iTTg1LjM1NS4xNDhhLjQ3LjQ3LDAsMCwwLS42ODYsMEw4My4zNTEsMS40NjJsLS4wNjEuMDYxQTUuODIxLDUuODIxLDAsMCwwLDgwLjY1Ni45MzRoLS4wMjlhNS44MjEsNS44MjEsMCwwLDAtMi42MzQuNTg5bC0uMDYxLS4wNjFMNzYuNjE0LjE0OGEuNDcuNDcsMCwwLDAtLjY4NiwwLC40NzEuNDcxLDAsMCwwLDAsLjY4NUw3Ny4yLDIuMTA5QTUuMzE0LDUuMzE0LDAsMCwwLDc2LjEsMy4xYTUuNzcxLDUuNzcxLDAsMCwwLTEuMzM5LDMuNDEzYzAsLjAxMywwLC4wMjcsMCwuMDRxLS4wMDYuMTMyLS4wMDYuMjY2SDg2LjUzNHEwLS4xMzQtLjAwNi0uMjY2YzAtLjAxMywwLS4wMjcsMC0uMDRBNS43Nyw1Ljc3LDAsMCwwLDg1LjE4NywzLjFhNS4zMSw1LjMxLDAsMCwwLTEuMTA4LS45OTRMODUuMzU1LjgzM0EuNDcyLjQ3MiwwLDAsMCw4NS4zNTUuMTQ4Wm0tNy4xNyw0Ljk1N2EuNzM2LjczNiwwLDEsMSwuNzM2LS43MzZBLjczNi43MzYsMCwwLDEsNzguMTg1LDUuMTA2Wm00LjkxMywwYS43MzYuNzM2LDAsMSwxLC43MzYtLjczNkEuNzM2LjczNiwwLDAsMSw4My4xLDUuMTA2WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTcwLjgyMiAwKSIgZmlsbD0iZ3JlZW4iPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+)",
        },
      },
      {
        name: "iOS",
        data: iosTestcase,
        color: "grey",
        marker: {
          width: 16,
          height: 16,
          symbol:
            "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOS4xNDggMjMuNTE2Ij4KICA8ZyBpZD0iYXBwbGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00Ny41NDgpIj4KICAgIDxwYXRoIGlkPSJQYXRoXzM2MyIgZGF0YS1uYW1lPSJQYXRoIDM2MyIgZD0iTTYzLjU0MSwxMi41YTUuMzIxLDUuMzIxLDAsMCwxLDIuNTM5LTQuNDc3LDUuNDkyLDUuNDkyLDAsMCwwLTQuMy0yLjMzYy0xLjgzMS0uMTg1LTMuNTczLDEuMDc4LTQuNSwxLjA3OFM1NC45MTUsNS43MTUsNTMuNCw1Ljc0MmE1Ljc1NCw1Ljc1NCwwLDAsMC00Ljg2NCwyLjk0OGMtMi4wNzQsMy42LS41MzEsOC45MywxLjQ5LDExLjg0OC45ODgsMS40MjksMi4xNjUsMy4wMzMsMy43MTIsMi45NzYsMS40ODktLjA1OSwyLjA1Mi0uOTY0LDMuODUzLS45NjRzMi4zMDYuOTY0LDMuODgyLjkzNGMxLjYtLjAzLDIuNjE4LTEuNDU2LDMuNi0yLjg4OUExMi45NjcsMTIuOTY3LDAsMCwwLDY2LjcsMTcuMjUyLDUuMTk0LDUuMTk0LDAsMCwxLDYzLjU0MSwxMi41Wk02MC41OCwzLjc1NUE1LjE4Myw1LjE4MywwLDAsMCw2MS44LDAsNS4yNzIsNS4yNzIsMCwwLDAsNTguMzQsMS43ODFhNC45Myw0LjkzLDAsMCwwLTEuMjQ5LDMuNjM5QTQuMzYxLDQuMzYxLDAsMCwwLDYwLjU4LDMuNzU1WiIgZmlsbD0iIzk3YTBiNCIvPgogIDwvZz4KPC9zdmc+Cg==)",
        },
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

  const rows = [
    { summary: "Api Testcases", info: info?.api_testcases_count },
    { summary: "Web Testcases", info: info?.web_testcases_count },
    { summary: "Android Testcases", info: info?.android_testcases_count },
    { summary: "IOS Testcases", info: info?.ios_testcases_count },
  ];

  return (
    <Paper variant="outlined">
      <TableContainer>
        <HighchartsReact
          highcharts={Highcharts}
          options={automationGraphData}
        />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Summary</TableCell>
              <TableCell align="right">Info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.summary}>
                <TableCell component="th" scope="row">
                  {row.summary}
                </TableCell>
                <TableCell align="right">{row.info ?? 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
