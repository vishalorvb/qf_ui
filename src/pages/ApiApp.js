import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getProject } from "../Services/ProjectService";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

export default function ApiApp() {
  const { setHeader } = useHead();
  const { auth } = useAuth();
  const navigate = useNavigate();

  let [project, setProject] = useState([]);

  const pageColumns = [
    {
      field: "project_name",
      headerName: "Project Name",
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
                navigate("apiRequests", { state: { id: param.row.project_id } })
              }
            />
          </div>
        );
      },
    },
  ];


  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "API",
      };
    });
  }, []);

  useEffect(() => {
    // axios.get(`/qfservice/projects?user_id=${auth?.userId}`).then((res) => {
    //   console.log(res.data.result.projects_list);
    //   setProject(res.data.result.projects_list);
    // });
    getProject(setProject,auth.info.id)
  }, []);

  return (
    <>
      <Table
        rows={project}
        columns={pageColumns}
        getRowId={(row) => row.project_id}
      />
      <Outlet />
    </>
  );
}
