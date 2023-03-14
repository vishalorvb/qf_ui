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
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

export default function CreateScreenPop(props) {
  const { elementsList, open, close, applicationId, pageId, screenName } =
    props;
  console.log(props);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const handleClose = () => {
    close(false);
  };

  const [screenData, setScreenData] = useState(() => {
    return { name: screenName?.name, desc: screenName?.desc };
  });
  const saveScreen = () => {
    const screendata = {
      screen_name: screenData.name,
      screen_description: screenData.desc,
      user_id: auth?.userId,
      module_id: applicationId,
      page_id: pageId,
      elements_list: elementsList,
    };
    axios.post(`/qfservice/screen/createScreen`, screendata).then((resp) => {
      console.log(resp);
      resp?.data?.status === "SUCCESS" &&
        navigate("/application/webApp/screen", {
          state: { id: applicationId },
        });
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="dialogTitle">Create Screen</DialogTitle>
      <DialogContent className="dialogContent">
        <Grid container spacing={1}>
          <Grid item md={12}>
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
          <Grid item md={12}>
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
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="contained"
          //   type="submit"
          onClick={saveScreen}
        >
          Save
        </Button>
        <Button
          size="small"
          variant="outlined"
          type="submit"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
