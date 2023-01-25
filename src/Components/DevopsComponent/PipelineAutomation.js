import { useEffect, useState } from "react";
import useHead from "../../hooks/useHead";
import Table from "../../CustomComponent/Table";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";

export default function PipelineAutomation() {
  const { setHeader } = useHead();
  const navigate = useNavigate();

  useEffect(() => {
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
      field: "lastUpdate",
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
          <Typography onClick={() => navigate("report")}>Report</Typography>
        );
      },
    },
  ];

  const instances = [
    {
      id: 1,
      name: "Instance 1",
      description: "Description 1",
    },
    {
      id: 2,
      name: "Instance 2",
      description: "Description 2",
    },
    {
      id: 3,
      name: "Instance 3",
      description: "Description 3",
    },
    {
      id: 4,
      name: "Instance 4",
      description: "Description 4",
    },
  ];
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography>
          Release:
          <Typography variant="p" sx={{ color: "blue" }}>
            View Log
          </Typography>
        </Typography>
        <Button variant="contained">Release Now</Button>
      </Stack>

      <Table rows={instances} columns={instanceColumns} />
      <Outlet />
    </>
  );
}
