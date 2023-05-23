import { Button, Grid, Stack } from "@mui/material";
import { memo } from "react";
import { useDrop } from "react-dnd";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const style = {
  //   height: "5rem",
  width: "27rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "black",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
  border: "1px solid #cfd5e5",
  borderRadius: "4px",
};
const childstyle = {
  //   height: "5rem",
  width: "25rem",
  marginTop: "1rem",
  color: "black",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
  border: "1px solid #cfd5e5",
  borderRadius: "4px",
  backgroundColor: "white",
};
export const Dustbin = memo(function Dustbin({
  elementData,
  clearSelected,
  lastDroppedItem,
  onDrop,
  setElementid,
  setIsDiffElement,
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: lastDroppedItem === null ? "all" : "",
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = isOver && canDrop;
  let backgroundColor = "#F4F4F4";
  if (isActive) {
    backgroundColor = "#D1D1D1";
  } else if (canDrop) {
    backgroundColor = "#E8EAEA";
  }
  return (
    <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dustbin">
      <Grid container>
        <Grid item md={4}>
          <Stack gap={1}>
            <strong>Field Name</strong>
            <span>{elementData?.name}</span>
          </Stack>
        </Grid>
        <Grid item md={4}>
          <Stack>
            <Button
              variant="outlined"
              onClick={() => {
                setElementid(elementData?.element_id);
                setIsDiffElement(false);
              }}
            >
              Locator
            </Button>
          </Stack>
        </Grid>
        <Grid item md={4}>
          <Stack gap={1}>
            <strong>Field Type</strong>
            <span>{elementData?.input_type}</span>
          </Stack>
        </Grid>
      </Grid>
      {lastDroppedItem && (
        <>
          <div style={childstyle}>
            <Stack direction="row" justifyContent="flex-end">
              <DeleteOutlineIcon
                sx={{ color: "red" }}
                onClick={clearSelected}
              />
            </Stack>
            <div style={{ padding: "0 1rem 1rem 1rem" }}>
              <Grid container>
                <Grid item md={4}>
                  <Stack gap={1}>
                    <strong>Field Name</strong>
                    <span>{lastDroppedItem?.name}</span>
                  </Stack>
                </Grid>
                <Grid item md={4}>
                  <Stack>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setElementid(lastDroppedItem?.element_id);
                        setIsDiffElement(false);
                      }}
                    >
                      Locator
                    </Button>
                  </Stack>
                </Grid>
                <Grid item md={4}>
                  <Stack gap={1}>
                    <strong>Field Type</strong>
                    <span>{lastDroppedItem?.input_type}</span>
                  </Stack>
                </Grid>
              </Grid>
            </div>
          </div>
        </>
      )}
    </div>
  );
});
