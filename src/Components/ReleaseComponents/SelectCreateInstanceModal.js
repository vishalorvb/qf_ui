import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

export default function SelectCreateInstanceModal(props) {
  const navigate = useNavigate();
  const { createInstate, setCreateInstance } = props;
  const handleClose = () => {
    setCreateInstance(false);
  };

  const handleNo = () => {
    setCreateInstance(false);
    navigate("/release/createInstance", {
      state: { id: 1, name: "createInstance" },
    });
  };
  const handleYes = () => {
    setCreateInstance(false);
    navigate("/release/createAnsibleInstance", {
      state: { id: 1, name: "createAnsibleInstance" },
    });
  };

  return (
    <Dialog open={createInstate} onClose={handleClose}>
      <DialogTitle>
        Please Confirm{" "}
        <IconButton
          aria-label="close"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>Do you want to proceed with Ansible.</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleNo}>
          No
        </Button>
        <Button variant="contained" onClick={handleYes}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
