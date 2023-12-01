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
import { SAVE_USER_LOCAL_GIT_DETAILS } from "../../Environment";
import { getUserGitDetails } from "../../Services/UserService";

function GitDetails() {
  const location = useLocation();
  const [gitdetails, setGitdetails] = useState([]);
  const [gitUserName, setGitUserName] = useState();
  const git_user_name = useRef();
  const [gitAccessToken, setGitAccessToken] = useState();
  const git_access_token = useRef();
  const [gitBranch, setGitBranch] = useState();
  const git_branch = useRef();
  const [roleId, setRoleId] = useState(location.state.param1.role);
  const [editSuccessMsg, setEditSuccessMsg] = useState(false);
  const [validationMsg, setValidationMsg] = useState(false);
  const [msg, setMsg] = useState(false);
  const { auth } = useAuth();
  // const token  = localStorage.getItem("token");
  const loggedInId = auth.info.id;
  const navigate = useNavigate();

  const values = {
    id: location.state.param1.id,
  };

  const axiosPrivate = useAxios();

  let requiredsFields = [git_user_name, git_access_token, git_branch];
  let autoComplete = ["roleAutocomplete"];

  const submit = (e) => {
    if (
      validateForm(
        requiredsFields,
        [],
        [],
        [],
        [],
        autoComplete,
        "error"
      )
    ) {
      var data = {
        gitUserName: gitUserName.trim(),
        gitToken: gitAccessToken.trim(),
        git_branch: gitBranch.trim(),
        userId: values.id
      };
     console.log(data);
      axiosPrivate
        .post(SAVE_USER_LOCAL_GIT_DETAILS, data)
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


  useEffect(() => {
    getUserGitDetails(setGitdetails, values.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Add Git Detials",
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
              Git UserName <span className="importantfield">*</span>
              </label>
              <input
                value={gitUserName}
                ref={git_user_name}
                onChange={(e) => {
                  setGitUserName(e.target.value);
                }}
                placeholder="Enter Git User Name"
              ></input>
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack spacing={1}>
              <label>
                Git AccessToken <span className="importantfield">*</span>
              </label>
              <input
                value={gitAccessToken}
                ref={git_access_token}
                onChange={(e) => {
                  setGitAccessToken(e.target.value);
                }}
                placeholder="Enter Access Token"
              ></input>
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack spacing={1}>
              <label>
                Branch <span className="importantfield">*</span>
              </label>
              <input
                name="git_branch"
                ref={git_branch}
                value={gitBranch}
                onChange={(e) => {
                  setGitBranch(e.target.value);
                }}
                placeholder="Enter Branch"
              />
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

export default GitDetails;
