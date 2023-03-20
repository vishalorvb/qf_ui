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

export default function DatasetSelectAndExecute({
  open,
  close,
  testcaseId,
  applicationId,
  projectId,
}) {
  const [datasetList, setDataList] = useState([]);
  const [selectedDatasets, setSelectedDatasets] = useState([]);
  const columns = [
    {
      field: "name",
      headerName: "Dataset name",
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
    setDataList([]);
    setSelectedDatasets([]);
  };

  useEffect(() => {
    open &&
      axios
        .get(
          `qfservice/webtestcase/getWebTestcaseInfo?testcase_id=${testcaseId}`
        )
        .then((resp) => {
          console.log(resp?.data?.info?.datasets);
          setDataList(resp?.data?.info?.datasets);
        });
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>Execution Progress</DialogTitle>
      <DialogContent>
        <ExecutionToolbar
          projectId={projectId}
          applicationId={applicationId}
          selectedDatasets={selectedDatasets}
          testcaseId={testcaseId}
        />
        <Table
          rows={datasetList}
          columns={columns}
          checkboxSelection={true}
          selectionModel={selectedDatasets}
          setSelectionModel={setSelectedDatasets}
          getRowId={(row) => row.dataset_id}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
