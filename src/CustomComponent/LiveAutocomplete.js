import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import useHead from "../hooks/useHead";

export default function LiveAutocomplete({
  selectedOptions,
  setSelectedOptions,
}) {
  const { globalProject } = useHead();
  const [options, setOptions] = useState([]);
  const previousController = useRef();

  const getData = (searchTerm) => {
    if (previousController.current) {
      previousController.current.abort();
    }
    const controller = new AbortController();
    const signal = controller.signal;
    previousController.current = controller;
    axios
      .post(
        `/Biservice/bireport/gettestsets?project_id=${globalProject?.project_id}&reqst=` +
          searchTerm,
        {
          signal,
        }
      )
      .then((resp) => {
        console.log(resp?.data?.info);
        const updatedOptions = resp?.data?.info;
        setOptions(updatedOptions);
      });
  };

  useEffect(() => {
    setSelectedOptions([]);
  }, [globalProject]);

  const onInputChange = (event, value, reason) => {
    if (value) {
      getData(value);
    } else {
      setOptions([]);
    }
  };

  return (
    <Autocomplete
      value={selectedOptions}
      multiple
      options={options}
      onInputChange={onInputChange}
      getOptionLabel={(option) => option.testset_name}
      onChange={(event, value) => {
        console.log(value);
        setSelectedOptions(value);
      }}
      renderInput={(params) => (
        <TextField {...params} size="small" variant="outlined" />
      )}
    />
  );
}
