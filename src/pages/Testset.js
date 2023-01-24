// export default function Testset() {
//   return <>Testset</>;
// }
import React from 'react'
// import Testsets from '../Components/TestSet/Testset'


function Testset() {
  const [usersObject, setUsersObject] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editObject, setEditObject] = useState([]);
  const [deleteObject, setDeleteObject] = useState([]);

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
            <Tooltip title="Delete Testcase">
              <IconButton onClick={(e) => { deleteUserHandler(param.row) }}><DeleteOutlineOutlinedIcon ></DeleteOutlineOutlinedIcon></IconButton>
            </Tooltip>
          </>
        )
      },
      headerAlign: "center",
      align: 'center',
    },
  ];

  return (
    <div>Testset</div>
  )
}

export default Testset