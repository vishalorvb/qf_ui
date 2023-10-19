import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function RuntimeVar({ open, close }) {
  return (
    <Dialog open={open} onClose={() => close(false)}>
      <DialogTitle>Runtime Variable</DialogTitle>
      <DialogContent>
        <TextField />
      </DialogContent>
      <DialogActions>
        <Button>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
