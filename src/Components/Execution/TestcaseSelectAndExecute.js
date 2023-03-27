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

function TestcaseSelectAndExecute({
  open,
  close,
  testcaseId,
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
          `qfservice/webtestcase/getWebTestcaseInfo?testcase_id=${testcaseId}`
        )
        .then((resp) => {
          console.log(resp?.data?.info?.datasets);
          settestcaseList(resp?.data?.info?.datasets);
        });
  }, [open, testcaseId]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>Execution</DialogTitle>
        <DialogContent>
          <ExecutionToolbar
            projectId={projectId}
            applicationId={applicationId}
            selectedtestcases={selectedtestcases}
            testcaseId={testcaseId}
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
