import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupIcon from "@mui/icons-material/Group";
import TabIcon from "@mui/icons-material/Tab";
import { Box, Card, Typography } from "@mui/material";
import useHead from "../hooks/useHead";
import { useLocation } from "react-router";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";
import { qfservice, userservice } from "../Environment";

function OrganizationDashboard() {
  const header = [
    <AssessmentIcon
      style={{ width: "30%", height: "20%", color: "#009fee" }}
    />,
    <TabIcon style={{ width: "30%", height: "20%", color: "#009fee" }} />,
    <GroupIcon style={{ width: "30%", height: "20%", color: "#009fee" }} />,
  ];

  const [totalProjects, setTotalProjects] = useState();
  const [totalApplication, setTotalApplication] = useState();
  const [totalUsers, setTotalUsers] = useState([]);
  const data = [totalProjects, totalApplication, totalUsers];
  const body = ["Total Projects", "Total Applications", "Total Users"];
  const { setHeader } = useHead();
  const location = useLocation();
  const { auth } = useAuth();
  const [addSuccessMsg, setAddSuccessMsg] = useState(false);
  const [addFailMsg, setAddFailMsg] = useState(false);
  function TotalUser() {
    try {
      axios({
        method: "get",
        url: `${userservice}/qfuserservice/user/usersByOrg?orgId=${location.state.orgId}`,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }).then((res) => {
        if ((res.data.message = "users Details found.")) {
          res.data.info == null
            ? setTotalUsers(0)
            : setTotalUsers(res.data.info.length);

          // setAddSuccessMsg(true);
          // setTimeout(() => {
          //   setAddSuccessMsg(false);
          // }, 3000);
        } else {
          // setAddFailMsg(true);
          // setTimeout(() => {
          //   setAddFailMsg(false);
          // }, 3000);
        }
      });
    } catch (error) {
      console.error(error); // handle error
    }
  }
  function TotalProjects() {
    try {
      axios({
        method: "get",
        url: `${qfservice}/qfservice/getProjectsOfOrg?orgId=${location.state.orgId}`,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }).then((res) => {
        if ((res.data.message = "users Details found.")) {
          res.data.info == null
            ? setTotalApplication(0)
            : setTotalApplication(res.data.info.length);
          // setAddSuccessMsg(true);
          // setTimeout(() => {
          //   setAddSuccessMsg(false);
          // }, 3000);
        } else {
          // setAddFailMsg(true);
          // setTimeout(() => {
          //   setAddFailMsg(false);
          // }, 3000);
        }
      });
    } catch (error) {
      console.error(error); // handle error
    }
  }
  function totalApplications() {
    try {
      axios({
        method: "get",
        url: `${qfservice}/qfservice/getApplicationsOfOrg?orgId=${location.state.orgId}`,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }).then((res) => {
        // console.log(Object.keys(res.data.info).length);
        if ((res.data.message = "Applications Details found.")) {
          res.data.info == null
            ? setTotalProjects(0)
            : setTotalProjects(Object.keys(res.data.info).length);
          setAddSuccessMsg(true);
          setTimeout(() => {
            setAddSuccessMsg(false);
          }, 3000);
        } else {
          // setAddFailMsg(true);
          // setTimeout(() => {
          //   setAddFailMsg(false);
          // }, 3000);
        }
      });
    } catch (error) {
      console.error(error); // handle error
    }
  }

  const crd = (index) => {
    return (
      <Card
        sx={{
          Width: "100px",
          display: "flex",
          height: "70px",
          backgroundColor: "#e8f2fd !important",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "300px",
            marginLeft: "5px",
          }}
        >
          {header[index]}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", width: "400px" }}>
          <Typography variant="subtitle1" align="left">
            <b>{body[index]}</b>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", marginLeft: "50px", width: "150px" }}>
          <Typography
            variant="h4"
            align="left"
            component="div"
            marginBottom={1}
          >
            {data[index]}
          </Typography>
        </Box>
      </Card>
    );
  };

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Organization Details",
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    TotalUser();
    TotalProjects();
    totalApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container justifyContent="flex-start" justifyItems="center">
        <Grid md={6}>
          <Typography variant="subtitle1" mb={1}>
            <b style={{ color: "rgb(0, 159, 238)" }}>
              {location.state?.company}
            </b>
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {Array.from(Array(3)).map((_, index) => (
                <Grid item xs={2} sm={4} md={12} key={index}>
                  {crd(index)}
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <SnackbarNotify
        open={addSuccessMsg}
        close={setAddSuccessMsg}
        msg="Record fetch seccessfully"
        severity="success"
      />
      <SnackbarNotify
        open={addFailMsg}
        close={setAddFailMsg}
        msg="Records not found."
        severity="error"
      />
    </>
  );
}

export default OrganizationDashboard;
