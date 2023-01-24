import { Autocomplete, Button, Grid, IconButton, Paper, Tooltip } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react'
import Table from '../CustomComponent/Table';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import {Link, useNavigate, Outlet} from 'react-router-dom';

function Testset() {
  const [usersObject, setUsersObject] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editObject, setEditObject] = useState([]);
  const [deleteObject, setDeleteObject] = useState([]);
  const navigate = useNavigate();

  const addUserHandler = (e) => {
    // setOpen(true);
    navigate('AddTestcaseToTestset',{state:e});
  }

  const editUserHandler = (e) => {
    // setOpenEdit(true);
    // setEditObject(e);
    navigate('AddTestcaseToTestset',{state:e});
  }

  const deleteUserHandler = (e) => {
    setOpenDelete(true);
    setDeleteObject(e);
  }

  const onChangeHandler = () => {
    setOpen1(true);
  }

  const users = [
    { "id":"100", "tsname": "Durgarao", "tsid": 65 },
    { "id":"101", "tsname": "Abhishek", "tsid": 72 },
    { "id":"102", "tsname": "Vishal", "tsid": 79 },
  ];

  const columns = [
    { headerName: "S.No",field:'sno' ,valueGetter: (index) => index.api.getRowIndex(index.row.id) + 1, flex: 1, headerAlign: "center", sortable: false, align: 'center' },
    {
      field: 'tsid',
      headerName: 'Testset Id',
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: 'left',
      // renderCell: (params) => {
      //   return (
      //     <div>
      //       {params.row.fname +" "+ params.row.lname}
      //     </div>
      //   )
      // }
    },
    {
      field: 'tsname',
      headerName: 'Testset Name',
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: 'left'

    },
    {
      field: '',
      headerName: 'Actions',
      flex: 3,
      sortable: false,
      renderCell: (param) => {
        return (
          <>
            <Tooltip title="Add Testcase">
              <IconButton onClick={(e) => { addUserHandler(param.row) }}><AddOutlinedIcon ></AddOutlinedIcon></IconButton>
            </Tooltip>
            <Tooltip title="Edit Testcase">
              <IconButton onClick={(e) => { editUserHandler(param.row) }}><EditOutlinedIcon ></EditOutlinedIcon></IconButton>
            </Tooltip>
            <Tooltip title="Execute">
              <IconButton onClick={(e) => { deleteUserHandler(param.row) }}><PlayCircleOutlinedIcon ></PlayCircleOutlinedIcon></IconButton>
            </Tooltip>
          </>
        )
      },
      headerAlign: "center",
      align: 'center',
    },
  ];

  return (
    <div>
      <Paper elevation={1} sx={{ padding: '2px', marginTop: "10px", marginBottom: "10px" }}>
        <Container component={'div'} maxWidth={false} sx={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', marginTop: "10px", justifyContent: 'flex-start' }} >
          <Grid container item xs={12} sm={6} md={4} xl={4} sx={{ marginBottom: '10px' }} >
            <Grid item xs={6} sm={6} md={3.5} xl={4}><label>Project <span className="importantfield" >*</span>:</label></Grid>
            <Grid item xs={6} sm={6} md={8} xl={7}>
              <Autocomplete
                size="small"
                options={usersObject}
                getOptionLabel={(option) => (option.fname) + " " + (option.lname)}
                onChange={(e, value) => {
                  // Uid.current = value.id;
                  // setUserId(value.id) 
                  onChangeHandler();
                }}
                noOptionsText={'User not found'}
                renderInput={(params) =>
                  <div ref={params.InputProps.ref}>
                    <input type="text" name="userAutocomplete" {...params.inputProps}
                      placeholder="Please Select" />
                  </div>
                }
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>
      {/* {open1 ? */}
      <Paper>
        <div className="recenttable" style={{ flot: "right", marginBottom: "10px" }}>
          <Button style={{ flot: "right" }} variant="contained" endIcon={<AddOutlinedIcon />} onClick={addUserHandler}>Create Testset</Button>
        </div>
        <div className="datatable" style={{ marginTop: "20px" }}>
          <Table
            columns={columns}
            rows={users}
          // hidefooter={false}
          />
        </div>
      </Paper> 
      {/* : ""} */}
    </div>
  )
}

export default Testset