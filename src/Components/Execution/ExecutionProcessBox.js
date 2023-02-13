import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
export default function ExecutionProcessBox({
  open,
  close,
  executionSpin,
  executionResult,
}) {
  const handleClose = () => {
    close(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Execution Progress</DialogTitle>
      <DialogContent>
        {executionSpin ? (
          <CircularProgress />
        ) : (
          <ol>
            {executionResult?.map((res) => (
              <li>{res?.status}</li>
            ))}
          </ol>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
