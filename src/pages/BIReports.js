import {
  Autocomplete,
  Button,
  FormControl,
  //   Checkbox,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "../api/axios";
import AccordionTemplate from "../CustomComponent/AccordionTemplate";
import Table from "../CustomComponent/Table";
import useAuth from "../hooks/useAuth";
import useHead from "../hooks/useHead";
import { getProject } from "../Services/ProjectService";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";
// import DeleteTestset from "../Components/TestSet/DeleteTestset";
import { deleteReport } from "../Services/ReportService";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const data = [];

function BIReports() {

  // const [selectedTestset, setSelectedTestset] = useState({});
  const [project, setProject] = useState([]);
  const [testset, setTestset] = useState([]);
  const [bitestset, setBiTestset] = useState([]);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteObject, setDeleteObject] = useState([]);
  const [delSuccessMsg, setDelSuccessMsg] = useState(false);
  const [addSuccessMsg, setAddSuccessMsg] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [msg, setMsg] = useState("");
  const { setHeader ,globalProject, setglobalProject} = useHead();
  const handleSelectChange = (e) => {
    console.log(e.target.value);
    setSelectedOptions(e.target.value);
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

  const deleteUserHandler = (e) => {
    setOpenDelete(true);
    console.log(e.testsetmap_id);
    setDeleteObject(e);
    deleteReport(e.testsetmap_id)
  };

  const data = [];
  const addHandler = () => {
    testset.map((ts) =>
      selectedOptions.forEach((option) => {
        if (option === ts.testset_name) {
          data.push({
            project_id: globalProject.project_id,
            module_id: ts.module_id,
            testset_id: ts.testset_id,
          });
        }
      })
    );
    axios.post(`Biservice/bireport/addtestsets`, data).then((resp) => {
      const message = resp?.data?.status ? resp?.data?.status : [];
      setMsg(message);
      setAddSuccessMsg(true);
      getTestsets();
      setTimeout(() => {
        setAddSuccessMsg(false);
      }, 3000);
    });
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
          <Stack mt={2} spacing={2} direction="column" mb={3}>
            <p htmlFor="">
              Total Phases {item.total_phases}{" "}
              <span
                onClick={() => phaseHandler(item.total_phases, item.project_id)}
                style={{ color: "#009fee", cursor: "pointer" }}
              >
                Click
              </span>
            </p>
            <p htmlFor="">
              Total Cycles {item.total_cycles}{" "}
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
            </p>
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
                      deleteUserHandler(param.row);
                    }}
                    //   sx={{ ml: 4 }}
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

  useEffect(() => {
    getProject(setProject, auth.userId);
  }, []);

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
  }, [auth.userId]);

  useEffect(() => {
    if(globalProject == null){
        setglobalProject(project[0]);
    }
  }, [project]);

  useEffect(() => {
    globalProject?.project_id &&
      axios
        .post(
          `Biservice/bireport/gettestsets?project_id=${globalProject?.project_id}&reqst`
        )
        .then((resp) => {
          const testsets = resp?.data?.info ? resp?.data?.info : [];
          setTestset(testsets);
        });
  }, [globalProject]);

 
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Manage BI Reports",
      };
    });
  }, []);

  return (
    <>
      <Grid container>
        <Grid
          item
          container
          justifyContent="flex-start"
          mb={3}
          spacing={2}
          md={12}
        >
          <Grid item md={2}>
            <label htmlFor="">
              Projects <span className="importantfield">*</span>
            </label>
            <Autocomplete
              disablePortal
              disableClearable
              id="project_id"
              options={project}
              value={globalProject || null}
              // sx={{ width: "100%" }}
              getOptionLabel={(option) =>
                option.project_name ? option.project_name : ""
              }
              onChange={(e, value) => {
                setglobalProject(value);
              }}
              renderInput={(params) => (
                <TextField {...params} size="small" fullWidth />
              )}
            />
          </Grid>
          <Grid item md={2}>
            <Stack>
              <label htmlFor="">
                Testsets <span className="importantfield">*</span>
              </label>
              <FormControl>
                <Select
                  size="small"
                  multiple
                  options={testset}
                  getOptionLabel={(option) =>
                    option.testset_name ? option.testset_name : ""
                  }
                  value={selectedOptions}
                  onChange={handleSelectChange}
                  // onChange={(key,value) => (console.log(value))}
                >
                  {testset.map((name) => (
                    <MenuItem key={name.testset_id} value={name.testset_name}>
                      {name.testset_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item md={6} mt={2.5} ml={3}>
            <Button
              variant="contained"
              type="submit"
              onClick={() => addHandler()}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {TestsetsData(bitestset, columns, phaseHandler, cyclesHandler)}
      {/* {openDelete ? (
        <DeleteTestset
          object={deleteObject}
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          // loggedInId={loggedInId}
          getTestsets={getTestsets}
          setDelSuccessMsg={setDelSuccessMsg}
        />
      ) : (
        ""
      )} */}
      <SnackbarNotify
        open={delSuccessMsg}
        close={setDelSuccessMsg}
        msg="Testset deleted successfully"
        severity="success"
      />
      <SnackbarNotify
        open={addSuccessMsg}
        close={setAddSuccessMsg}
        msg={msg == "SUCCESS" ? "Testset Added successfully" : "Durga"}
        severity="success"
      />
    </>
  );
}

export default BIReports;
