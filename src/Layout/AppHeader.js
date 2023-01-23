import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import { Grid, IconButton, Paper, Typography } from "@mui/material";
import UserCard from "./UserCard";
export default function AppHeader({ setOpen }) {
  const handleDrawerOpen = () => {
    setOpen((open) => !open);
  };

  return (
    <Grid
      component={Paper}
      elevation={0}
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        background:
          "transparent linear-gradient(270deg, #FFFFFF 0%, #F5F5F6 100%) 0% 0% no-repeat padding-box",
        height: "65px",
      }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="end"
      >
        <FormatAlignLeftIcon />
      </IconButton>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
        mr={2}
      >
        <Avatar variant="rounded">R</Avatar>
        <UserCard />
        {/* it should be a card the abova typography with a saperate component */}
      </Stack>
    </Grid>
  );
}
