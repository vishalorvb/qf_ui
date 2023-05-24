import { Divider, IconButton, List, ListItem, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import { useEffect } from "react";
import { memo, useCallback, useState } from "react";
import ElementsDetails from "../../CustomComponent/ElementsDetails.js";
import { Box } from "./Box.js";
import { Dustbin } from "./Dustbin.js";
import Toolbar from "./Toolbar.js";
import SyncIcon from "@mui/icons-material/Sync";
import { useLocation } from "react-router-dom";
const Container = memo(function Container() {
  const location = useLocation();
  console.log(location.state);
  const [dustbins, setDustbins] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [droppedBoxNames, setDroppedBoxNames] = useState([]);
  const [dustbinSearchString, setDustbinSearchString] = useState("");
  const [boxSearchString, setBoxSearchString] = useState("");
  let [elementid, setElementid] = useState(0);
  let [popup, setPopup] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [isDiffElement, setIsDiffElement] = useState(false);
  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1;
  }
  const handleDrop = useCallback(
    (index, item) => {
      const { elementData } = item;
      console.log(elementData);
      setDroppedBoxNames((prevIds) => {
        return elementData ? [...prevIds, elementData?.element_id] : prevIds;
      });
      setDustbins((prevDustbin) => {
        const dustbinArray = [...prevDustbin];
        dustbinArray[index].lastDroppedItem = elementData;
        return dustbinArray;
      });
      console.log(item);
    },
    [droppedBoxNames, dustbins]
  );
  const clearSelected = useCallback(
    (index, item) => {
      console.log(index);
      const { name } = item;
      setDroppedBoxNames((prevNames) => {
        const i = prevNames.indexOf(name);
        prevNames.splice(i, 1);
        return prevNames;
      });
      setDustbins((prevDustbin) => {
        const dustbinArray = [...prevDustbin];
        dustbinArray[index].lastDroppedItem = null;
        return dustbinArray;
      });
    },
    [droppedBoxNames, dustbins]
  );

  const filter = (e, setString) => {
    setString(e.target.value);
  };

  const getElementsData = () => {
    axios
      .post(
        `http://10.11.12.243:8083/qfservice/check-diff-page/${location?.state?.web_page_id}`
      )
      .then((resp) => {
        const currentElements = resp?.data?.data?.currentElements;
        const newElements = resp?.data?.data?.newElements;
        const pageId = resp?.data?.data?.page_id;
        setDustbins(() => {
          return currentElements?.map((element) => {
            return { elementData: element, lastDroppedItem: null };
          });
        });

        setBoxes(() => {
          return newElements?.map((element) => {
            return { elementData: element, type: "all" };
          });
        });
      });
  };

  useEffect(() => {
    getElementsData();
  }, []);

  useEffect(() => {
    elementid !== 0 && setPopup(true);
  }, [elementid]);
  return (
    <>
      <Toolbar dustbins={dustbins} />
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div>
          <Stack direction="row" gap={2} alignItems="center">
            <strong>Current_Elements</strong>
            <TextField
              size="small"
              fullWidth
              sx={{ marginBottom: "5px" }}
              onChange={(e) => filter(e, setDustbinSearchString)}
            />
          </Stack>
          <div
            style={{
              overflow: "hidden",
              clear: "both",
              height: "45rem",
              overflowY: "scroll",
            }}
          >
            <List>
              {dustbins
                ?.filter(({ lastDroppedItem, elementData }) => {
                  return (
                    lastDroppedItem?.name?.includes(dustbinSearchString) ||
                    elementData?.name?.includes(dustbinSearchString)
                  );
                })
                ?.map(({ lastDroppedItem, elementData }, index) => (
                  <ListItem>
                    <Dustbin
                      elementData={elementData}
                      lastDroppedItem={lastDroppedItem}
                      onDrop={(item) => handleDrop(index, item)}
                      clearSelected={(item) => clearSelected(index, item)}
                      key={index}
                      setElementid={setElementid}
                      setIsDiffElement={setIsDiffElement}
                    />
                  </ListItem>
                ))}
            </List>
          </div>
        </div>
        <Divider orientation="vertical" flexItem />
        <div>
          <Stack direction="row" gap={2} alignItems="center">
            <IconButton onClick={getElementsData}>
              <SyncIcon />
            </IconButton>

            <strong>New_Elements</strong>

            <TextField
              size="small"
              fullWidth
              sx={{ marginBottom: "5px" }}
              onChange={(e) => filter(e, setBoxSearchString)}
            />
          </Stack>

          <div
            style={{
              overflow: "hidden",
              clear: "both",
              height: "45rem",
              overflowY: "scroll",
            }}
          >
            <List>
              {boxes
                ?.filter(
                  ({ elementData }) => !isDropped(elementData?.element_id)
                )
                ?.filter(({ elementData }) => {
                  return elementData?.name?.includes(boxSearchString);
                })
                ?.map(({ elementData, type }, index) => (
                  <ListItem>
                    <Box
                      elementData={elementData}
                      type={type}
                      key={index}
                      setElementid={setElementid}
                      setIsDiffElement={setIsDiffElement}
                    />
                  </ListItem>
                ))}
            </List>
          </div>
        </div>
      </div>
      {/* ..................................................................................................... */}
      {popup && (
        <ElementsDetails
          ElementId={elementid}
          setPopup={setPopup}
          setUpdated={setUpdated}
          isDiffElement={isDiffElement}
        ></ElementsDetails>
      )}
    </>
  );
});

export default Container;
