import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { TextFieldElement, useForm } from "react-hook-form-mui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/system";

export default function UpdatePage({ open, setOpen }) {
  const schema = yup.object().shape({
    name: yup.string().required(),
    desc: yup.string().required(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleUpdate = (data) => {
    console.log(data);
  };
  const handleClose = () => {
    console.log("first");
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Page</DialogTitle>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <DialogContent>
          <TextFieldElement
            id="name"
            label="Name"
            variant="outlined"
            size="small"
            fullWidth
            name="name"
            control={control}
            sx={{ marginBottom: 3 }}
          />
          <TextFieldElement
            id="desc"
            label="desc"
            variant="outlined"
            size="small"
            fullWidth
            name="desc"
            control={control}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained">Update</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
