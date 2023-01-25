import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { getPipelines } from "../Services/DevopsServices";

export default function Pipeline() {
  const { setHeader } = useHead();
  const navigate = useNavigate();

  const [instances, setInstances] = useState([]);

  useEffect(() => {
    getPipelines(setInstances);
    setHeader((ps) => {
      return {
        ...ps,
        name: "Pipeline Instances",
        plusButton: true,
        plusCallback: () => navigate("CreatePipeline", { state: { id: 0 } }),
      };
    });
    return () =>
      setHeader((ps) => {
        return {
          ...ps,
          name: "",
          plusButton: false,
          plusCallback: () => console.log("null"),
        };
      });
  }, []);

  const instanceColumns = [
    {
      field: "release_name",
      headerName: "Name",
      flex: 3,
      sortable: false,
      renderCell: (param) => {
        return (
          <Typography
            variant="p"
            onClick={() =>
              navigate("pipelineAutomation", { state: { id: param.row.id } })
            }
            sx={{ cursor: "pointer" }}
          >
            {param.row.release_name}
          </Typography>
        );
      },
    },
    {
      field: "release_desc",
      headerName: "Description",
      flex: 3,
      sortable: false,
    },
    {
      field: "updated_at",
      headerName: "Last Updated",
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
          <div>
            <EditOutlinedIcon
              onClick={() =>
                navigate("CreatePipeline", { state: { id: param.row.id } })
              }
            />
            <DeleteOutlinedIcon />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table rows={instances} columns={instanceColumns} />
      <Outlet />
    </>
  );
}
