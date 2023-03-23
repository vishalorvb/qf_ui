import { Divider, Grid, List, ListItem, ListItemButton } from "@mui/material";
import ListDetails from "../DevopsComponent/ListDetails";
import MuiListItemText from "@mui/material/ListItemText";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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
            fontSize: "x-small",
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
              {apiItem.browser_type === "chrome" && <img src="chrome.png" width={"40px"} />}
            </MuiListItemIcon>

            <MuiListItemText style={{ color: "#1C84EE" }} primary={apiItem.testcase_name} />
            <MuiListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "flex-end",
              }}
            >
              {apiItem.status.includes("fail") ? <CancelIcon sx={{ color: "red" }} /> : <CheckCircleIcon sx={{ color: "green" }} />}
            </MuiListItemIcon>
          </ListItemButton>
        </ListItem>
      );
    });
    return navigationList;
  };

  useEffect(() => {
    setSelectedItem(result[0]);
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