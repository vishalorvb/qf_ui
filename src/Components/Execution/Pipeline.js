import { useEffect, useState } from "react";
import Table from "../../CustomComponent/Table";
import { Button } from "@mui/material";
import { executePipeline, getPipelines } from "../../Services/DevopsServices";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";

export default function Pipeline({ selectedProject }) {
  const [executionRes, setExecutionRes] = useState();
  const [msg, setMsg] = useState(false);
  const [instances, setInstances] = useState([]);

  useEffect(() => {
    const module = selectedProject?.find(
      (module) => module?.module_type === 20
    );
    module?.module_id && getPipelines(setInstances, module?.module_id);
    console.log(module?.module_id);
  }, [selectedProject]);

  const instanceColumns = [
    {
      field: "release_name",
      headerName: "Name",
      flex: 3,
      sortable: false,
    },
    {
      field: "release_desc",
      headerName: "Description",
      flex: 3,
      sortable: false,
    },

    {
      field: "Execute",
      headerName: "Execute",
      flex: 3,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (param) => {
        return (
          <div>
            <Button
              size="small"
              variant="contained"
              onClick={() => executePipeline(setMsg, param.row.id)}
            >
              Execute
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <SnackbarNotify
        open={msg && true}
        close={setMsg}
        msg={msg}
        severity="success"
      />
      {executionRes?.data?.message}
      <Table rows={instances} columns={instanceColumns} />
    </>
  );
}
