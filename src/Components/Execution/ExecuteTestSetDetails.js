import React from "react";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import Table from "../../CustomComponent/Table";
import TestsetExecutionToolbar from "../TestSet/TestsetExecutionToolbar";
import MuiltiSelect from "../../CustomComponent/MuiltiSelect";
import useHead from "../../hooks/useHead";

const data = [];

function ExecuteTestSetDetails({
  testsetId,
  applicationId,
  projectId,
  frameworkType,
  applicationType,
}) {
  const [testcaseList, settestcaseList] = useState([]);
  const [selectedtestcases, setSelectedtestcases] = useState([]);
  const {
    globalProject,
    setglobalProject,
    globalApplication,
    setglobalApplication,
  } = useHead();
  console.log(globalApplication);
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
        const defaultDataset =
          globalApplication?.module_type === 1
            ? param?.row?.api_datasets?.find(
                (dataset) => dataset?.is_default === true
              )
            : param?.row?.datasets?.find(
                (dataset) => dataset?.is_default === true
              );
        //console.log(
        //    param?.row?.api_datasets?.find(
        //        (dataset) => dataset?.is_default === true
        //    )
        //);

        // data.push({
        //   testcase_id: param.row.testcase_id,
        //   selected_testcase_dataset_ids: defaultDataset
        //     ? [
        //         applicationType === 1
        //           ? defaultDataset?.testcase_dataset_id
        //           : defaultDataset?.dataset_id,
        //       ]
        //     : [],
        // });
        console.log(param.row);
        console.log(globalApplication?.module_type);
        //console.log(param.row.datasets.filter(ds=>ds.is_default===true))
        return (
          <div>
            <MuiltiSelect
              //  preselect={param.row.datasets.filter(ds=>ds.is_default===true)}
              preselect={
                globalApplication?.module_type === 1
                  ? param.row?.api_datasets?.filter(
                      (ds) => ds.is_default === true
                    )
                  : param.row.datasets?.filter((ds) => ds.is_default === true)
              }
              //preselect={[]}
              options={
                globalApplication?.module_type === 1
                  ? param?.row?.api_datasets
                  : param?.row?.datasets
              }
              value={
                globalApplication.module_type === 1
                  ? "dataset_name_in_testcase"
                  : "name"
              }
              //  testcase_dataset_id
              //  id="dataset_id"
              id={
                globalApplication?.module_type === 1
                  ? "testcase_dataset_id"
                  : "dataset_id"
              }
              stateList={(list) => {
                console.log(list);
                const obj = {
                  testcase_id: param.row.testcase_id,
                  selected_testcase_dataset_ids: list.map((val) =>
                    globalApplication?.module_type === 1
                      ? val?.testcase_dataset_id
                      : val?.dataset_id
                  ),
                };
                const index = data.findIndex(
                  (obj) => obj.testcase_id === param.row.testcase_id
                );
                index === -1 ? data.push(obj) : (data[index] = obj);
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
    settestcaseList([]);
    setSelectedtestcases([]);
  };

  useEffect(() => {
    if (testsetId) {
      globalApplication?.module_type === 1
        ? axios
            .get(`/qfservice/GetTestcasesInTestset?testset_id=${testsetId}`)
            .then((resp) => {
              const data = resp?.data?.data;
              settestcaseList(data);
            })
        : axios
            .get(
              `/qfservice/webtestset/getTestcasesInWebTestset?testset_id=${testsetId}`
            )
            .then((resp) => {
              const data = resp?.data?.info;
              settestcaseList(data);
            });
    } else {
      settestcaseList([]);
    }
  }, [testsetId]);

  return (
    <div>
      <TestsetExecutionToolbar
        projectId={projectId}
        applicationId={applicationId}
        selectedtestcases={selectedtestcases}
        testsetId={testsetId}
        selecteddatasets={data}
        frameworkType={frameworkType}
        applicationType={globalApplication?.module_type}
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
    </div>
  );
}

export default ExecuteTestSetDetails;
