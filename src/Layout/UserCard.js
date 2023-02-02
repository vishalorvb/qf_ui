import { Grid, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { ExpandMore } from "../CustomComponent/ExpandMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Stack } from "@mui/system";
import useAuth from "../hooks/useAuth";

export default function UserCard() {
  const { auth, setAuth } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Grid
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={0.5}
        >
          <Typography sx={{ color: "black", margin: "0px" }}>
            Welcome {auth?.user}
          </Typography>
          <ExpandMore
            expand={open}
            aria-expanded={open}
            aria-label="show more"
            disableFocusRipple
            disableRipple
            sx={{ color: "black", padding: "0px" }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Stack>
        <Typography variant="caption" sx={{ color: "#728FAD" }}>
          Test Engineer
        </Typography>
      </Grid>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={() => setAuth({})}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
