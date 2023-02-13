import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

export default function WebApp() {
  const { setHeader } = useHead();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [project, setProject] = useState([]);

  const applicationColumns = [
    {
      field: "project_name",
      headerName: "Application Name",
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
      field: "Actions",
      headerName: "Actions",
      flex: 3,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (param) => {
        return (
          <div>
            <NearMeOutlinedIcon
              onClick={() =>
                navigate("pages", { state: { id: param.row.project_id } })
              }
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    axios.get(`/qfservice/projects?user_id=${auth?.userId}`).then((res) => {
      console.log(res.data.result.projects_list);
      setProject(res.data.result.projects_list);
    });

    setHeader((ps) => {
      return { ...ps, name: "Web" };
    });
  }, []);

  return (
    <>
      <Table
        rows={project}
        columns={applicationColumns}
        getRowId={(row) => row.project_id}
      />
      <Outlet />
    </>
  );
}
