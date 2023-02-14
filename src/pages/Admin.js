import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import { Button, IconButton, Tooltip } from "@mui/material";
import Table from "../CustomComponent/Table";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddUserPopup from "../UsersPopups/AddUserPopup";
import EditUserPopup from "../UsersPopups/EditUserPopup";
import DeleteUserPopup from "../UsersPopups/DeleteUserPopup";
import ActiveUserPopup from "../UsersPopups/ActiveUserPopup";
import DeactiveUserPopup from "../UsersPopups/DeactiveUserPopup";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

export default function Admin() {
  const { setHeader } = useHead();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openActive, setOpenActive] = useState(false);
  const [openDeactive, setOpenDeactive] = useState(false);
  const [editObject, setEditObject] = useState([]);
  const [deleteObject, setDeleteObject] = useState([]);
  const [activeObject, setActiveObject] = useState([]);
  const [deactiveObject, setDeactiveObject] = useState([]);

  const axiosPrivate = useAxios();
  const { auth } = useAuth();
  console.log(auth.info);
  const token = localStorage.getItem("token");
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
        name: "Admin",
        plusButton: true,
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

  useEffect(() => {
    axios
      .get(
        `/qfauthservice/user/listUsers?orgId=${auth.info.organization_id}&ssoId=${auth.info.ssoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setUsers(res.data.info);
      });
  }, []);

  const columns = [
    {
      headerName: "S.No",
      field: "sno",
      valueGetter: (index) => index.api.getRowIndex(index.row.id) + 1,
      flex: 1,
      headerAlign: "center",
      sortable: false,
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: "left",
      renderCell: (params) => {
        return <div>{params.row.firstName + " " + params.row.lastName}</div>;
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: "left",
    },
    {
      field: "ssoId",
      headerName: "User Id",
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: "left",
    },
    {
      field: "",
      headerName: "Actions",
      flex: 3,
      sortable: false,
      renderCell: (param) => {
        return (
          <>
            <Tooltip title="Edit">
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
            </Tooltip>
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
          </>
        );
      },
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <div>
      {/* <div
        className="recenttable"
        style={{ flot: "right", marginBottom: "10px" }}
      >
        <Button
          variant="contained"
          endIcon={<AddOutlinedIcon />}
          onClick={addUserHandler}
        >
          Add User
        </Button>
      </div> */}
      <div className="datatable" style={{ marginTop: "20px" }}>
        {open ? (
          <AddUserPopup open={open} setOpen={setOpen} users={users} />
        ) : (
          ""
        )}
        {openEdit ? (
          <EditUserPopup
            object={editObject}
            openEdit={openEdit}
            setOpenEdit={setOpenEdit}
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
          />
        ) : (
          ""
        )}
        {openActive ? (
          <ActiveUserPopup
            object={activeObject}
            openActive={openActive}
            setOpenActive={setOpenActive}
          />
        ) : (
          ""
        )}
        {openDeactive ? (
          <DeactiveUserPopup
            object={deactiveObject}
            openDeactive={openDeactive}
            setOpenDeactive={setOpenDeactive}
          />
        ) : (
          ""
        )}
        <Table
          columns={columns}
          rows={users}
          // hidefooter={false}
        />
      </div>
    </div>
  );
}
