import { Divider, Grid, List, ListItem, ListItemButton } from "@mui/material";
import MuiListItemText from "@mui/material/ListItemText";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect } from "react";
import ReportDetails from "./ReportDetails";

export default function ReportList({ result }) {
  const [selectedItem, setSelectedItem] = useState([]);
  const itemRender = (rawList) => {
    const navigationList = rawList?.map((apiItem, index) => {
      return (
        <ListItem
          key={apiItem.testcase_name}
          divider
          selected={selectedItem?.id === apiItem?.id}
        >
          <ListItemButton onClick={() => setSelectedItem(apiItem)}>
            <MuiListItemIcon>
              {apiItem.browser_type === "chrome" && (
                <Grid item className="chromeImg">
                  <img
                    src="logo-light.png"
                    className="loginLogo"
                    alt=""
                    height="2px"
                  />
                </Grid>
              )}
              {apiItem.browser_type === "ie" && (
                <Grid item className="ieImg">
                  <img
                    src="logo-light.png"
                    className="loginLogo"
                    alt=""
                    height="2px"
                  />
                </Grid>
              )}
            </MuiListItemIcon>

            <MuiListItemText
              style={{ color: "#1C84EE" }}
              primary={apiItem.testcase_name}
            />
            <MuiListItemIcon>
              {apiItem.status.includes("fail") ? (
                <CancelIcon sx={{ color: "red" }} />
              ) : (
                <CheckCircleIcon sx={{ color: "green" }} />
              )}
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
    <Grid
      container
      justifyContent="space-between"
      sx={{ maxWidth: "80vw", overflowX: "scroll" }}
    >
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
