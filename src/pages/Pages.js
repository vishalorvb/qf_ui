import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getWebpages } from "../Services/ProjectService";


export default function Pages() {
  const { setHeader } = useHead();
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.state.id)

  let [page,setPage]=useState([])

  const pageColumns = [
    {
      field: "name",
      headerName: "Pages",
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
            {/* <Link to={String(param.row.web_page_id)}>
              <NearMeOutlinedIcon />
            </Link> */}
            <NearMeOutlinedIcon onClick={()=>navigate("PageElements",{state:{id:param.row.web_page_id}})} />
          </div>
        );
      },
    },
  ];

  // const pages = [
  //   {
  //     id: 1,
  //     name: "Application 1",
  //     description: "Description 1",
  //   },
  //   {
  //     id: 2,
  //     name: "Application 2",
  //     description: "Description 2",
  //   },
  //   {
  //     id: 3,
  //     name: "Application 3",
  //     description: "Description 3",
  //   },
  //   {
  //     id: 4,
  //     name: "Application 4",
  //     description: "Description 4",
  //   },
  // ];

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Pages",
        plusButton: true,
        plusCallback: () => console.log("hurray"),
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
  useEffect(() => {
  getWebpages(setPage,1035)
  }, [])

  return (
    <>
      <Table rows={page} 
      columns={pageColumns} 
      getRowId={row => row.web_page_id}
      />
      <Outlet />
    </>
  );
}
