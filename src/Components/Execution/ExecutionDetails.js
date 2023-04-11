
  import { useEffect, useState } from "react";
  import axios from "../../api/axios";
  import Table from "../../CustomComponent/Table";
  import ExecutionToolbar from "../TestCases/ExecutionToolbar";
  
  export default function ExecutionDetails({
    selectedItem,
    testcaseId,
    applicationId,
    projectId,
    applicationType,
  }) {
    console.log(selectedItem)
    console.log(applicationId)
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
    //   close(false);
      setDataList([]);
      setSelectedDatasets([]);
    };
  
    useEffect(() => {
    //   open &&
        axios
          .get(
            `qfservice/webtestcase/getWebTestcaseInfo?testcase_id=${selectedItem}`
          )
          .then((resp) => {
            console.log(resp);
            setDataList(resp?.data?.info?.datasets ?? []);
          });
    }, [selectedItem]);
  
    return (

       <>
          <ExecutionToolbar
            projectId={projectId}
            applicationId={applicationId}
            selectedDatasets={selectedDatasets}
            testcaseId={testcaseId}
            applicationType={applicationType}
          />
          <Table
            rows={datasetList}
            options={{ search: false }}
            columns={columns}
            checkboxSelection={true}
            selectionModel={selectedDatasets}
            setSelectionModel={setSelectedDatasets}
            getRowId={(row) => row.dataset_id}
          />
         
       
    
    </>
    );
  }
  