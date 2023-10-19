import {
  Button,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AccordionTemplate from "../CustomComponent/AccordionTemplate";
import Table from "../CustomComponent/Table";
import useAuth from "../hooks/useAuth";
import useHead from "../hooks/useHead";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import DeleteTestset from "../Components/TestSet/DeleteTestset";
import { deleteReport } from "../Services/ReportService";
import LiveAutocomplete from "../CustomComponent/LiveAutocomplete";
import ProjectnApplicationSelector from "../Components/ProjectnApplicationSelector";
import ConfirmPop from "../CustomComponent/ConfirmPop";

function BIReports() {
  const [bitestset, setBiTestset] = useState([]);
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const { auth } = useAuth();
  const {
    setHeader,
    globalProject,
    setglobalProject,
    setSnackbarData,
    globalApplication,
    setglobalApplication,
  } = useHead();

  const handleSelectChange = (event, value) => {
    console.log(value);
    setSelectedOptions(value);
  };

  const phaseHandler = (phase, projectId) => {
    navigate("phases", {
      state: {
        param1: phase,
        param2: projectId,
      },
    });
  };

  const cyclesHandler = (cycle, projectId, testsets) => {
    navigate("cycles", {
      state: {
        param1: cycle,
        param2: projectId,
        param3: testsets,
      },
    });
  };

  const handleDelete = (e) => {
    deleteReport(openConfirmDelete.testsetmap_id, getTestsets);
    setOpenConfirmDelete(false);
  };

  const data = [];
  const addHandler = () => {
    if (selectedOptions.length > 0) {
      selectedOptions.forEach((option) => {
        console.log(option.module_id);
        console.log(option.module_id);
        data.push({
          project_id: globalProject.project_id,
          module_id: option.module_id,
          testset_id: option.testset_id,
        });
      });
      axios.post(`Biservice/bireport/addtestsets`, data).then((resp) => {
        getTestsets();
        setSnackbarData({
          status: true,
          message: resp?.data?.message,
          severity: resp?.data?.status,
        });
      });
    } else {
      setSnackbarData({
        status: true,
        message: "Select at least one Testset",
        severity: "error",
      });
    }
  };

  function TestsetsData(bitestset, columns, phaseHandler, cyclesHandler) {
    return bitestset.map((item) => {
      return (
        <AccordionTemplate name={item.project_name} defaultState={true}>
          <Table
            hideSearch={true}
            columns={columns}
            rows={item.testsets}
            getRowId={(row) => row.testsetmap_id}
          />
          <Stack mt={1} spacing={1} direction="column" mb={3}>
            <Typography>
              Total Phases {item.total_phases} :
              <span
                onClick={() => phaseHandler(item.total_phases, item.project_id)}
                style={{ color: "#009fee", cursor: "pointer" }}
              >
                Click
              </span>
            </Typography>
            <Typography>
              Total Cycles {item.total_cycles} :
              <span
                onClick={() =>
                  cyclesHandler(
                    item.total_cycles,
                    item.project_id,
                    item.testsets
                  )
                }
                style={{ color: "#009fee", cursor: "pointer" }}
              >
                Click
              </span>
            </Typography>
          </Stack>
        </AccordionTemplate>
      );
    });
  }

  const columns = [
    {
      field: "testset_name",
      headerName: "Testset Name",
      flex: 4,
      headerAlign: "left",
      sortable: false,
      align: "left",
    },
    {
      field: "activecount",
      headerName: "",
      flex: 2,
      headerAlign: "left",
      sortable: false,
      align: "left",
      renderCell: (param) => {
        return (
          <>
            <Grid container justifyContent={"flex-end"} spacing={3}>
              <Grid item mt={1.5}>
                <Typography
                  onClick={() =>
                    navigate("activeReports", {
                      state: {
                        param1: param.row.testsetmap_id,
                        param2: globalProject?.project_id,
                      },
                    })
                  }
                  style={{ color: "#009fee", cursor: "pointer" }}
                >
                  {param.row.count} Active Reports
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title="Delete">
                  <IconButton
                    onClick={(e) => {
                      setOpenConfirmDelete({
                        testsetmap_id: param?.row?.testsetmap_id,
                        status: true,
                      });
                    }}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </>
        );
      },
    },
  ];

  const getTestsets = () => {
    auth.userId &&
      axios.get(`Biservice/configbireport/${auth.userId}`).then((resp) => {
        console.log(resp?.data?.info?.bitestsets);
        const testsets = resp?.data?.info ? resp?.data?.info?.bitestsets : [];
        setBiTestset(testsets);
      });
  };

  useEffect(() => {
    getTestsets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.userId]);

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Manage BI Reports",
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        spacing={2}
      >
        <Grid item md={4}>
          <ProjectnApplicationSelector
            globalProject={globalProject}
            setglobalProject={setglobalProject}
            globalApplication={globalApplication}
            setglobalApplication={setglobalApplication}
            isApplication={false}
          />
        </Grid>
        <Grid item md={2}>
          <label>
            Testsets <span className="importantfield">*</span>
          </label>
          <LiveAutocomplete
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            onChange={handleSelectChange}
          />
        </Grid>
        <Grid item md={1} mb={0.5}>
          <Button
            variant="contained"
            type="submit"
            onClick={() => addHandler()}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      {TestsetsData(bitestset, columns, phaseHandler, cyclesHandler)}
      <ConfirmPop
        open={openConfirmDelete?.status}
        handleClose={() =>
          setOpenConfirmDelete({ testsetmap_id: "", status: false })
        }
        heading={"Delete Testset"}
        message={"Are you sure you want to delete this Testset?"}
        onConfirm={handleDelete}
      ></ConfirmPop>
    </>
  );
}

export default BIReports;
