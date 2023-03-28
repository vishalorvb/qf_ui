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
import ExecutionToolbar from "../TestCases/ExecutionToolbar";
import TestsetExecutionToolbar from "../TestSet/TestsetExecutionToolbar";
import MuiltiSelect from "../../CustomComponent/MuiltiSelect";

function TestcaseSelectAndExecute({
  open,
  close,
  testsetId,
  applicationId,
  projectId,
}) {
  const [testcaseList, settestcaseList] = useState([]);
  const [selectedtestcases, setSelectedtestcases] = useState([]);

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
    //   renderCell: (param) => {
    //     let opt = [
    //       {
    //         id: "custom_code",
    //         val: "Custom Code",
    //       },
    //       {
    //         id: "displayed",
    //         val: "Displayed",
    //       },
    //       {
    //         id: "element_wait",
    //         val: "Element Wait",
    //       },
    //       {
    //         id: "scrollup",
    //         val: "Scroll Up",
    //       },
    //       {
    //         id: "scrolldown",
    //         val: "Scroll Down",
    //       },
    //       {
    //         id: "is_random",
    //         val: "Random",
    //       },
    //     ];
    //     let alllist = [
    //       "custom_code",
    //       "displayed",
    //       "element_wait",
    //       "scrollup",
    //       "scrolldown",
    //       "is_random",
    //       "is_enter",
    //     ];
    //     let flag = false;
    //     let preselect = opt.filter((e) => {
    //       if (param.row.dataset_values[e.id]) {
    //         return e;
    //       }
    //     });
    //     return (
    //       <div>
    //         <MuiltiSelect
    //           sx={{
    //             "& .MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline":
    //               {
    //                 border: "none",
    //               },
    //           }}
    //           preselect={preselect}
    //           // preselect ={opt}
    //           options={opt}
    //           value="val"
    //           id="id"
    //           stateList={(list) => {
    //             let templist = list.map((obj) => obj["id"]);
    //             if (flag || preselect.length !== templist.length) {
    //               flag = true;
    //               alllist.forEach((l) => {
    //                 if (templist.includes(l)) {
    //                 //   updateDataset(param.row.element_id, l, true);
    //                 } else {
    //                 //   updateDataset(param.row.element_id, l, false);
    //                 }
    //               });
    //             }
    //           }}
    //         ></MuiltiSelect>
    //       </div>
    //     );
    //   },
    //   flex: 2,
    //   sortable: false,
    //   align: "left",
      flex: 3,
      sortable: false,
      align: "left",
    },
  ];

  const handleClose = () => {
    close(false);
    settestcaseList([]);
    setSelectedtestcases([]);
  };

  useEffect(() => {
    open &&
      axios
        .get(
          //   `qfservice/webtestcase/getWebTestcaseInfo?testcase_id=${testsetId}`
          `qfservice/webtestset/getTestcasesInWebTestset?testset_id=${testsetId}`
        )
        .then((resp) => {
          console.log(resp?.data?.info);
          settestcaseList(resp?.data?.info);
        });
  }, [open, testsetId]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>Execution</DialogTitle>
        <DialogContent>
          <TestsetExecutionToolbar
            projectId={projectId}
            applicationId={applicationId}
            selectedtestcases={selectedtestcases}
            testsetId={testsetId}
          />
          <Table
            rows={testcaseList}
            columns={columns}
            checkboxSelection={true}
            selectionModel={selectedtestcases}
            setSelectionModel={setSelectedtestcases}
            getRowId={(row) => row.testcase_id}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TestcaseSelectAndExecute;
