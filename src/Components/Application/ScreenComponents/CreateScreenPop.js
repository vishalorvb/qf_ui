import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import SnackbarNotify from "../../../CustomComponent/SnackbarNotify";
import useAuth from "../../../hooks/useAuth";

export default function CreateScreenPop(props) {
  const { elementsList, applicationId, pageId, screenName, screenId } = props;
  console.log(props);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [screenData, setScreenData] = useState(() => {
    return { name: screenName?.name, desc: screenName?.desc };
  });
  const [selectElements, setSelectElements] = useState(false);
  const [emptyDetails, setEmptyDetails] = useState(false);

  const saveScreen = () => {
    elementsList.length < 1 && setSelectElements(true);
    console.log(screenData);

    const screendata = {
      screen_name: screenData.name,
      screen_description: screenData.desc,
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
            console.log(resp);
            resp?.data?.status === "SUCCESS" && navigate(-1);
          })
      : setEmptyDetails(true);
  };

  return (
    <>
      {/* // <Dialog open={open} onClose={handleClose}>
    //   <DialogTitle className="dialogTitle">Create Screen</DialogTitle>
    //   <DialogContent className="dialogContent"> */}
      <SnackbarNotify
        open={selectElements}
        close={setSelectElements}
        msg="Select At least one Element"
        severity="error"
      />
      <SnackbarNotify
        open={emptyDetails}
        close={setEmptyDetails}
        msg="Enter Screen Details"
        severity="error"
      />
      <Grid container direction="row" spacing={1}>
        <Grid item md={5}>
          <input
            type="text"
            name="screenName"
            placeholder="Screen Name"
            value={screenData.name}
            onChange={(e) => {
              console.log(e);
              setScreenData((ps) => {
                return { ...ps, name: e.target.value };
              });
            }}
          />
        </Grid>
        <Grid item md={5}>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={screenData.desc}
            onChange={(e) => {
              console.log(e);
              setScreenData((ps) => {
                return { ...ps, desc: e.target.value };
              });
            }}
          />
        </Grid>
        {/* // </DialogContent> */}
        {/* // <DialogActions> */}
        <Grid item md={2}>
          <Button
            variant="contained"
            //   type="submit"
            onClick={saveScreen}
          >
            Save
          </Button>
        </Grid>
      </Grid>

      {/* // </DialogActions> */}
      {/* // </Dialog> */}
    </>
  );
}
