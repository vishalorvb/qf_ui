import React, { useEffect, useState } from "react";
import Table from "../../CustomComponent/Table";
import useAuth from "../../hooks/useAuth";
import useHead from "../../hooks/useHead";
import { getProject } from "../../Services/ProjectService";

function ActiveReports() {
  const [project, setProject] = useState([]);
  const { auth } = useAuth();

  const columns = [
    {
      field: "project_name",
      headerName: "Testset Name",
      flex: 4,
      headerAlign: "left",
      sortable: false,
      align: "left",
    },
    {
      field: "project_name",
      headerName: "Execution Date",
      flex: 4,
      headerAlign: "left",
      sortable: false,
      align: "left",
    },
    {
      field: "project_name",
      headerName: "Pass/Fail Count",
      flex: 4,
      headerAlign: "left",
      sortable: false,
      align: "left",
    },
    {
      field: "",
      headerName: "",
      flex: 4,
      headerAlign: "left",
      sortable: false,
      align: "left",
      //   renderCell: (param) => {
      //     return (
      //       <>
      //         <Grid container justifyContent={"flex-end"} spacing={3}>
      //           <Grid item mt={1.5}>
      //             <p
      //               onClick={() => phaseHandler()}
      //               style={{ color: "#009fee", cursor: "pointer" }}
      //             >
      //               {12} Active Reports
      //             </p>
      //           </Grid>
      //           <Grid item>
      //             <Tooltip title="Delete">
      //               <IconButton
      //                 onClick={(e) => {
      //                   deleteUserHandler(param.row);
      //                 }}
      //                 //   sx={{ ml: 4 }}
      //               >
      //                 <DeleteOutlineOutlinedIcon />
      //               </IconButton>
      //             </Tooltip>
      //           </Grid>
      //         </Grid>
      //       </>
      //     );
      //   },
    },
  ];

  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Active Reports",
      };
    });
  }, []);

  useEffect(() => {
    getProject(setProject, auth.userId);
  }, []);

  return (
    <div>
      <Table
        searchPlaceholder="Search Testset"
        columns={columns}
        //   rows={drivenWebTSObject}
        rows={project}
        getRowId={(row) => row.project_id}
      />
    </div>
  );
}

export default ActiveReports;
