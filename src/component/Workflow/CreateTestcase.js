import {
    Box,
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Paper,
    Select,
    MenuItem,
  } from "@mui/material";
  import ClearIcon from "@mui/icons-material/Clear";
  import SaveIcon from "@mui/icons-material/Save";

export default function CreateTestcase() {

    return(
        <Dialog open={false} fullWidth >
             <DialogTitle
        id="alert-dialog-title"
        className="dialogTitle border-bottom"
        sx={{
          padding: 0.5,
          backgroundColor: "primary.main",
        }}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className="poptitle"
        >
          <Typography
            sx={{ marginLeft: 1, marginTop: "auto", marginBottom: "auto " }}
            variant="inherit"
          >
            Create Testcase
          </Typography>
          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={() => {
            }}
            className="btn-close "
          >
            <ClearIcon sx={{ color: "white" }} />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent style={{ marginTop: "10px" }}>
        <Box>
            <Paper elevation={0} variant='outlined' >
            
            <Select
                labelId="demo-simple-select-label"
                size='small'
                autoWidth
                placeHolder='abhi'
                id="demo-simple-select"
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <Select
                labelId="demo-simple-select-label"
                size='small'
                fullWidth
                placeHolder='abhi'
                id="demo-simple-select"
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>

            </Paper>
        </Box>
      </DialogContent>
      <DialogActions
        style={{
          marginTop: "1px",
          marginBottom: "5px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Button
          variant="contained"
          onClick={console.log(1)}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </DialogActions>
        </Dialog>
    )
}