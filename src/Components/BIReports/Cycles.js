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
  MenuItem,
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
import DeleteIcon from '@mui/icons-material/Delete';
import TableActions from "../../CustomComponent/TableActions";
function Cycles() {
  const { setHeader } = useHead();

  const [validationMsg, setValidationMsg] = useState(false);
  const [addSuccessMsg, setAddSuccessMsg] = useState(false);
  const [addErrorMsg, setAddErrorMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [openNewPhase, setOpenNewPhase] = useState(true);

  const [cycleList, setCycleList] = useState([]);
  const [selectedCycleList, setSelectedCycleList] = useState([]);

  const [TSList, setTSList] = useState([]);
  let [popup, setPopup] = useState(false);


  const getCycles = () => {
    axios.get("/Biservice/projects/93/cycles").then((resp) => {
      console.log(resp);
      setCycleList(resp?.data?.info?.cycles);
      setTSList(resp?.data?.info?.bitestsets);
    });
  };

  const deleteCycle = () => {
    axios.get(`/Biservice/projects/cycles/delete?cycle_id=${selectedCycleList.cycle_id}`).then((resp) => {
      console.log(resp);
      setCycleList(resp?.data?.info?.cycles);
      setTSList(resp?.data?.info?.bitestsets);
    });
  };

  console.log(selectedCycleList.cycle_id)
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
          <div style={{ overflowY: "auto", height: "70vh" }}>
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
                        setSelectedCycleList(cycle)
                        // console.log(cycle);
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
                      <TableActions>
                        <MenuItem
                          onClick={(e) => {
                            setPopup(true);
                          }}
                        >
                          <DeleteIcon sx={{ color: "black", mr: 1 }} />
                          Delete
                        </MenuItem>
                      </TableActions>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </Grid>
        <Grid item md={0.1}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item md={9}>
          {openNewPhase ? <CreateCycle testsetData={TSList} /> : <ViewCycle selectedCycleList={selectedCycleList} />}
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
