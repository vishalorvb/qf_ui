import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getTestcasesInProjects } from "../../Services/TestsetService";
import useHead from "../../hooks/useHead";
import { useNavigate } from "react-router-dom";
import ProjectnApplicationSelector from "../ProjectnApplicationSelector";
import { getSprint, getIssues } from "../../Services/TestCaseService";
import Table from "../../CustomComponent/Table";
import { useForm } from "react-hook-form";
import { axiosPrivate } from "../../api/axios";

function TestsetCreate() {
  const {
    globalProject,
    setglobalProject,
    globalApplication,
    setglobalApplication,
    setSnackbarData,
  } = useHead();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [testcaseObject, setTestcaseObject] = useState([]);
  const [selectedDatasets, setSelectedDatasets] = useState({});
  const [command, setCommand] = useState("");
  const [preSelectedElement, setPreSelectedElement] = useState([]);
  const navigate = useNavigate();
  let [jiraSprint, setJiraSprint] = useState([]);
  let [jiraIssue, setJiraIssue] = useState([]);

  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Create Testset",
      };
    });
  }, []);

  useEffect(() => {
    globalProject?.project_id &&
      getSprint(setJiraSprint, globalProject?.project_id);
  }, [globalProject]);

  useEffect(() => {
    if (globalProject?.project_id && globalApplication?.module_id) {
      getTestcasesInProjects(
        setTestcaseObject,
        globalProject?.project_id,
        globalApplication?.module_id
      );
    }
  }, [globalApplication?.module_id]);

  const submit = (data) => {
    const selectedTestcases = [];
    let testcaseObjFlag = true;
    if (globalApplication?.module_type != 19) {
      if (preSelectedElement.length <= 0) {
        testcaseObjFlag = false;
        setSnackbarData({
          status: true,
          message: "Select at least 1 testcase",
          severity: "error",
        });
      }

      preSelectedElement.sort();
      for (let index = 0; index < preSelectedElement.length; index++) {
        if (!selectedDatasets[preSelectedElement[index]]) {
          setSnackbarData({
            status: true,
            message: "Choose dataset for all selected testcases",
            severity: "error",
          });
          testcaseObjFlag = false;
          break;
        }
        selectedTestcases.push({
          testcase_id: preSelectedElement[index],
          testcase_order: index,
          testcase_dataset_id: selectedDatasets[preSelectedElement[index]],
        });
      }
    }

    const testsetData = {
      testset_name: "TS_" + data?.testsetName.trim(),
      testset_desc: "TS_" + data?.testsetDesc.trim(),
      project_id: globalProject?.project_id,
      testset_id: 0,
      module_id: globalApplication?.module_id,
      cucumber_tags: globalApplication?.module_type == 19 ? command : undefined,
      testcases_list:
        globalApplication?.module_type == 19 ? [] : selectedTestcases,
      testset_sprints: {
        sprint_id: data?.sprint,
        sprint_name: "",
        issue_id: data?.issues,
      },
    };

    testcaseObjFlag &&
      axiosPrivate
        .post(`qfservice/webtestset/createWebTestset`, testsetData)
        .then((res) => {
          setSnackbarData({
            status: true,
            message: res?.data?.message,
            severity: res?.data?.status,
          });
          navigate("/Testset/Recent");
        });
  };
  const handleDataset = (row, e) => {
    console.log(e.target.value);
    console.log(row);
    setSelectedDatasets((prevSelectedDatasets) => {
      return { ...prevSelectedDatasets, [row?.testcase_id]: e.target.value };
    });
  };

  const columns = [
    {
      field: "name",
      headerName: "Testcase",
      flex: 1,
      sortable: false,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      sortable: false,
    },
    {
      field: "select",
      headerName: "Dataset",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <FormControl fullWidth>
            <Select
              size="small"
              onChange={(e) => handleDataset(params?.row, e)}
            >
              {globalApplication?.module_type == 1
                ? params?.row?.api_datasets?.map((dataset) => {
                    return (
                      <MenuItem value={dataset?.testcase_dataset_id}>
                        {dataset?.dataset_name_in_testcase}
                      </MenuItem>
                    );
                  })
                : params?.row?.datasets?.map((dataset) => {
                    return (
                      <MenuItem value={dataset?.dataset_id}>
                        {dataset?.name}
                      </MenuItem>
                    );
                  })}
            </Select>
          </FormControl>
        );
      },
    },
  ];

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container direction="row" spacing={2}>
        <Grid item md={6}>
          <ProjectnApplicationSelector
            globalProject={globalProject}
            setglobalProject={setglobalProject}
            globalApplication={globalApplication}
            setglobalApplication={setglobalApplication}
          />
        </Grid>
        <Grid item md={3}>
          <label>Sprint</label>
          <Select
            fullWidth
            size="small"
            {...register("sprint")}
            onChange={(e) => {
              getIssues(
                setJiraIssue,
                globalApplication.project_id,
                e.target.value
              );
            }}
          >
            {jiraSprint?.map((s) => (
              <MenuItem key={s.id} value={s.sprint_name}>
                {s.sprint_name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item md={3}>
          <label>Issues</label>
          <Select fullWidth size="small" {...register("issues")}>
            {jiraIssue?.map((s) => (
              <MenuItem key={s.id} value={s.issue_id}>
                {s.key}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item md={6}>
          <Stack spacing={1}>
            <label>
              Testset Name <span className="importantfield">*</span>
            </label>
            <TextField
              size="small"
              {...register("testsetName", {
                required: "Testset name is required field",
              })}
              type="text"
              placeholder=" Testset Name"
              onChange={e=>{
              }}
              error={errors.testsetName}
              helperText={errors.testsetName && errors.testsetName.message}
            />
          </Stack>
        </Grid>
        <Grid item md={6}>
          <Stack spacing={1}>
            <label>
              Description <span className="importantfield">*</span>
            </label>
            <TextField
              size="small"
              {...register("testsetDesc", {
                required: "Please enter the description",
              })}
              onChange={e=>{
              }}
              type="text"
              placeholder="Testset Description"
              error={errors.testsetDesc}
              helperText={errors.testsetDesc && errors.testsetDesc.message}
            />
          </Stack>
        </Grid>
        {globalApplication?.module_type == 19 ? (
          <Grid item md={12}>
            <Stack spacing={1}>
              <label>
                Command <span className="importantfield">*</span>
              </label>
              <TextareaAutosize
                {...register("command", {
                  required:
                    globalApplication?.module_id == 19 &&
                    "Please enter the command",
                })}
                type="text"
                style={{ height: 250 }}
                placeholder="command"
                onChange={(e) => setCommand(e.target.value)}
                error={errors.command}
                helperText={errors.command && errors.command.message}
              />
            </Stack>
          </Grid>
        ) : (
          <Grid item md={12}>
            <Table
              searchPlaceholder="Search Elements"
              rows={testcaseObject}
              columns={columns}
              getRowId={(row) => row.testcase_id}
              checkboxSelection={true}
              selectionModel={preSelectedElement}
              setSelectionModel={setPreSelectedElement}
              hideheaderCheckbox={true}
              rowHeight={90}
              hideSearch={true}
            />
          </Grid>
        )}
      </Grid>
      <Stack mt={2} spacing={2} direction="row-reverse">
        <Button variant="contained" type="submit">
          Save & Continue
        </Button>
        <Button
          sx={{ color: "grey", textDecoration: "underline" }}
          onClick={() => navigate("/Testset/Recent")}
        >
          Cancel
        </Button>
      </Stack>
    </form>
  );
}

export default TestsetCreate;
