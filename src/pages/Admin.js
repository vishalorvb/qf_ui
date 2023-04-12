import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import { Button, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import Table from "../CustomComponent/Table";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddUserPopup from "../Components/UsersPopups/AddUserPopup";
import EditUserPopup from "../Components/UsersPopups/EditUserPopup";
import DeleteUserPopup from "../Components/UsersPopups/DeleteUserPopup";
import ActiveUserPopup from "../Components/UsersPopups/ActiveUserPopup";
import DeactiveUserPopup from "../Components/UsersPopups/DeactiveUserPopup";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const { setHeader } = useHead();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openActive, setOpenActive] = useState(false);
  const [openDeactive, setOpenDeactive] = useState(false);
  const [editObject, setEditObject] = useState([]);
  const [deleteObject, setDeleteObject] = useState([]);
  const [activeObject, setActiveObject] = useState([]);
  const [deactiveObject, setDeactiveObject] = useState([]);
  const [addSuccessMsg, setAddSuccessMsg] = useState(false);
  const [addErrorMsg, setAddErrorMsg] = useState(false);
  const [editSuccessMsg, setEditSuccessMsg] = useState(false);
  const [delSuccessMsg, setDelSuccessMsg] = useState(false);
  const [actSuccessMsg, setActSuccessMsg] = useState(false);
  const [deactSuccessMsg, setDeactSuccessMsg] = useState(false);
  const [validationMsg, setValidationMsg] = useState(false);

  const axiosPrivate = useAxios();
  const { auth } = useAuth();
  console.log(auth.info);
  const loggedInId = auth.info.id;

  const addUserHandler = () => {
    setOpen(true);
  };

  const editUserHandler = (e) => {
    setOpenEdit(true);
    setEditObject(e);
  };

  const deleteUserHandler = (e) => {
    setOpenDelete(true);
    setDeleteObject(e);
  };

  const activateUserHandler = (e) => {
    setOpenActive(true);
    setActiveObject(e);
  };

  const deactivateUserHandler = (e) => {
    setOpenDeactive(true);
    setDeactiveObject(e);
  };

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Users",
        plusButton: false,
        buttonName: "Add User",
        plusCallback: addUserHandler,
      };
    });
    return () =>
      setHeader((ps) => {
        return {
          ...ps,
          name: "",
          plusButton: false,
          plusCallback: () => console.log("null"),
        };
      });
  }, []);

  const getUsers = () => {
    axiosPrivate
      .get(
        `/qfauthservice/user/listofAllUsers?orgId=${auth.info.organization_id}&ssoId=${auth.info.ssoId}`
      )
      .then((res) => {
        setUsers(res.data.info);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      headerName: "S.No",
      field: "sno",
      valueGetter: (index) => index.api.getRowIndex(index.row.id) + 1,
      flex: 1,
      headerAlign: "left",
      sortable: false,
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 3,
      headerAlign: "left",
      sortable: false,
      align: "left",
      renderCell: (params) => {
        return <div>{params.row.firstName + " " + params.row.lastName}</div>;
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 4,
      headerAlign: "left",
      sortable: false,
      align: "left",
    },
    {
      field: "ssoId",
      headerName: "User Id",
      flex: 3,
      headerAlign: "left",
      sortable: false,
      align: "left",
    },
    {
      field: "",
      headerName: "Actions",
      flex: 2,
      sortable: false,
      renderCell: (param) => {
        return (
          <>
            {/* <Tooltip title="Edit">
              <IconButton
                onClick={(e) => {
                  editUserHandler(param.row);
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={(e) => {
                  deleteUserHandler(param.row);
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Tooltip> */}
            {param.row.user_status === 0 ? (
              <Tooltip title="Inactive">
                <IconButton
                  onClick={(e) => {
                    activateUserHandler(param.row);
                  }}
                >
                  <PersonOffOutlinedIcon></PersonOffOutlinedIcon>
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Active">
                <IconButton
                  onClick={(e) => {
                    deactivateUserHandler(param.row);
                  }}
                >
                  <PersonOutlineOutlinedIcon></PersonOutlineOutlinedIcon>
                </IconButton>
              </Tooltip>
            )}
           { AdminActionCell(param,deleteUserHandler)}
          </>
        );
      },
      headerAlign: "left",
      align: "left",
    },
  ];

  return (
    <div>
      <div className="datatable" style={{ marginTop: "20px" }}>
        {open ? (
          <AddUserPopup
            open={open}
            setOpen={setOpen}
            users={users}
            getUsers={getUsers}
            setAddSuccessMsg={setAddSuccessMsg}
            addErrorMsg={addErrorMsg}
            setAddErrorMsg={setAddErrorMsg}
            setValidationMsg={setValidationMsg}
          />
        ) : (
          ""
        )}
        {openEdit ? (
          <EditUserPopup
            object={editObject}
            openEdit={openEdit}
            setOpenEdit={setOpenEdit}
            getUsers={getUsers}
            setEditSuccessMsg={setEditSuccessMsg}
            setValidationMsg={setValidationMsg}
          />
        ) : (
          ""
        )}
        {openDelete ? (
          <DeleteUserPopup
            object={deleteObject}
            openDelete={openDelete}
            setOpenDelete={setOpenDelete}
            loggedInId={loggedInId}
            getUsers={getUsers}
            setDelSuccessMsg={setDelSuccessMsg}
          />
        ) : (
          ""
        )}
        {openActive ? (
          <ActiveUserPopup
            object={activeObject}
            openActive={openActive}
            setOpenActive={setOpenActive}
            getUsers={getUsers}
            setActSuccessMsg={setActSuccessMsg}
          />
        ) : (
          ""
        )}
        {openDeactive ? (
          <DeactiveUserPopup
            object={deactiveObject}
            openDeactive={openDeactive}
            setOpenDeactive={setOpenDeactive}
            getUsers={getUsers}
            setDeactSuccessMsg={setDeactSuccessMsg}
          />
        ) : (
          ""
        )}
        <SnackbarNotify
          open={addSuccessMsg}
          close={setAddSuccessMsg}
          msg="User added successfully"
          severity="success"
        />
        <SnackbarNotify
          open={editSuccessMsg}
          close={setEditSuccessMsg}
          msg="Changes are updated"
          severity="success"
        />
        <SnackbarNotify
          open={delSuccessMsg}
          close={setDelSuccessMsg}
          msg="User deleted successfully"
          severity="success"
        />
        <SnackbarNotify
          open={actSuccessMsg}
          close={setActSuccessMsg}
          msg="User is active"
          severity="success"
        />
        <SnackbarNotify
          open={deactSuccessMsg}
          close={setDeactSuccessMsg}
          msg="User is inactive"
          severity="success"
        />
        <SnackbarNotify
          open={addErrorMsg}
          close={setAddErrorMsg}
          msg="User is already exist with this id, Please select another id"
          severity="error"
        />
        <SnackbarNotify
          open={validationMsg}
          close={setValidationMsg}
          msg="Fill all the required fields"
          severity="error"
        />
        <Table
          columns={columns}
          rows={users}
          // hidefooter={false}
        />
      </div>
    </div>
  );
}

const AdminActionCell = (
  param,
  deleteUserHandler
) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="descColumn">
      <Typography variant="p">{}</Typography>
      <MoreVertIcon
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="descOption"
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() =>
            navigate("editUser", {
              state: {
                param1: param?.row,
              },
            })
          }
        >
          <EditOutlinedIcon sx={{ color: "blue", mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => deleteUserHandler(param.row)}>
          <DeleteOutlineIcon sx={{ color: "red", mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};