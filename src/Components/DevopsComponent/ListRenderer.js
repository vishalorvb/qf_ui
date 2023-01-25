import { Divider, Grid, List, ListItem, ListItemButton } from "@mui/material";
import ListDetails from "./ListDetails";
import MuiListItemText from "@mui/material/ListItemText";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import ApiIcon from "@mui/icons-material/Api";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import { useState } from "react";
import { Box } from "@mui/system";
import { useEffect } from "react";

export default function ListRenderer(props) {
  const { result } = props;
  const [selectedItem, setSelectedItem] = useState([]);
  const itemRender = (rawList) => {
    const navigationList = rawList?.map((apiItem, index) => {
      return (
        <ListItem
          sx={{
            display: "block",
          }}
          key={apiItem.testcase_name}
          divider
        >
          <ListItemButton onClick={() => setSelectedItem(apiItem.datasetdata)}>
            <MuiListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
              }}
            >
              <ApiIcon />
            </MuiListItemIcon>

            <MuiListItemText primary={apiItem.testcase_name} />
            <MuiListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
              }}
            >
              <LibraryAddCheckOutlinedIcon />
            </MuiListItemIcon>
          </ListItemButton>
        </ListItem>
      );
    });
    return navigationList;
  };

  useEffect(() => {
    console.log(result);
    setSelectedItem(result[0]?.datasetdata);
  }, [result]);

  return (
    <Grid container justifyContent="flex-end    ">
      <Grid item>
        <List>{itemRender(result)}</List>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item md={8}>
        <ListDetails selectedItemData={selectedItem} />
      </Grid>
    </Grid>
  );
}
