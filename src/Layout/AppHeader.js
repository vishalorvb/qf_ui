import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import { Grid, IconButton, Typography } from "@mui/material";
export default function AppHeader({ setOpen }) {
  const handleDrawerOpen = () => {
    setOpen((open) => !open);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
      >
        <FormatAlignLeftIcon />
      </IconButton>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <Avatar>R</Avatar>
        <Typography gutterBottom> Hi Ravi</Typography>
        {/* it should be a card the abova typography with a saperate component */}
      </Stack>
    </Grid>
  );
}
