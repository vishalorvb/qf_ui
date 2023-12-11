import {
  Button,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function NavListRendedrer({
  listData,
  selectedObject,
  setSelectedObject,
  displayKey,
  id,
}) {
  const [searchString, setSearchString] = useState("");

  const itemRender = () => {
    const navigationList = listData
      ?.filter((listItem) => listItem[displayKey].includes(searchString))
      ?.map((listItem, index) => {
        return (
          <ListItem
            sx={{
              display: "block",
              fontSize: "x-small",
            }}
            key={listItem[id]}
            divider
            selected={listItem[id] === selectedObject[id]}
          >
            <ListItemButton
              sx={{
                overflow: "hidden",
              }}
              onClick={() => {
                setSelectedObject(listItem);
              }}
            >
              <Typography>
                <b
                  style={{
                    fontSize: "15px",
                    color: "#009fee",
                    fontWeight: "400",
                  }}
                >
                  {listItem[displayKey]}
                </b>
              </Typography>
            </ListItemButton>
          </ListItem>
        );
      });
    return navigationList;
  };
  return (
    <>
      <input onChange={(e) => setSearchString(e.target.value)} />
      <List
        sx={{
          overflowY: "auto",
          height: "70vh",
          width: "100%",
        }}
      >
        {
          //   testcases?.length > 0 ? (
          itemRender()
          //   ) : (
          //     <div style={{ textAlign: "center" }}>
          //       <Typography>No Testsets Found</Typography>
          //       <br />
          //       <Button
          //         variant="contained"
          //         onClick={() => {
          //           navigate("/Testset/Create");
          //         }}
          //       >
          //         Create Testset
          //       </Button>
          //     </div>
          //   )
        }
      </List>
    </>
  );
}
