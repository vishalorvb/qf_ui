import { useEffect, useState } from "react";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useHead from "../../hooks/useHead";
import useAuth from "../../hooks/useAuth";
import { getPages } from "../../Services/ApplicationService";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Table from "../../CustomComponent/Table";
export default function PagesTable(props) {
  const { location, actionType } = props;
  const navigate = useNavigate();

  let [page, setPage] = useState([]);

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
            {}
            <VisibilityOutlinedIcon
              className="eyeIcon"
              onClick={() =>
                actionType === "screen"
                  ? navigate("selectElements", {
                      state: {
                        id: param.row.web_page_id,
                        applicationId: location.state.id,
                      },
                    })
                  : navigate("PageElements", {
                      state: { id: param.row.web_page_id },
                    })
              }
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getPages(setPage, location.state.id);
    console.log(location.state);
  }, []);
  return (
    <>
      <Table
        rows={page}
        columns={pageColumns}
        getRowId={(row) => row.web_page_id}
      />
      <Outlet />
    </>
  );
}
