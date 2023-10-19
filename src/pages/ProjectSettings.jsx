import { Button, TextField, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Stack } from "@mui/system";
export default function ProjectSettings() {
  return (
    <Stack gap={3}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Update Project Configurations</Typography>
        <Button size="large" variant="contained" endIcon={<SettingsIcon />}>
          Configure
        </Button>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Make a copy of this project</Typography>
        <Button
          size="large"
          variant="contained"
          endIcon={<ContentCopyIcon />}
          sx={{ backgroundColor: "green" }}
        >
          copy
        </Button>
      </Stack>
      <Stack direction="column" gap={1}>
        <Typography variant="h6">Delete Project</Typography>
        <TextField name="deleteProject" />
        <Stack direction="row" justifyContent="flex-end">
          <Button
            size="large"
            variant="contained"
            endIcon={<SettingsIcon />}
            sx={{ backgroundColor: "red" }}
          >
            delete
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
