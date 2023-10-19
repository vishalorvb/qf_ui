import { Button, Grid, Stack } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import useHead from "../hooks/useHead";
import useAuth from "../hooks/useAuth";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";
import { useNavigate } from "react-router-dom";
import { userservice } from "../Environment";

let initialval = {
  organization_id: "",
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
};

export let postVal = { ...initialval };
const UpdateOrganization = () => {
  const { setHeader } = useHead();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [addSuccessMsg, setAddSuccessMsg] = useState(false);
  const [addFailMsg, setAddFailMsg] = useState(false);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const companyRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const onSubmitHandler = () => {
    if (
      postVal.firstName !== "" &&
      postVal.lastName !== "" &&
      postVal.company !== "" &&
      postVal.email !== "" &&
      postVal.phone !== ""
    ) {
      firstNameRef.current.value !== ""
        ? firstNameRef.current.classList.remove("error")
        : firstNameRef.current.classList.add("error");
      lastNameRef.current.value !== ""
        ? lastNameRef.current.classList.remove("error")
        : lastNameRef.current.classList.add("error");
      companyRef.current.value !== ""
        ? companyRef.current.classList.remove("error")
        : companyRef.current.classList.add("error");
      emailRef.current.value !== ""
        ? emailRef.current.classList.remove("error")
        : emailRef.current.classList.add("error");
      phoneRef.current.value !== ""
        ? phoneRef.current.classList.remove("error")
        : phoneRef.current.classList.add("error");
      updateOrganizationDetails();
    } else {
      firstNameRef.current.value === "" &&
        firstNameRef.current.classList.add("error");
      lastNameRef.current.value === "" &&
        lastNameRef.current.classList.add("error");
      companyRef.current.value === "" &&
        companyRef.current.classList.add("error");
      emailRef.current.value === "" && emailRef.current.classList.add("error");
      phoneRef.current.value === "" && phoneRef.current.classList.add("error");
    }
  };

  function updateOrganizationDetails() {
    try {
      axios({
        method: "put",
        url: `${userservice}/qfuserservice/user/updateorgdetails?firstName=${postVal.firstName}&lastName=${postVal.lastName}&organizationName=${postVal.company}&adminEmail=${postVal.email}&phoneNumber=${postVal.phone}&orgId=${postVal.organization_id}`,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }).then((res) => {
        if (res.data.message === "Organization details updated successfully.") {
          setAddSuccessMsg(true);
          setTimeout(() => {
            setAddSuccessMsg(false);
            navigate(-1);
          }, 1500);
        } else {
          setAddFailMsg(true);
          setTimeout(() => {
            setAddFailMsg(false);
          }, 3000);
        }
      });
    } catch (error) {
      console.error(error); // handle error
    }
  }

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Update Organization",
      };
    });

    return () => {
      postVal = { ...initialval };
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid item md={4}>
          <Stack spacing={0.5}>
            <label>
              first Name
              <span className="importantfield">*</span>
            </label>
            <input
              ref={firstNameRef}
              fullWidth
              defaultValue={postVal.firstName}
              size="small"
              onChange={(e) => {
                postVal.firstName = e.target.value;
              }}
            />
          </Stack>
        </Grid>
        <Grid item md={4}>
          <Stack spacing={0.5}>
            <label>
              last Name
              <span className="importantfield">*</span>
            </label>
            <input
              ref={lastNameRef}
              fullWidth
              size="small"
              defaultValue={postVal.lastName}
              onChange={(e) => {
                postVal.lastName = e.target.value;
              }}
            />
          </Stack>
        </Grid>
        <Grid item md={4}>
          <Stack spacing={0.5}>
            <label>
              Organization Name<span className="importantfield">*</span>
            </label>
            <input
              ref={companyRef}
              defaultValue={postVal.company}
              fullWidth
              size="small"
              onChange={(e) => {
                postVal.company = e.target.value;
              }}
            />
          </Stack>
        </Grid>
        <Grid item md={4}>
          <Stack spacing={0.5}>
            <label>
              Admin Email<span className="importantfield">*</span>
            </label>
            <input
              ref={emailRef}
              fullWidth
              size="small"
              defaultValue={postVal.email}
              onChange={(e) => {
                postVal.email = e.target.value;
              }}
            />
          </Stack>
        </Grid>
        <Grid item md={4}>
          <Stack spacing={0.5}>
            <label>
              Phone Number
              <span className="importantfield">*</span>
            </label>
            <input
              ref={phoneRef}
              type="number"
              defaultValue={postVal.phone}
              fullWidth
              size="small"
              onChange={(e) => {
                postVal.phone = e.target.value;
              }}
            />
          </Stack>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" alignItems="center" mt={2}>
        <Grid item md={1.5}>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            style={{ backgroundColor: "#009fee" }}
            onClick={onSubmitHandler}
          >
            Update
          </Button>
        </Grid>
      </Grid>
      <SnackbarNotify
        open={addSuccessMsg}
        close={setAddSuccessMsg}
        msg=" updated successfully."
        severity="success"
      />
      <SnackbarNotify
        open={addFailMsg}
        close={setAddFailMsg}
        msg="Organization name is already exist. Please choose another name.."
        severity="error"
      />
    </>
  );
};

export default UpdateOrganization;
