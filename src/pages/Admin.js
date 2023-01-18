import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import { Button, IconButton, Tooltip } from "@mui/material";
import Table from "../CustomComponent/Table";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AddUserPopup from '../UsersPopups/AddUserPopup';
import EditUserPopup from '../UsersPopups/EditUserPopup';
import DeleteUserPopup from '../UsersPopups/DeleteUserPopup';
// import ActiveUserPopup from './ActiveUserPopup';
// import DeactiveUserPopup from './DeactiveUserPopup';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import PersonOffTwoToneIcon from '@mui/icons-material/PersonOffTwoTone';
// import axios from 'axios';

export default function Admin() {
  const { setHeader } = useHead();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openActive, setOpenActive] = useState(false);
  const [openDeactive, setOpenDeactive] = useState(false);
  const [editObject, setEditObject] = useState([]);
  const [deleteObject, setDeleteObject] = useState([]);
  const [activeObject, setActiveObject] = useState([]);
  const [deactiveObject, setDeactiveObject] = useState([]);

  const addUserHandler = () => {
    setOpen(true);
  }

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

  useEffect(() => {
    setHeader((ps) => {
      return { ...ps, name: "Admin" };
    });
  }, []);

  const users = [
    { "id":"100", "fname": "Durgarao", "lname": "Akula", "email": "durgarao@gmail.com", "sid": 65 },
    { "id":"101", "fname": "Abhishek", "lname": "ch", "email": "abhishek@gmail.com", "sid": 72 },
    { "id":"102", "fname": "Vishal", "lname": "kumar", "email": "vishal@gmail.com", "sid": 79 },
  ];

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
      <div className="recenttable" style={{ flot: "right", marginBottom: "10px" }}>
        <Button variant="contained" endIcon={<AddIcon />} onClick={addUserHandler}>Add User</Button>
      </div>
      <div className="datatable" style={{ marginTop: "20px" }}>
        {open ? <AddUserPopup open={open} setOpen={setOpen}  users={users}  /> : ""}
        {openEdit ? <EditUserPopup object={editObject} openEdit={openEdit} setOpenEdit={setOpenEdit}  /> : ""}
        {openDelete ? <DeleteUserPopup object={deleteObject} openDelete={openDelete} setOpenDelete={setOpenDelete} /> : ""}
        {/* {openActive ? <ActiveUserPopup object={activeObject} openActive={openActive} setOpenActive={setOpenActive} getUserDetails={getUserDetails} setActSuccessMsg={setActSuccessMsg} /> : ""}
        {openDeactive ? <DeactiveUserPopup object={deactiveObject} openDeactive={openDeactive} setOpenDeactive={setOpenDeactive} getUserDetails={getUserDetails} setDeactSuccessMsg={setDeactSuccessMsg} /> : ""}  */}
        <Table
          columns={columns}
          rows={users}
          // hidefooter={false}
        />
      </div>
    </div>
  )
}
