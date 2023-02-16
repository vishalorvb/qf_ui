import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { TextFieldElement, useForm } from "react-hook-form-mui";

export default function CreateApplication(props) {
  const schema = yup.object().shape({
    name: yup.string().required(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = () => {};
  const { open, close, type } = props;
  const handleClose = () => {
    close(false);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="dialogTitle">Create Application</DialogTitle>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <DialogContent className="dialogContent">
          <Grid container spacing={1}>
            <Grid item md={12}>
              <TextFieldElement
                id="application-name"
                label="Name"
                variant="outlined"
                size="small"
                fullWidth
                name="name"
                control={control}
              />
            </Grid>
            <Grid item md={12}>
              <TextFieldElement
                id="application-desc"
                label="Description"
                variant="outlined"
                size="small"
                fullWidth
                name="description"
                control={control}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="contained" type="submit">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
