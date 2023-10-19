import { Button, Grid, Stack } from "@mui/material";
import { memo } from "react";
import { useDrag } from "react-dnd";
const style = {
  backgroundColor: "#F4F4F4",
  cursor: "move",
  width: "25rem",
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
export const Box = memo(function Box({
  elementData,
  type,
  setElementid,
  setIsDiffElement,
}) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { elementData },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0 : 1,
      }),
    }),
    [elementData, type]
  );
  return (
    <div ref={drag} style={{ ...style, opacity }} data-testid="box">
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
                setIsDiffElement(true);
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
    </div>
  );
});
