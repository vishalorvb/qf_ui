import { useEffect, useState } from "react";
import axios from "../../api/axios";
import Table from "../../CustomComponent/Table";
import ExecutionToolbar from "../TestCases/ExecutionToolbar";

export default function ExecutionDetails({
  testcaseId,
  applicationId,
  projectId,
  applicationType,
  frameworkType,
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
    setDataList([]);
    setSelectedDatasets([]);
  };

  useEffect(() => {
    applicationType === 1
      ? axios
          .get(`/qfservice/api/testcases/${testcaseId}/datasets`)
          .then((resp) => {
            const dataset = resp?.data?.data ?? [];
            setDataList(() =>
              dataset?.map((data) => {
                return {
                  dataset_id: data?.testcase_dataset_id,
                  name: data?.dataset_name_in_testcase,
                  description: data?.description,
                  testcase_id: data?.testcase_id,

                  is_default: data?.is_default,
                };
              })
            );
          })
      : axios
          .get(
            `qfservice/webtestcase/getWebTestcaseInfo?testcase_id=${testcaseId}`
          )
          .then((resp) => {
            setDataList(resp?.data?.info?.datasets ?? []);
          });
  }, [testcaseId]);

  return (
    <>
      <ExecutionToolbar
        projectId={projectId}
        applicationId={applicationId}
        selectedDatasets={selectedDatasets}
        testcaseId={testcaseId}
        applicationType={applicationType}
        frameworkType={frameworkType}
      />
      <Table
        rows={datasetList}
        hideSearch={true}
        columns={columns}
        checkboxSelection={true}
        selectionModel={selectedDatasets}
        setSelectionModel={setSelectedDatasets}
        getRowId={(row) => row.dataset_id}
      />
    </>
  );
}
