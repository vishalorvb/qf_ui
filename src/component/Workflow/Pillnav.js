import { useState } from "react";
import { Paper, Button } from "@mui/material";

export default function Pillnav(props) {
  const { workflowModules, selectClickedElement } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [filterString, setFilterString] = useState("");

  const handleListItemClick = (index, mod) => {
    setSelectedIndex(index);
    selectClickedElement(mod);
    console.log("index");
  };

  return (
    <Paper elevation={0}>
      <div className="tableSearch my-2">
        <input type="text" className="inputSearch" placeholder="Search"
          onChange={(e) => setFilterString(e.target.value.toLowerCase())}
        ></input>
      </div>
      <div className="pillgroup">
        {workflowModules
          ?.filter((mod) => {
            return (
              (mod.name !== undefined &&
                mod.name.toLowerCase().includes(filterString)) ||
              (mod.testset_name !== undefined &&
                mod.testset_name.toLowerCase().includes(filterString)) ||
              (mod.module_name !== undefined &&
                mod.module_name.toLowerCase().includes(filterString))
            );
          })
          ?.map((mod, index) => (
            <Button
              variant={selectedIndex === index ? "contained" : "outlined"}
              mod={mod}
              onClick={(e) => handleListItemClick(index, mod)}
              key={index}
            >
              {mod.name === undefined
                ? mod.testset_name === undefined
                  ? mod.module_name
                  : mod.testset_name
                : mod.name}
            </Button>
          ))}
      </div>
    </Paper>
  );
}
