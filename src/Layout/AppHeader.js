import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Grid, IconButton, Paper, Typography } from "@mui/material";
import UserCard from "./UserCard";
import useAuth from "../hooks/useAuth";
export default function AppHeader({ setOpen }) {
  const handleDrawerOpen = () => {
    setOpen((open) => !open);
  };

  const { auth } = useAuth();

  return (
    <Grid component={Paper} elevation={0} container className="header">
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="end"
      >
        <MenuOutlinedIcon />
      </IconButton>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
        mr={2}
      >
        <Avatar variant="rounded">
          {auth?.user?.charAt(0)?.toUpperCase()}
        </Avatar>
        <UserCard />
      </Stack>
    </Grid>
  );
}
