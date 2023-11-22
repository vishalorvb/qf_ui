import {
    Link
  } from "@mui/material";


  function RunningTestcase(props) {
    let { tc_name } = props;
    return (
        <Link href="#">{tc_name}</Link>
        );
  }

  export default RunningTestcase;