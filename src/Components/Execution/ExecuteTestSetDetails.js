import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import Table from "../../CustomComponent/Table";
import TestsetExecutionToolbar from "../TestSet/TestsetExecutionToolbar";
import MuiltiSelect from "../../CustomComponent/MuiltiSelect";

const data = [];

function ExecuteTestSetDetails({
  testsetId,
  applicationId,
  projectId,
}) {
  const [testcaseList, settestcaseList] = useState([]);
  const [selectedtestcases, setSelectedtestcases] = useState([]);
  // const [selecteddatasets, setSelecteddatasets] = useState([]);

  

  const columns = [
    {
      field: "name",
      headerName: "Testcase name",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "datasets",
      headerName: "Datasets",
      renderCell: (param) => {
          return (
                      <div>
                        <MuiltiSelect
                          sx={{
                            "& .MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline":
                              {
                                border: "none",
                              },
                          }}
                          preselect={[param.row?.datasets[0]]}
                          options={param.row.datasets}
                          value="name"
                          id="dataset_id"
                          stateList={(list) => {
                            const obj = {
                              testcase_id: param.row.testcase_id,
                              selected_testcase_dataset_ids: list.map(val => val.dataset_id),
                            };
                            const index = data.findIndex(obj=>obj.testcase_id === param.row.testcase_id)
                            index === -1 ? data.push(obj) : data[index] = obj;
                            console.log(data);
                          }}
                        ></MuiltiSelect>
                      </div>
                    );
                  },
                  flex: 2,
                  sortable: false,
                  align: "left",
                },
              ];
            
              console.log(selectedtestcases);
              console.log(data);
            
              const handleClose = () => {
                settestcaseList([]);
                setSelectedtestcases([]);
              };
            
              useEffect(() => {
                  axios
                    .get(
                      `qfservice/webtestset/getTestcasesInWebTestset?testset_id=${testsetId}`
                    )
                    .then((resp) => {
                      console.log(resp?.data?.info);
                      settestcaseList(resp?.data?.info);
                    });
              }, [testsetId]);
            
              useEffect(() => {
                console.log(data);
              }, [selectedtestcases])

  return (
    <div>
          <TestsetExecutionToolbar
            projectId={projectId}
            applicationId={applicationId}
            selectedtestcases={selectedtestcases}
            testsetId={testsetId}
            // selecteddatasets = {selecteddatasets}
            selecteddatasets = {data}
          />
          <Table
            rows={testcaseList}
            hideSearch={true}
            columns={columns}
            checkboxSelection={true}
            selectionModel={selectedtestcases}
            setSelectionModel={setSelectedtestcases}
            getRowId={(row) => row.testcase_id}
          />
        
          {/* <Button variant="contained" onClick={handleClose}>
            Close
          </Button> */}
    </div>
  );
}

export default ExecuteTestSetDetails;
////////////////////////////////////////
// import React from "react";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import Table from "../../CustomComponent/Table";
// import TestsetExecutionToolbar from "../TestSet/TestsetExecutionToolbar";
// import MuiltiSelect from "../../CustomComponent/MuiltiSelect";

// const data = [];

// function ExecuteTestSetDetails({
//   open,
//   close,
//   testsetId,
//   applicationId,
//   projectId,
// }) {
//   const [testcaseList, settestcaseList] = useState([]);
//   const [selectedtestcases, setSelectedtestcases] = useState([]);
  
//   const columns = [
//     {
//       field: "name",
//       headerName: "Testcase name",
//       flex: 3,
//       sortable: false,
//       align: "left",
//     },
//     {
//       field: "description",
//       headerName: "Description",
//       flex: 3,
//       sortable: false,
//       align: "left",
//     },
//     {
//       field: "datasets",
//       headerName: "Datasets",
//       renderCell: (param) => {
//         return (
//           <div>
//             <MuiltiSelect
//               sx={{
//                 "& .MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline":
//                   {
//                     border: "none",
//                   },
//               }}
//               preselect={[param.row?.datasets[0]]}
//               options={param.row.datasets}
//               value="name"
//               id="dataset_id"
//               stateList={(list) => {
//                 const obj = {
//                   testcase_id: param.row.testcase_id,
//                   selected_testcase_dataset_ids: list.map(val => val.dataset_id),
//                 };
//                 const index = data.findIndex(obj=>obj.testcase_id === param.row.testcase_id)
//                 index === -1 ? data.push(obj) : data[index] = obj;
//                 console.log(data);
//               }}
//             ></MuiltiSelect>
//           </div>
//         );
//       },
//       flex: 2,
//       sortable: false,
//       align: "left",
//     },
//   ];

//   console.log(selectedtestcases);
//   console.log(data);

//   const handleClose = () => {
//     close(false);
//     settestcaseList([]);
//     setSelectedtestcases([]);
//   };

//   useEffect(() => {
//     open &&
//       axios
//         .get(
//           `qfservice/webtestset/getTestcasesInWebTestset?testset_id=${testsetId}`
//         )
//         .then((resp) => {
//           console.log(resp?.data?.info);
//           settestcaseList(resp?.data?.info);
//         });
//   }, [open, testsetId]);

//   useEffect(() => {
//     console.log(data);
//   }, [selectedtestcases])
  

//   return (
//     <div>
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
//         <DialogTitle>Execution</DialogTitle>
//         <DialogContent>
//           <TestsetExecutionToolbar
//             projectId={projectId}
//             applicationId={applicationId}
//             selectedtestcases={selectedtestcases}
//             testsetId={testsetId}
//             selecteddatasets = {data}
//           />
//           <Table
//             rows={testcaseList}
//             columns={columns}
//             checkboxSelection={true}
//             selectionModel={selectedtestcases}
//             setSelectionModel={setSelectedtestcases}
//             getRowId={(row) => row.testcase_id}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" onClick={handleClose}>
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default ExecuteTestSetDetails;

