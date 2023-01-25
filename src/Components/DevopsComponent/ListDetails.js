import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MuiListItemText from "@mui/material/ListItemText";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import { List, ListItem, Typography } from "@mui/material";
export default function ListDetails(props) {
  const { selectedItemData } = props;

  const itemRender = (selectedData) => {
    const navigationList = selectedData?.map((apiItem) => {
      return (
        <ListItem
          sx={{
            display: "flex",
          }}
          key={apiItem.text}
          divider
        >
          <MuiListItemIcon>
            <InfoOutlinedIcon />
          </MuiListItemIcon>

          {/* <MuiListItemText primary={apiItem.text} /> */}
          <div dangerouslySetInnerHTML={{ __html: apiItem.text }} />
        </ListItem>
      );
    });
    return navigationList;
  };

  return <List>{itemRender(selectedItemData)}</List>;
}
