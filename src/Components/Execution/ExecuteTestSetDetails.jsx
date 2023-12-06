import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../CustomComponent/Table";
import TestsetExecutionToolbar from "../TestSet/TestsetExecutionToolbar";
import MuiltiSelect from "../../CustomComponent/MuiltiSelect";
import useHead from "../../hooks/useHead";
import { qfservice } from "../../Environment";

function ExecuteTestSetDetails({
  testsetId,
  applicationId,
  projectId,
  frameworkType,
}) {
  const [testcaseList, settestcaseList] = useState([]);
  const [selectedtestcases, setSelectedtestcases] = useState([]);
  const { globalApplication } = useHead();
  const [data, setData] = useState({});
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
              preselect={data[param?.row?.testcase_id] ?? []}
              options={
                globalApplication?.module_type === 1
                  ? param?.row?.api_datasets
                  : param?.row?.datasets
              }
              value={
                globalApplication?.module_type === 1
                  ? "dataset_name_in_testcase"
                  : "name"
              }
              id={
                globalApplication?.module_type === 1
                  ? "testcase_dataset_id"
                  : "dataset_id"
              }
              stateList={(list) => {
                setData((prevData) => {
                  return {
                    ...prevData,
                    [param.row.testcase_id]: list?.map((val) => val),
                  };
                });
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

  useEffect(() => {
    console.log(globalApplication, testsetId);
    if (
      testsetId !== null &&
      testsetId !== undefined &&
      globalApplication !== undefined &&
      globalApplication !== null
    ) {
      globalApplication?.module_type === 1
        ? axios
            .get(`${qfservice}/GetTestcasesInTestset?testset_id=${testsetId}`)
            .then((resp) => {
              const data = resp?.data?.data;
              settestcaseList(data);

              setData(() => {
                const obj = {};
                data?.forEach(
                  (testcase) =>
                    (obj[testcase?.testcase_id] =
                      testcase?.api_datasets?.filter(
                        (dataset) => dataset?.is_default
                      ))
                );
                return obj;
              });
            })
        : axios
            .get(
              `${qfservice}/webtestset/getTestcasesInWebTestset?testset_id=${testsetId}`
            )
            .then((resp) => {
              const data = resp?.data?.info;
              settestcaseList(data);

              setData(() => {
                const obj = {};
                data?.forEach(
                  (testcase) =>
                    (obj[testcase?.testcase_id] = testcase?.datasets?.filter(
                      (dataset) => dataset?.is_default
                    ))
                );
                return obj;
              });
            });
    } else {
      settestcaseList([]);
    }
  }, [testsetId, globalApplication]);

  return (
    <div>
      <TestsetExecutionToolbar
        projectId={projectId}
        applicationId={applicationId}
        selectedtestcases={selectedtestcases}
        testsetId={testsetId}
        selecteddatasets={selectedtestcases?.map((testcase_id) => {
          return {
            testcase_id: testcase_id,
            selected_testcase_dataset_ids: data[testcase_id]?.map((dataset) =>
              globalApplication?.module_type === 1
                ? dataset?.testcase_dataset_id
                : dataset?.dataset_id
            ),
          };
        })}
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
