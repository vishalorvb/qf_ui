import { Button, Grid, Stack, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useLocation } from "react-router-dom";
import {
  validateForm,
  resetClassName,
} from "../../CustomComponent/FormValidation";
import { useNavigate } from "react-router-dom";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import useHead from "../../hooks/useHead";
import { userservice } from "../../Environment";

function EditUser() {
  const location = useLocation();
  const [fname, setFname] = useState(location.state.param1.firstName);
  const first_name = useRef();
  const [lname, setLname] = useState(location.state.param1.lastName);
  const last_name = useRef();
  const [email, setEmail] = useState(location.state.param1.email);
  const Email = useRef();
  const [password, setPassword] = useState(location.state.param1.password);
  const Password = useRef();
  const [roleId, setRoleId] = useState(location.state.param1.role);
  const [editSuccessMsg, setEditSuccessMsg] = useState(false);
  const [validationMsg, setValidationMsg] = useState(false);
  const [msg, setMsg] = useState(false);
  const { auth } = useAuth();
  // const token  = localStorage.getItem("token");
  const loggedInId = auth.info.id;
  const navigate = useNavigate();

  const values = {
    uid: location.state.param1.ssoId,
    id: location.state.param1.id,
  };

  const axiosPrivate = useAxios();

  let requiredsFields = [Email, Password];
  let requiredOnlyAlphabets = [first_name, last_name];
  let autoComplete = ["roleAutocomplete"];

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

      axiosPrivate
        .put(`${userservice}/qfuserservice/user/updateUser`, data)
        .then((res) => {
          console.log(res.data.info);
          setEditSuccessMsg(true);
          setTimeout(() => {
            setEditSuccessMsg(false);
            navigate("/users");
          }, 3000);
        })
        .catch((err) => {
          console.log(err.response.data.error);
          setValidationMsg(true);
          setMsg(err.response.data.status + " " + err.response.data.error);
          setTimeout(() => {
            setValidationMsg(false);
          }, 3000);
        });
    } else {
      setValidationMsg(true);
      setMsg("Fill all the required fields");
      setTimeout(() => {
        setValidationMsg(false);
      }, 3000);
      console.log("Invalid form");
    }
  };

  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Edit User",
        plusButton: false,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div onClick={resetClassName}>
      <div className="datatable" style={{ marginTop: "15px" }}>
        <Grid container direction="row" spacing={2}>
          <Grid item md={6}>
            <Stack spacing={1}>
              <label>
                First Name <span className="importantfield">*</span>
              </label>
              <input
                value={fname}
                ref={first_name}
                onChange={(e) => {
                  setFname(e.target.value);
                }}
                placeholder="Enter First Name"
              ></input>
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack spacing={1}>
              <label>
                Last Name <span className="importantfield">*</span>
              </label>
              <input
                value={lname}
                ref={last_name}
                onChange={(e) => {
                  setLname(e.target.value);
                }}
                placeholder="Enter Last Name"
              ></input>
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack spacing={1}>
              <label>
                Email <span className="importantfield">*</span>
              </label>
              <input
                name="email"
                ref={Email}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter Email"
              />
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack spacing={1}>
              <label>
                User ID <span className="importantfield">*</span>
              </label>
              <Tooltip title="Non Editable">
                <input
                  value={values.uid}
                  readOnly="readonly"
                  style={{ color: "grey" }}
                />
              </Tooltip>
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack spacing={1}>
              <label>
                Password <span className="importantfield">*</span>
              </label>
              <input
                value={password}
                ref={Password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter atleast 8 Characters"
              />
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack spacing={1}>
              <label>
                Role <span className="importantfield">*</span>
              </label>
              <select
                name="roleAutocomplete"
                id="selectList"
                onChange={(e) => setRoleId(e.target.value)}
              >
                <option value="">Select Role...</option>
                <option selected={roleId === 1 ? true : false} value="1">
                  AUTOMATION ENGINEER
                </option>

                <option selected={roleId === 4 ? true : false} value="4">
                  AUTOMATION MANAGER
                </option>
              </select>
            </Stack>
          </Grid>
        </Grid>
        <Stack mt={2} spacing={2} direction="row-reverse">
          <Button variant="contained" type="submit" onClick={submit}>
            Update
          </Button>
          <Button
            sx={{ color: "grey", textDecoration: "underline" }}
            onClick={() => navigate("/users")}
          >
            Cancel
          </Button>
        </Stack>
        <SnackbarNotify
          open={validationMsg}
          close={setValidationMsg}
          msg={msg}
          severity="error"
        />
        <SnackbarNotify
          open={editSuccessMsg}
          close={setEditSuccessMsg}
          msg="User Updated Successfully"
          severity="success"
        />
      </div>
    </div>
  );
}

export default EditUser;
