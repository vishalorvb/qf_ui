import { useEffect, useState } from "react";
import Table from "../../CustomComponent/Table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { getPipelines } from "../../Services/DevopsServices";

export default function Pipeline() {
  const navigate = useNavigate();

  const [instances, setInstances] = useState([]);

  useEffect(() => {
    getPipelines(setInstances);
  }, []);

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
            <EditOutlinedIcon onClick={() => console.log("first")} />
          </div>
        );
      },
    },
  ];

  return <Table rows={instances} columns={instanceColumns} />;
}
