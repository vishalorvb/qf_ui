import { useEffect, useState } from "react";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useHead from "../../hooks/useHead";
import useAuth from "../../hooks/useAuth";
import { getPages } from "../../Services/ApplicationService";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Table from "../../CustomComponent/Table";
import { Typography } from "@mui/material";
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
      renderCell: (param) => {
        return (
          <Typography
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
            variant="p"
            className="nameColumn"
          >
            {param?.row?.name}
          </Typography>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
      sortable: false,
    },
    // {
    //   field: "Actions",
    //   headerName: "Actions",
    //   flex: 3,
    //   sortable: false,
    //   align: "center",
    //   headerAlign: "center",
    //   renderCell: (param) => {
    //     return (
    //       <div>
    //         {}
    //         <VisibilityOutlinedIcon
    //           className="eyeIcon"
    //           onClick={() =>
    //             actionType === "screen"
    //               ? navigate("selectElements", {
    //                   state: {
    //                     id: param.row.web_page_id,
    //                     applicationId: location.state.id,
    //                   },
    //                 })
    //               : navigate("PageElements", {
    //                   state: { id: param.row.web_page_id },
    //                 })
    //           }
    //         />
    //       </div>
    //     );
    //   },
    // },
  ];

  useEffect(() => {
    getPages(setPage, location.state.module_id);
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

// const PagesDescriptionCell = (param, setPages, auth, location) => {
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   return (
//     <div className="descColumn">
//       <Typography variant="p">{param?.row?.module_desc}</Typography>
//       <MoreVertIcon
//         id="basic-button"
//         aria-controls={open ? "basic-menu" : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? "true" : undefined}
//         onClick={handleClick}
//         className="descOption"
//       />

//       <Menu
//         id="basic-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           "aria-labelledby": "basic-button",
//         }}
//       >
//         <MenuItem
//           onClick={() => navigate("/createApplication", { state: param?.row })}
//         >
//           <EditOutlinedIcon sx={{ color: "blue", mr: 1 }} />
//           Edit
//         </MenuItem>
//         <MenuItem
//           onClick={() =>
//             deleteApplication(param.row.module_id, auth.info.id).then((res) => {
//               if (res) {
//                 getPages(setApplication,location.state.module_id);
//               }
//             })
//           }
//         >
//           <DeleteOutlineIcon sx={{ color: "red", mr: 1 }} />
//           Delete
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// };
