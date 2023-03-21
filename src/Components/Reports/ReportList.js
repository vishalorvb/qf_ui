import { Divider, Grid, List, ListItem, ListItemButton } from "@mui/material";
import ListDetails from "../DevopsComponent/ListDetails";
import MuiListItemText from "@mui/material/ListItemText";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import ApiIcon from "@mui/icons-material/Api";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import { useState } from "react";
import { Box } from "@mui/system";
import { useEffect } from "react";
import ReportDetails from "./ReportDetails";


export default function ReportList(props) {
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
            <ListItemButton onClick={() => setSelectedItem(apiItem)}>
              <MuiListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                }}
              >
                {apiItem.browser_type}
              </MuiListItemIcon>
  
              <MuiListItemText  primary={apiItem.testcase_name} />
              <MuiListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                }}
              >
                <LibraryAddCheckOutlinedIcon />
                {apiItem.status}
              </MuiListItemIcon>
            </ListItemButton>
          </ListItem>
        );
      });
      return navigationList;
    };
  
    useEffect(() => {
      setSelectedItem(result[0]?.datasetdata);
    }, [result]);
  
    return (
      <Grid container justifyContent="space-between">
        <Grid item md={4}>
          <List>{itemRender(result)}</List>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item md={7}>
          <ReportDetails selectedItemData={selectedItem} />
        </Grid>
      </Grid>
    );
  }