import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

export default function Toolbar() {
  const location = useLocation();
  const { auth } = useAuth();
  console.log(location.state);
  const pageData = location?.state;
  const syncPage = () => {
    axios
      .post(`/qfservice/webpages/LaunchJNLPToCreateWebPage`, null, {
        params: {
          user_id: auth?.userId,
          module_id: pageData?.module_id,
          web_page_url: pageData?.page_url,
          user_name: auth?.info?.firstName,
          mobile_os: ``,
        },
      })
      .then((resp) => {
        console.log(resp?.data);
        axios
          .postForm(`http://127.0.0.1:8765/connect`, {
            data: resp?.data?.info,
            jarName: "webpage",
          })
          .then((resp) => {
            console.log(resp);
          });
      });
  };

  const saveDiffElement = () => {
    console.log("first");
    const saveDiffElementData = {
      web_page_id: "5067",

      mapped_elements: [
        {
          old_element_id: 3365537,

          new_element_id: 11478,
        },
      ],

      unmapped_old_elements: [],

      initial_check: false,
    };
    axios
      .post(`/qfservice/SyncDiffElements`, saveDiffElementData)
      .then((resp) => {
        console.log(resp);
      });
  };

  return (
    <Stack direction="row" gap={1} justifyContent="flex-end" mb={5}>
      <Button variant="contained" onClick={syncPage}>
        Sync Page
      </Button>
      <Button variant="contained" onClick={saveDiffElement}>
        Save Diff Elements
      </Button>
    </Stack>
  );
}
