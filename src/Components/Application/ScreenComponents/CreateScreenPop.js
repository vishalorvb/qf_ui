import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import SnackbarNotify from "../../../CustomComponent/SnackbarNotify";
import useAuth from "../../../hooks/useAuth";
import useHead from "../../../hooks/useHead";

export default function CreateScreenPop(props) {
  const { elementsList, applicationId, pageId, screenName, screenId } = props;
  console.log(props);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { setSnackbarData } = useHead();

  const [screenData, setScreenData] = useState(() => {
    return { name: screenName?.name, desc: screenName?.desc };
  });
  const [selectElements, setSelectElements] = useState(false);
  const [emptyDetails, setEmptyDetails] = useState(false);
  const [updateSnack, setUpdateSnack] = useState(false);
  const [createSnack, setCreateSnack] = useState(false);

  const saveScreen = () => {
    elementsList.length < 1 && setSelectElements(true);
    console.log(screenData);

    const screendata = {
      screen_name: screenData?.name?.trim(),
      screen_description: screenData?.desc?.trim(),
      user_id: auth?.userId,
      module_id: applicationId,
      page_id: pageId,
      elements_list: elementsList,
      screen_id: screenId,
    };
    screenData?.name && screenData?.desc
      ? axios
          .post(`/qfservice/screen/createScreen`, screendata)
          .then((resp) => {
            setSnackbarData({
              status: true,
              message: resp?.data?.message,
              severity: resp?.data?.status === "SUCCESS" ? "success" : "error",
            });
            resp?.data?.status === "SUCCESS" && navigate(-1);
          })
      : setEmptyDetails(true);
  };

  return (
    <>
      {selectElements && (
        <SnackbarNotify
          open={selectElements}
          close={setSelectElements}
          msg="Select At least one Element"
          severity="error"
        />
      )}
      {emptyDetails && (
        <SnackbarNotify
          open={emptyDetails}
          close={setEmptyDetails}
          msg="Enter Screen Details"
          severity="error"
        />
      )}
      {updateSnack && (
        <SnackbarNotify
          open={updateSnack}
          close={setUpdateSnack}
          msg={"Screen is updated Successfully"}
          severity="success"
        />
      )}
      {createSnack && (
        <SnackbarNotify
          open={createSnack}
          close={setCreateSnack}
          msg={"Screen is created Successfully"}
          severity="success"
        />
      )}
      <Grid container direction="row" spacing={1}>
        <Grid item md={4}>
          <label>Screen name</label>
          <TextField
            size="small"
            type="text"
            name="screenName"
            fullWidth
            value={screenData.name}
            onChange={(e) => {
              console.log(e);
              setScreenData((ps) => {
                return { ...ps, name: e.target.value };
              });
            }}
          />
        </Grid>
        <Grid item md={4}>
          <label>Screen Description</label>
          <TextField
            size="small"
            type="text"
            name="description"
            fullWidth
            value={screenData.desc}
            onChange={(e) => {
              console.log(e);
              setScreenData((ps) => {
                return { ...ps, desc: e.target.value };
              });
            }}
          />
        </Grid>
        <Grid item md={4} mt={2.3}>
          <Button variant="contained" onClick={saveScreen}>
            Create & Continue
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
