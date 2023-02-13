import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

export default function MobileApp() {
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

  const applications = [
    {
      id: 1,
      name: "Application 1",
      description: "Description 1",
    },
    {
      id: 2,
      name: "Application 2",
      description: "Description 2",
    },
    {
      id: 3,
      name: "Application 3",
      description: "Description 3",
    },
    {
      id: 4,
      name: "Application 4",
      description: "Description 4",
    },
  ];

  useEffect(() => {
    axios.get(`/qfservice/projects?user_id=${auth?.userId}`).then((res) => {
      console.log(res.data.result.projects_list);
      setProject(res.data.result.projects_list);
    });

    setHeader((ps) => {
      return { ...ps, name: "Mobile" };
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
