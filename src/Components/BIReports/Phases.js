import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React, { useEffect } from "react";
import useHead from "../../hooks/useHead";
import ImageIcon from "@mui/icons-material/Image";
import Divider from "@mui/material/Divider";

function Phases() {
  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "BI Testset Reports",
      };
    });
  }, []);

  return (
    <Grid container justify-content="flex-start" spacing={1}>
      <Grid item container md={3}>
        <Grid item container mt={2}>
          <List sx={{ maxWidth: 500, width: "90%" }}>
            <Grid item xs={2} sm={4} md={12}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Add New" secondary="Phase" />
              </ListItem>
              <Divider sx={{mt:1}}/>
            </Grid>
            {Array.from(Array(6)).map((_, index) => (
              <Grid item xs={2} sm={4} md={12} key={index} mt={1}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={"Phase "+(index+1)} secondary="Phase" />
                </ListItem>
                {index != 5 ? <Divider sx={{mt:1}}/> : ""}
              </Grid>
            ))}
          </List>
        </Grid>
      </Grid>
      <Grid item container md={1}>
        <Divider orientation="vertical" />
      </Grid>
      <Grid item conatiner md={8} justifyContent="flex-start" mt={5}>
        <Grid item md={2} justifyContent="flex-start">
            <h3>Details</h3>
        </Grid>
        <Grid item md={2} conatiner justifyContent="flex-start" mt={2} ml={4}>
            <h3>Details</h3>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Phases;
