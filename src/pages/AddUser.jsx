import React, { useEffect, useRef, useState } from "react";
// import axios from 'axios';
import { Button, Grid, Stack } from "@mui/material";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import {
  validateForm,
  resetClassName,
} from "../CustomComponent/FormValidation";
import useHead from "../hooks/useHead";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";
import { useNavigate } from "react-router-dom";
import { userservice } from "../Environment";
import axios from "axios";

function AddUser() {
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
  const { auth } = useAuth();
  const loggedInId = auth.info.id;

  const [validationMsg, setValidationMsg] = useState(false);
  const [addSuccessMsg, setAddSuccessMsg] = useState(false);
  const [addErrorMsg, setAddErrorMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  let requiredsFields = [Email, sso_id, Password];
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
        firstName: fName.trim(),
        lastName: lName.trim(),
        ssoId: ssoId.trim(),
        password: password.trim(),
        email: email.trim(),
        role: roleId.trim(),
      };

      axios
        .post(
          `${userservice}/user/createUser?user_id=0&current_user_id=${loggedInId}`,
          data
        )
        .then((res) => {
          console.log(res.data.message);
          setMsg(res.data.message);
          if (res.data.message === "User is created successfully.") {
            setAddSuccessMsg(true);
            setTimeout(() => {
              setAddSuccessMsg(false);
              navigate("/users");
            }, 3000);
          } else {
            setAddErrorMsg(true);
            setTimeout(() => {
              setAddErrorMsg(false);
            }, 3000);
          }
        });
    } else {
      setValidationMsg(true);
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
        name: "Add User",
        plusButton: false,
        // plusCallback: addUserHandler,
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
                type="text"
                ref={first_name}
                onChange={(e) => setFName(e.target.value)}
                name="firstName"
                placeholder=" Enter First Name"
              />
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack spacing={1}>
              <label>
                Last Name <span className="importantfield">*</span>
              </label>
              <input
                type="text"
                ref={last_name}
                onChange={(e) => setLName(e.target.value)}
                name="lastName"
                placeholder=" Enter Last Name"
              />
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack spacing={1}>
              <label>
                User ID <span className="importantfield">*</span>
              </label>
              <input
                type="text"
                ref={sso_id}
                onChange={(e) => setSsoId(e.target.value)}
                name="userId"
                placeholder=" Enter Unique Id only"
              />
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack spacing={1}>
              <label>
                Password <span className="importantfield">*</span>
              </label>
              <input
                type="text"
                ref={Password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder=" Enter password "
              />
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
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" Enter Email"
              />
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack spacing={1}>
              <label>
                Role <span className="importantfield">*</span>
              </label>
              <select
                ref={role_id}
                name="roleAutocomplete"
                id="selectList"
                onChange={(e) => setRoleId(e.target.value)}
              >
                <option value="">...Select Role...</option>
                <option value="1">AUTOMATION ENGINEER</option>
                {/* <option value="2">ADMIN</option> */}
                {/* <option value="3">DBA</option> */}
                <option value="4">AUTOMATION MANAGER</option>
                <option value="3">DEVOPS MANAGER</option>
              </select>
            </Stack>
          </Grid>
        </Grid>
        <Stack mt={2} spacing={2} direction="row-reverse">
          <Button variant="contained" type="submit" onClick={submit}>
            Save & Continue
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
          msg="Fill all the required fields"
          severity="error"
        />
        <SnackbarNotify
          open={addSuccessMsg}
          close={setAddSuccessMsg}
          msg={msg}
          severity="success"
        />
        <SnackbarNotify
          open={addErrorMsg}
          close={setAddErrorMsg}
          msg={msg}
          severity="error"
        />
      </div>
    </div>
  );
}

export default AddUser;
