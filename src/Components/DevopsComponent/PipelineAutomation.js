import { useEffect, useState } from "react";
import useHead from "../../hooks/useHead";
import Table from "../../CustomComponent/Table";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import {
  getPipelinesHistory,
  executePipeline,
} from "../../Services/DevopsServices";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";

export default function PipelineAutomation() {
  const { setHeader } = useHead();
  const navigate = useNavigate();
  const location = useLocation();
  const [history, setHistory] = useState([]);
  const [releaseLog, setReleaseLog] = useState([]);
  const [executionRes, setExecutionRes] = useState([]);
  const [msg, setMsg] = useState(false);

  useEffect(() => {
    setMsg(true);
  }, [executionRes]);

  useEffect(() => {
    getPipelinesHistory(setHistory, setReleaseLog, location.state.id);
    setHeader((ps) => {
      return {
        ...ps,
        name: "Pipeline Automation",
      };
    });
  }, []);

  const instanceColumns = [
    {
      field: "name",
      headerName: "Name",
      flex: 3,
      sortable: false,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
      sortable: false,
    },
    {
      field: "created_at_string",
      headerName: "Released at",
      flex: 3,
      sortable: false,
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 3,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (param) => {
        return (
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate("report", { state: { id: param.row.id } })}
          >
            Report
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <SnackbarNotify
        open={msg}
        close={setMsg}
        msg={executionRes?.data?.message}
        severity="success"
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography>
          Release:
          <a href={releaseLog}>View Log</a>
        </Typography>
        <Button
          variant="contained"
          onClick={() => executePipeline(setExecutionRes, location.state.id)}
        >
          Release Now
        </Button>
      </Stack>
      <Table rows={history} columns={instanceColumns} />
      <Outlet />
    </>
  );
}
