import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Table from "../../../CustomComponent/Table";
import useHead from "../../../hooks/useHead";
export default function WebTestcase() {
  const navigate = useNavigate();
  const { setHeader, header } = useHead();
  let [page, setPage] = useState([]);

  const pageColumns = [
    {
      field: "name",
      headerName: "Testcase",
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
      // renderCell: (param) => {
      //   return (
      //     <div>
      //       {}
      //       <VisibilityOutlinedIcon
      //         className="eyeIcon"
      //         onClick={() =>
      //           actionType === "screen"
      //             ? navigate("selectElements", {
      //                 state: {
      //                   id: param.row.web_page_id,
      //                   applicationId: location.state.id,
      //                 },
      //               })
      //             : navigate("PageElements", {
      //                 state: { id: param.row.web_page_id },
      //               })
      //         }
      //       />
      //     </div>
      //   );
      // },
    },
  ];

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Testcase",
        plusButton: true,
        plusCallback: () => navigate("CreateTestcase"),
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
  return (
    <>
      <Table
        rows={page}
        columns={pageColumns}
        // getRowId={(row) => row.web_page_id}
      />
      <Outlet />
    </>
  );
}
