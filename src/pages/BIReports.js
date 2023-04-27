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
import DeleteTestset from "../Components/TestSet/DeleteTestset";

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
  const [selectedProject, setSelectedProject] = useState({
    project_name: "Project",
  });
  // const [selectedTestset, setSelectedTestset] = useState({});
  const [project, setProject] = useState([]);
  const [testset, setTestset] = useState([]);
  const [bitestset, setBiTestset] = useState([]);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteObject, setDeleteObject] = useState([]);
  const [delSuccessMsg, setDelSuccessMsg] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const phaseHandler = (e) => {
    console.log(e);
    navigate("phases", {
        state: {
          param1: e,
          param2: selectedProject?.project_id,
        },
    });
  };

  const cyclesHandler = (e) => {
    navigate("cycles", {
        state: {
          param1: e,
          param2: selectedProject?.project_id,
        },
    });
  };

  const deleteUserHandler = (e) => {
    setOpenDelete(true);
    setDeleteObject(e);
  };

  const addHandler = (e) => {
    setOpenDelete(true);
    setDeleteObject(e);
  };

  function TestsetsData(bitestset, columns, phaseHandler, cyclesHandler) {
    return bitestset.map((item) => {
      console.log("first");
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
                onClick={() => phaseHandler(item.total_phases)}
                style={{ color: "#009fee", cursor: "pointer" }}
              >
                Click
              </span>
            </p>
            <p htmlFor="">
              Total Cycles {item.total_cycles}{" "}
              <span
                onClick={() => cyclesHandler(item.total_cycles)}
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
                  onClick={() => navigate("activeReports")}
                  style={{ color: "#009fee", cursor: "pointer" }}
                >
                  {param.row.activecount} Active Reports
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

  useEffect(() => {
    auth.userId &&
      axios.get(`Biservice/configbireport/${auth.userId}`).then((resp) => {
        console.log(resp?.data?.info?.bitestsets);
        const testsets = resp?.data?.info ? resp?.data?.info?.bitestsets : [];
        setBiTestset(testsets);
      });
  }, [auth.userId]);

  useEffect(() => {
    setSelectedProject(project[0]);
  }, [project]);

  useEffect(() => {
    selectedProject?.project_id &&
      axios
        .post(
          `Biservice/bireport/gettestsets?project_id=${selectedProject?.project_id}&reqst`
        )
        .then((resp) => {
          const testsets = resp?.data?.info ? resp?.data?.info : [];
          setTestset(testsets);
        });
  }, [selectedProject]);

  const { setHeader } = useHead();
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
              value={selectedProject || null}
              sx={{ width: "100%" }}
              getOptionLabel={(option) =>
                option.project_name ? option.project_name : ""
              }
              onChange={(e, value) => {
                setSelectedProject(value);
              }}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input type="text" {...params.inputProps} />
                </div>
              )}
            />
          </Grid>
          <Grid item md={2}>
            <label htmlFor="">
              Testsets <span className="importantfield">*</span>
            </label>
            <FormControl sx={{ m: 1, width: 180 }}>
              <Select
                multiple
                options={testset}
                value={selectedOptions}
                onChange={handleSelectChange}
              >
                {testset.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
      {openDelete ? (
        <DeleteTestset
          object={deleteObject}
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          // loggedInId={loggedInId}
          // getUsers={hhh}
          setDelSuccessMsg={setDelSuccessMsg}
        />
      ) : (
        ""
      )}
      <SnackbarNotify
        open={delSuccessMsg}
        close={setDelSuccessMsg}
        msg="Testset deleted successfully"
        severity="success"
      />
    </>
  );
}

export default BIReports;
