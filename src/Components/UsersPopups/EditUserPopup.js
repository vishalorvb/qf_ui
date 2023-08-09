import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import {
  validateForm,
  resetClassName,
} from "../../CustomComponent/FormValidation";

function EditUserPopup(props) {
  const {
    object,
    openEdit,
    setOpenEdit,
    getUsers,
    setEditSuccessMsg,
    setValidationMsg,
  } = props;
  const [fname, setFname] = useState(object.firstName);
  const first_name = useRef();
  const [lname, setLname] = useState(object.lastName);
  const last_name = useRef();
  const [email, setEmail] = useState(object.email);
  const Email = useRef();
  const [password, setPassword] = useState(object.password);
  const Password = useRef();
  const [roleId, setRoleId] = useState(object.role);
  const role_id = useRef();
  const { auth } = useAuth();
  // const token  = localStorage.getItem("token");
  const loggedInId = auth.info.id;
  const values = {
    uid: props.object.ssoId,
    id: props.object.id,
  };
  console.log(props.object);

  const axiosPrivate = useAxios();

  let requiredsFields = [Email, Password];
  let requiredOnlyAlphabets = [first_name, last_name];
  let autoComplete = ["roleAutocomplete"];

  const handleClose = () => {
    setOpenEdit(false);
    setFname("");
    setLname("");
    setEmail("");
    setPassword("Password");
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
        ssoId: values.uid,
        password: password.trim(),
        firstName: fname.trim(),
        lastName: lname.trim(),
        email: email.trim(),
        role: roleId,
        id: values.id,
        current_user_id: loggedInId,
      };

      axiosPrivate.put(`/qfuserservice/user/updateUser`, data).then((res) => {
        console.log(res.data.info);
        setEditSuccessMsg(true);
        getUsers();
        setTimeout(() => {
          setEditSuccessMsg(false);
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
    <div>
      <Dialog
        open={openEdit}
        onClose={handleClose}
        style={{ marginLeft: "15px", marginTop: "20px" }}
        maxWidth="md"
      >
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
            <Typography sx={{ marginLeft: 1 }} variant="inherit">
              Edit Users{" "}
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
          className="EditUsers"
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
                    <Grid item xs={8} sm={6} md={8}>
                      <input
                        value={fname}
                        ref={first_name}
                        onChange={(e) => {
                          setFname(e.target.value);
                        }}
                        placeholder="Enter First Name"
                      ></input>
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
                    <Grid item xs={8} sm={6} md={8}>
                      <input
                        value={lname}
                        ref={last_name}
                        onChange={(e) => {
                          setLname(e.target.value);
                        }}
                        placeholder="Enter Last Name"
                      ></input>
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
                        Email <span className="importantfield">*</span>:
                      </label>
                    </Grid>
                    <Grid item xs={6} sm={6} md={8}>
                      <input
                        name="email"
                        ref={Email}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        placeholder="Enter Email"
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
                      <Tooltip title="Non Editable">
                        <input
                          value={values.uid}
                          readOnly="readonly"
                          style={{ color: "grey" }}
                        />
                      </Tooltip>
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
                        value={password}
                        ref={Password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        placeholder="Enter atleast 8 Characters"
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
                        name="roleAutocomplete"
                        id="selectList"
                        onChange={(e) => setRoleId(e.target.value)}
                      >
                        <option value="">Select Role...</option>
                        <option selected={roleId == 1 ? true : false} value="1">
                          AUTOMATION ENGINEER
                        </option>
                        <option selected={roleId == 2 ? true : false} value="2">
                          ADMIN
                        </option>
                        <option selected={roleId == 3 ? true : false} value="3">
                          DBA
                        </option>
                        <option selected={roleId == 4 ? true : false} value="4">
                          AUTOMATION MANAGER
                        </option>
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
            startIcon={<EditOutlinedIcon />}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditUserPopup;
