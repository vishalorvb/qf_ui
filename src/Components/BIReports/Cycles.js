import {
  Avatar,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import useHead from "../../hooks/useHead";
import ImageIcon from "@mui/icons-material/Image";
import Divider from "@mui/material/Divider";
import { Container, Stack } from "@mui/system";
import { validateForm } from "../../CustomComponent/FormValidation";
import { useNavigate } from "react-router";
import axios, { axiosPrivate } from "../../api/axios";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import CreateCycle from "./CreateCycle";
import ViewCycle from "./ViewCycle";

function Cycles() {
  const { setHeader } = useHead();

  const [validationMsg, setValidationMsg] = useState(false);
  const [addSuccessMsg, setAddSuccessMsg] = useState(false);
  const [addErrorMsg, setAddErrorMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [openNewPhase, setOpenNewPhase] = useState(true);

  const [cycleList, setCycleList] = useState([]);
  const [TSList, setTSList] = useState([]);

  const getCycles = () => {
    axios.get("/Biservice/projects/93/cycles").then((resp) => {
      console.log(resp);
      setCycleList(resp?.data?.info?.cycles);
      setTSList(resp?.data?.info?.bitestsets);
    });
  };

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "BI Testset Reports",
      };
    });
    getCycles();
  }, []);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item md={2}>
          <List>
            <ListItem disableGutters divider>
              <ListItemButton
                onClick={() => {
                  setOpenNewPhase(true);
                }}
                dense
              >
                <ListItemIcon>
                  <ImageIcon />
                </ListItemIcon>
                <ListItemText primary="Add New" secondary="cycle" />
              </ListItemButton>
            </ListItem>
            {cycleList?.map((cycle) => {
              return (
                <ListItem disableGutters divider>
                  <ListItemButton
                    onClick={() => {
                      setOpenNewPhase(false);
                      console.log(cycle);
                    }}
                    dense
                  >
                    <ListItemIcon>
                      <ImageIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={cycle?.cycle_name}
                      secondary="cycle"
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item md={0.1}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item md={9}>
          {openNewPhase ? <CreateCycle testsetData={TSList} /> : <ViewCycle />}
        </Grid>
      </Grid>

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
    </>
  );
}

export default Cycles;
