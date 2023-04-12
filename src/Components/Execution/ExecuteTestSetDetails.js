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

function ExecuteTestSetDetails({
  selectedItem,
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
      renderCell: (param) => {
        let option = param.row.datasets.map(dataset => {
            return {
                id : dataset.dataset_id,
                val : dataset.name
            }
        })
        // let opt = [
        //   {
        //     id: "custom_code",
        //     val: "Custom Code",
        //   },
        //   {
        //     id: "displayed",
        //     val: "Displayed",
        //   },
        //   {
        //     id: "element_wait",
        //     val: "Element Wait",
        //   },
        //   {
        //     id: "scrollup",
        //     val: "Scroll Up",
        //   },
        //   {
        //     id: "scrolldown",
        //     val: "Scroll Down",
        //   },
        //   {
        //     id: "is_random",
        //     val: "Random",
        //   },
        // ];
        // let alllist = [
        //   "custom_code",
        //   "displayed",
        //   "element_wait",
        //   "scrollup",
        //   "scrolldown",
        //   "is_random",
        //   "is_enter",
        // ];
        let flag = false;
        // let preselect = opt.filter((e) => {
        //   if (param.row.dataset_values[e.id]) {
        //     return e;
        //   }
        // });
        return (
          <div>
            <MuiltiSelect
              sx={{
                "& .MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline":
                  {
                    border: "none",
                  },
              }}
              preselect={[]}
              // preselect ={opt}
              options={option}
              value="val"
              id="id"
              stateList={(list) => {
                console.log(list)
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

  const handleClose = () => {
   // close(false);
    settestcaseList([]);
    setSelectedtestcases([]);
  };

  useEffect(() => {
    // open &&
      axios
        .get(
          //   `qfservice/webtestcase/getWebTestcaseInfo?testcase_id=${testsetId}`
          `qfservice/webtestset/getTestcasesInWebTestset?testset_id=${selectedItem}`
        )
        .then((resp) => {
          console.log(resp?.data?.info);
          settestcaseList(resp?.data?.info);
        });
  }, [selectedItem]);

  return (
    <div>
          <TestsetExecutionToolbar
            projectId={projectId}
            applicationId={applicationId}
            selectedtestcases={selectedtestcases}
            testsetId={testsetId}
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
