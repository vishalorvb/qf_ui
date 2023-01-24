import { Autocomplete, Button, Grid, IconButton, Paper, Tooltip } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import Table from "../../CustomComponent/Table";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {useLocation} from 'react-router-dom';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function AddTestcaseToTestset() {

  const [usersObject, setUsersObject] = useState([]);
  const [projectsObject, setProjectsObject] = useState([]);
  const [tbData, setTbData] = useState([]);
  const location = useLocation();

  const columns = [
    { headerName: "S.No", field: 'sno', valueGetter: (index) => index.api.getRowIndex(index.row.id) + 1, flex: 1, headerAlign: "center", sortable: false, align: 'center' },
    {
      field: 'testcases',
      headerName: 'Testcase Name',
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: 'left',
      // renderCell: (params) => {
      //   return (
      //     <div>
      //       {params.row.testcase_name}
      //     </div>
      //   )
      // }
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: 'left',
      renderCell: (params) => {
        return (
          <div>
            {params.row.created_at}
          </div>
        )
      }
    },
    {
      field: 'dataset',
      headerName: 'Dataset ',
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: 'left'
    },
    {
      field: "",
      headerName: "Actions",
      flex: 3,
      sortable: false,
      renderCell: (param) => {
        return (
          <><Tooltip title="Delete">
          <IconButton
            onClick={(e) => {
              deleteUserHandler(param.row);
            }}
          >
            <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
          </IconButton>
        </Tooltip>
        </>
        );
      },
      headerAlign: "center",
      align: "center",
    }
  ];

  const deleteUserHandler = (e) => {
    // setOpenDelete(true);
    // setDeleteObject(e);
  };

  const submit = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <Paper
        elevation={1}
        sx={{ padding: "2px", marginTop: "10px", marginBottom: "10px" }}
      >
        <Container
          component={"div"}
          maxWidth={false}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "10px",
            justifyContent: "flex-start",
          }}
        >
          <Grid
            container
            item
            xs={12}
            sm={6}
            md={4}
            xl={4}
            sx={{ marginBottom: "10px" }}
          >
            <Grid item xs={6} sm={6} md={3.5} xl={4}>
              <label>
                Test Cases <span className="importantfield">*</span>:
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={8} xl={7}>
              <Autocomplete
                size="small"
                options={usersObject}
                getOptionLabel={(option) => option.fname + " " + option.lname}
                onChange={(e, value) => {
                  // Uid.current = value.id;
                  // setUserId(value.id)
                }}
                noOptionsText={"User not found"}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      name="userAutocomplete"
                      {...params.inputProps}
                      placeholder="Please Select"
                    />
                  </div>
                )}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            md={4}
            xl={4}
            sx={{ marginBottom: "10px" }}
          >
            <Grid item xs={6} sm={6} md={3.5} xl={4}>
              <label>
                Datasets <span className="importantfield">*</span>:
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={8} xl={7}>
              <Autocomplete
                size="small"
                options={projectsObject}
                getOptionLabel={(option) => option.project_name}
                onChange={(e, value) => {
                  // Project_Id.current = value.project_id;
                }}
                noOptionsText={"Projects not found"}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      name="projectAutocomplete"
                      {...params.inputProps}
                      placeholder="Please Select"
                    />
                  </div>
                )}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            onClick={submit}
            startIcon={<AddOutlinedIcon />}
            sx={{
              marginLeft: "45%",
              marginRight: "auto",
              marginBottom: "10px",
              marginTop: "25px",
            }}
          >
            Add
          </Button>
        </Container>
      </Paper>
      <div className="datatable" style={{ marginTop: "15px" }}>
        <Table
          columns={columns}
          rows={tbData}
        //   hidefooter={false}
        />
      </div>
    </div>
  );
}
