import {
  Button,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import {
  CheckboxButtonGroup,
  MultiSelectElement,
  SelectElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import FeatureMenu from "./FeatureMenu";
import useAuth from "../../hooks/useAuth";
import ExecutionProcessBox from "./ExecutionProcessBox";
import Table from "../../CustomComponent/Table";
import ExecutionToolbar from "../TestCases/ExecutionToolbar";
import DatasetSelectAndExecute from "./DatasetSelectAndExecute";

export default function Testcase({ selectedProject, selectedApplication }) {
  const { auth } = useAuth();
  const [testcases, setTestcases] = useState([]);
  const [selectedTestcase, setSelectedTestcase] = useState(0);
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
      field: "name",
      headerName: "Test case name",
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
      headerName: "Execute",
      field: "execute",
      renderCell: (param) => {
        return (
          <IconButton
            onClick={() => {
              setSelectedTestcase(param?.row?.testcase_id);
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
    selectedApplication?.module_id &&
      axios
        .get(
          `/qfservice/webtestcase/getWebTestcasesInfoByApplicationId?application_id=${selectedApplication?.module_id}&project_id=${selectedProject?.project_id}`
        )
        .then((resp) => {
          const testcases = resp?.data?.info ? resp?.data?.info : [];
          setTestcases(testcases);
        });
  }, [selectedApplication]);

  return (
    <>
      <ExecutionProcessBox
        open={executionStart}
        close={setExectutionStart}
        executionspin={executionSpin}
        executionResult={executionResult}
      />
      <DatasetSelectAndExecute
        open={datasetShow}
        close={setDatasetShow}
        testcaseId={selectedTestcase}
        projectId={selectedProject?.project_id}
        applicationId={selectedApplication?.module_id}
      />

      <Table
        rows={testcases}
        columns={columns}
        hidefooter={true}
        getRowId={(row) => row.testcase_id}
      ></Table>
    </>
  );
}
