import { Autocomplete,MenuItem } from "@mui/material";
import Select from '@mui/material/Select';
import { useState } from "react";

export default function AutocompleteField () {

    const classStyle = {
        height:"2em",
        onfocus:{
            backgroundColor:'red'
        }
    }

    const[age,setAge] = useState(10)

    return(
       <input ></input>
    )
}