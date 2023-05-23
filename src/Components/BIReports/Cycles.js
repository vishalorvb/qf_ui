import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import React, { useEffect,useState } from "react";
import useHead from "../../hooks/useHead";
import ImageIcon from "@mui/icons-material/Image";
import Divider from "@mui/material/Divider";
import { useLocation } from "react-router";
import axios from "../../api/axios";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import CreateCycle from "./CreateCycle";
import ViewCycle from "./ViewCycle";
import DeleteIcon from '@mui/icons-material/Delete';
import TableActions from "../../CustomComponent/TableActions";
import ConfirmPop from "../../CustomComponent/ConfirmPop";
function Cycles() {
  const { setHeader } = useHead();
  const location = useLocation();
  const [validationMsg, setValidationMsg] = useState(false);
  const [addSuccessMsg, setAddSuccessMsg] = useState(false);
  const [addErrorMsg, setAddErrorMsg] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [msg, setMsg] = useState("");
  const [openNewPhase, setOpenNewPhase] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [cycleId, setCycleId] = useState();
  const [cycleList, setCycleList] = useState([]);
  const [selectedCycleList, setSelectedCycleList] = useState([]);
  const [TSList, setTSList] = useState([]);

  let porject_id = location.state.param2;
  const getCycles = () => {
    axios.get(`/Biservice/projects/${porject_id}/cycles`).then((resp) => {
      // console.log(resp);
      setCycleList(resp?.data?.info?.cycles);
      setTSList(resp?.data?.info?.bitestsets);
    });
  };

  function deleteCycle(cycleId) {
    axios
      .post(
        `/Biservice/projects/cycles/delete?cycle_id=${cycleId}`
      )
      .then((res) => {
        // console.log(res);
        if (res.data.status == "SUCCESS") {
          setSuccessDelete(true);
          getCycles();
          setOpenNewPhase(true);
          setTimeout(() => {
            setSuccessDelete(false);
          }, 3000);

        }
      })
      .catch((res) => {
        // console.log(res);
      });
    setConfirm(false);
  }

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
                            // console.log(cycle.cycle_id)
                            setCycleId(cycle.cycle_id)
                            setConfirm(true);

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
          {openNewPhase ? <CreateCycle testsetData={TSList} getCycles={getCycles} /> : <ViewCycle selectedCycleList={selectedCycleList} />}
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
      {successDelete && <SnackbarNotify
        open={successDelete}
        close={setSuccessDelete}
        msg="Cycle deleted successfully"
        severity="success"
      />}
      {confirm && (
        <ConfirmPop
          open={true}
          handleClose={(e) => setConfirm(false)}
          heading={"Delete Cycle"}
          message={"Are you sure you want to delete the Cycle ?"}
          onConfirm={(e) => deleteCycle(cycleId)}
        ></ConfirmPop>
      )}
    </>
  );
}

export default Cycles;
