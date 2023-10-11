import React, { useEffect, useRef, useState } from "react";
// import axios from 'axios';
import {
  Autocomplete,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import {
  validateForm,
  resetClassName,
} from "../../CustomComponent/FormValidation";
import { userservice } from "../../Environment";
function AddUserPopup(props) {
  const {
    open,
    setOpen,
    users,
    getUsers,
    setAddSuccessMsg,
    addErrorMsg,
    setAddErrorMsg,
    setValidationMsg,
  } = props;

  const [fName, setFName] = useState("");
  const first_name = useRef();
  const [lName, setLName] = useState("");
  const last_name = useRef();
  const [email, setEmail] = useState("");
  const Email = useRef();
  const [password, setPassword] = useState("");
  const Password = useRef();
  const [ssoId, setSsoId] = useState("");
  const sso_id = useRef();
  const [roleId, setRoleId] = useState("");
  const role_id = useRef();
  const [roleObject, setRoleObject] = useState([]);
  const { auth } = useAuth();
  const loggedInId = auth.info.id;
  // const token = localStorage.getItem("token");
  const axiosPrivate = useAxios();

  let requiredsFields = [Email, sso_id, Password];
  let requiredOnlyAlphabets = [first_name, last_name];
  let autoComplete = ["roleAutocomplete"];

  const handleClose = () => {
    setOpen(false);
  };

  const submit = (e) => {
    if (
      validateForm(
        requiredsFields,
        [],
        [],
        requiredOnlyAlphabets,
        [],
        autoComplete,
        "error"
      )
    ) {
      var data = {
        firstName: fName.trim(),
        lastName: lName.trim(),
        ssoId: ssoId.trim(),
        password: password.trim(),
        email: email.trim(),
        role: roleId.trim(),
      };

      users.forEach((element) => {
        if (element.id === ssoId) {
          setAddErrorMsg(true);
          getUsers();
          setTimeout(() => {
            setAddErrorMsg(false);
          }, 3000);
        }
      });

      axiosPrivate
        .post(
          `${userservice}/qfuserservice/user/createUser?user_id=0&current_user_id=${loggedInId}`,
          data
        )
        .then((res) => {
          console.log(res.data.info);
          setAddSuccessMsg(true);
          getUsers();
          setTimeout(() => {
            setAddSuccessMsg(false);
          }, 3000);
        });
      handleClose();
    } else {
      setValidationMsg(true);
      setTimeout(() => {
        setValidationMsg(false);
      }, 3000);
      console.log("Invalid form");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle
        id="alert-dialog-title"
        className="dialogTitle border-bottom"
        sx={{
          padding: 0.5,
          backgroundColor: "rgba(137,196,244,1)",
        }}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className="poptitle"
        >
          <Typography
            sx={{ marginLeft: 1, marginTop: "auto", marginBottom: "auto " }}
            variant="inherit"
          >
            Add User{" "}
          </Typography>
          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={handleClose}
            className="btn-close "
          >
            <ClearOutlinedIcon sx={{ color: "white" }} />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent
        className="AddUsers"
        style={{ marginTop: "10px", marginLeft: "auto", marginRight: "auto" }}
      >
        <div>
          <form>
            <div onClick={resetClassName}>
              <Container
                component={"div"}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                }}
              >
                <Grid
                  container
                  item
                  xs={12}
                  sm={8}
                  md={6}
                  sx={{ marginBottom: "10px" }}
                >
                  <Grid item xs={6} sm={6} md={3}>
                    <label>
                      First Name <span className="importantfield">*</span>:
                    </label>
                  </Grid>
                  <Grid item xs={6} sm={6} md={8}>
                    <input
                      type="text"
                      ref={first_name}
                      onChange={(e) => setFName(e.target.value)}
                      name="firstName"
                      placeholder=" Enter First Name"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sm={8}
                  md={6}
                  sx={{ marginBottom: "10px" }}
                >
                  <Grid item xs={6} sm={6} md={3}>
                    <label>
                      Last Name <span className="importantfield">*</span>:
                    </label>
                  </Grid>
                  <Grid item xs={6} sm={6} md={8}>
                    <input
                      type="text"
                      ref={last_name}
                      onChange={(e) => setLName(e.target.value)}
                      name="lastName"
                      placeholder=" Enter Last Name"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sm={8}
                  md={6}
                  sx={{ marginBottom: "10px" }}
                >
                  <Grid item xs={6} sm={6} md={3}>
                    <label>
                      User Id <span className="importantfield">*</span>:
                    </label>
                  </Grid>
                  <Grid item xs={6} sm={6} md={8}>
                    <input
                      type="text"
                      ref={sso_id}
                      onChange={(e) => setSsoId(e.target.value)}
                      name="userId"
                      placeholder=" Enter Unique Id only"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sm={8}
                  md={6}
                  sx={{ marginBottom: "10px" }}
                >
                  <Grid item xs={6} sm={6} md={3}>
                    <label>
                      Password <span className="importantfield">*</span>:
                    </label>
                  </Grid>
                  <Grid item xs={6} sm={6} md={8}>
                    <input
                      type="text"
                      ref={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      placeholder=" Enter password "
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sm={8}
                  md={6}
                  sx={{ marginBottom: "10px" }}
                >
                  <Grid item xs={6} sm={6} md={3}>
                    <label>
                      Email Id <span className="importantfield">*</span>:
                    </label>
                  </Grid>
                  <Grid item xs={6} sm={6} md={8}>
                    <input
                      name="email"
                      ref={Email}
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder=" Enter Email"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sm={8}
                  md={6}
                  sx={{ marginBottom: "10px" }}
                >
                  <Grid item xs={6} sm={6} md={3}>
                    <label>
                      Role <span className="importantfield">*</span>:
                    </label>
                  </Grid>
                  <Grid item xs={6} sm={6} md={8}>
                    <select
                      ref={role_id}
                      name="roleAutocomplete"
                      id="selectList"
                      onChange={(e) => setRoleId(e.target.value)}
                    >
                      <option value="">...Select Role...</option>
                      <option value="1">AUTOMATION ENGINEER</option>
                      <option value="2">ADMIN</option>
                      <option value="3">DBA</option>
                      <option value="4">AUTOMATION MANAGER</option>
                    </select>
                  </Grid>
                </Grid>
              </Container>
            </div>
          </form>
        </div>
      </DialogContent>
      <DialogActions
        style={{
          marginTop: "1px",
          marginBottom: "5px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Button
          variant="contained"
          onClick={submit}
          startIcon={<SaveOutlinedIcon />}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUserPopup;
