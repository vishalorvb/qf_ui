import { Alert, Button, IconButton, Snackbar, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Table from '../../Table';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AddUserPopup from './AddUserPopup';
import EditUserPopup from './EditUserPopup';
import DeleteUserPopup from './DeleteUserPopup';
import ActiveUserPopup from './ActiveUserPopup';
import DeactiveUserPopup from './DeactiveUserPopup';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import PersonOffTwoToneIcon from '@mui/icons-material/PersonOffTwoTone';
import axios from 'axios';
import { baseUrl } from '../../../Environment';
import SnackbarNotify from '../../SnackbarNotify';


function Users() {

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openActive, setOpenActive] = useState(false);
  const [openDeactive, setOpenDeactive] = useState(false);
  const [editObject, setEditObject] = useState([]);
  const [deleteObject, setDeleteObject] = useState([]);
  const [activeObject, setActiveObject] = useState([]);
  const [deactiveObject, setDeactiveObject] = useState([]);
  const [users, setUsers] = useState([]);
  const [addSuccessMsg, setAddSuccessMsg] = useState(false);
  const [addErrorMsg, setAddErrorMsg] = useState(false);
  const [editSuccessMsg, setEditSuccessMsg] = useState(false);
  const [delSuccessMsg, setDelSuccessMsg] = useState(false);
  const [actSuccessMsg, setActSuccessMsg] = useState(false);
  const [deactSuccessMsg, setDeactSuccessMsg] = useState(false);
  const [validationMsg, setValidationMsg] = useState(false);

  const editUserHandler = (e) => {
    setOpenEdit(true);
    setEditObject(e);
  }

  const deleteUserHandler = (e) => {
    setOpenDelete(true);
    setDeleteObject(e);
  }

  const activateUserHandler = (e) => {
    setOpenActive(true);
    setActiveObject(e);
  }

  const deactivateUserHandler = (e) => {
    setOpenDeactive(true);
    setDeactiveObject(e);
  }

  const addUserHandler = () => {
    setOpen(true);
  }

  const getUserDetails = () => {
    axios
      .get(baseUrl+`/OrganisationMS/Users/getAllUsers`)
      .then((Response) => {
        var response=Response.data;
        setUsers(response);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const columns = [
    { headerName: "S.No",field:'sno' ,valueGetter: (index) => index.api.getRowIndex(index.row.id) + 1, flex: 1, headerAlign: "center", sortable: false, align: 'center' },
    {
      field: 'name',
      headerName: 'Name',
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: 'left',
      renderCell: (params) => {
        return (
          <div>
            {params.row.fname +" "+ params.row.lname}
          </div>
        )
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: 'left'

    },
    {
      field: 'sid',
      headerName: 'User Id',
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
            <Tooltip title="Edit">
              <IconButton onClick={(e) => { editUserHandler(param.row) }}><EditIcon ></EditIcon></IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={(e) => { deleteUserHandler(param.row) }}><DeleteIcon ></DeleteIcon></IconButton>
            </Tooltip>
            {param.row.status === 0 ?
              <Tooltip title="Inactive">
                <IconButton onClick={(e) => { activateUserHandler(param.row) }}><PersonOffTwoToneIcon ></PersonOffTwoToneIcon></IconButton>
              </Tooltip> :
              <Tooltip title="Active">
                <IconButton onClick={(e) => { deactivateUserHandler(param.row) }}><PersonOutlineTwoToneIcon ></PersonOutlineTwoToneIcon></IconButton>
              </Tooltip>
            }
          </>
        )
      },
      headerAlign: "center",
      align: 'center',
    },
  ];

  return (
    <div>
      <div className="recenttable" style={{ flot: "right", marginBottom:"10px" }}>
        <Button variant="contained" endIcon={<AddIcon />} onClick={addUserHandler}>Add User</Button>
      </div>
      <SnackbarNotify open={addSuccessMsg} close={setAddSuccessMsg} msg="User added successfully" severity="success"/>
      <SnackbarNotify open={editSuccessMsg} close={setEditSuccessMsg} msg="Changes are updated" severity="success"/>
      <SnackbarNotify open={delSuccessMsg} close={setDelSuccessMsg} msg="User deleted successfully" severity="success"/>
      <SnackbarNotify open={actSuccessMsg} close={setActSuccessMsg} msg="User is active" severity="success"/>
      <SnackbarNotify open={deactSuccessMsg} close={setDeactSuccessMsg} msg="User is inactive" severity="success"/>
      <SnackbarNotify open={addErrorMsg} close={setAddErrorMsg} msg="User is already exist with this id, Please select another id" severity="error"/>
      <SnackbarNotify open={validationMsg} close={setValidationMsg} msg="Fill all the required fields" severity="error"/>
      <div className="datatable" style={{ marginTop: "20px" }}>
        {open ? <AddUserPopup open={open} setOpen={setOpen} getUserDetails={getUserDetails} setAddSuccessMsg={setAddSuccessMsg} users={users} addErrorMsg={addErrorMsg} setAddErrorMsg={setAddErrorMsg} setValidationMsg={setValidationMsg} /> : ""}
        {openEdit ? <EditUserPopup object={editObject} openEdit={openEdit} setOpenEdit={setOpenEdit} getUserDetails={getUserDetails} setEditSuccessMsg={setEditSuccessMsg} setValidationMsg={setValidationMsg} /> : ""}
        {openDelete ? <DeleteUserPopup object={deleteObject} openDelete={openDelete} setOpenDelete={setOpenDelete} getUserDetails={getUserDetails} setDelSuccessMsg={setDelSuccessMsg}/> : ""}
        {openActive ? <ActiveUserPopup object={activeObject} openActive={openActive} setOpenActive={setOpenActive} getUserDetails={getUserDetails} setActSuccessMsg={setActSuccessMsg}/> : ""}
        {openDeactive ? <DeactiveUserPopup object={deactiveObject} openDeactive={openDeactive} setOpenDeactive={setOpenDeactive} getUserDetails={getUserDetails} setDeactSuccessMsg={setDeactSuccessMsg}/> : ""}
        <Table
          columns={columns}
          rows={users}
          hidefooter={false}
        />
      </div>
    </div>
  )
}

export default Users