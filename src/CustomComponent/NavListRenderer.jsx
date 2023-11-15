import {
  Button,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";

export default function NavListRendedrer({ listData }) {
  const itemRender = () => {
    const navigationList = listData.map((apiItem, index) => {
      return (
        <ListItem
          sx={{
            display: "block",
            fontSize: "x-small",
          }}
          key={index}
          divider
          // selected={selectedItem === apiItem?.testset_id}
        >
          <ListItemButton
            sx={{
              overflow: "hidden",
            }}
            onClick={() => {
              // setSelectedItem(apiItem?.testset_id);
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
                {apiItem.name}
              </b>
            </Typography>
          </ListItemButton>
        </ListItem>
      );
    });
    return navigationList;
  };
  return (
    <List
      sx={{
        overflowY: "auto",
        height: "70vh",
        width: "100%",
      }}
    >
      {
        //   testcases.length > 0 ? (
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
  );
}
