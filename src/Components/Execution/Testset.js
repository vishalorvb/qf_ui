import {IconButton} from "@mui/material";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import {useForm} from "react-hook-form-mui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import ExecutionProcessBox from "./ExecutionProcessBox";
import Table from "../../CustomComponent/Table";
import DatasetSelectAndExecute from "./DatasetSelectAndExecute";
import TestcaseSelectAndExecute from "./TestcaseSelectAndExecute";

function Testset( selectedProject, selectedApplication ) {
  console.log(selectedProject);
  console.log(selectedProject.selectedProject);
  console.log(selectedProject.selectedApplication);
  const { auth } = useAuth();
  const [testsets, setTestsets] = useState([]);
  const [selectedTestset, setSelectedTestset] = useState(0);
  const [datasetShow, setDatasetShow] = useState(false);
  const [executionStart, setExectutionStart] = useState(false);
  const [executionSpin, setexecutionSpin] = useState(false);
  const [executionResult, setExecutionResult] = useState([]);

  const schema = yup.object().shape({
    executionName: yup.string().required(),
    description: yup.string().required(),
    buildenvName: yup.string().required(),
    executionLoc: yup.string().required(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const columns = [
    {
      field: "testset_name",
      headerName: "Test set name",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "testset_desc",
      headerName: "Description",
      flex: 3,
      sortable: false,
      align: "left",
    },

    {
      headerName: "Execute",
      field: "execute",
      renderCell: (param) => {
        return (
          <IconButton
            onClick={() => {
              setSelectedTestset(param?.row?.testset_id);
              setDatasetShow(true);
            }}
          >
            <PlayArrowOutlinedIcon />
          </IconButton>
        );
      },
      flex: 3,
      headerAlign: "left",
      sortable: false,
      align: "left",
    },
  ];

  useEffect(() => {
    selectedProject.selectedApplication?.module_id &&
      axios
        .get(
          `qfservice/webtestset/getWebTestsetInfoByProjectIdByApplicationId?project_id=${selectedProject.selectedProject?.project_id}&module_id=${selectedProject.selectedApplication?.module_id}`
        )
        .then((resp) => {
          console.log(resp?.data?.info);
          const testsets = resp?.data?.info ? resp?.data?.info : [];
          setTestsets(testsets);
        });
  }, [selectedProject.selectedApplication]);

  return (
    <>
      <ExecutionProcessBox
        open={executionStart}
        close={setExectutionStart}
        executionspin={executionSpin}
        executionResult={executionResult}
      />
      <TestcaseSelectAndExecute
        open={datasetShow}
        close={setDatasetShow}
        testsetId={selectedTestset}
        projectId={selectedProject.selectedProject?.project_id}
        applicationId={selectedProject.selectedApplication?.module_id}
      />

      <Table
        rows={testsets}
        columns={columns}
        hidefooter={true}
        getRowId={(row) => row.testset_id}
      ></Table>
    </>
  )
}

export default Testset