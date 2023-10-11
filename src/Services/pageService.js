import {
  authservice,
  biservice,
  dashboard,
  qfservice,
  report,
  userservice,
} from "../Environment";

import axios from "axios";

export function getPages(callback, applicationId) {
  console.log("get pages called");
  console.log(applicationId);
  axios
    .get(
      `${qfservice}/qfservice/webpages/getWebPagesList?module_id=${applicationId}`
    )
    .then((res) => {
      console.log(res.data);
      if (res.data.info != null) {
        callback(res.data.info);
      }
    });
}

export function getElementsDetails(callback, element_id) {
  axios
    .get(
      `${qfservice}/qfservice/webpages/getWebPageElementPathsInfo?element_id=${element_id}&is_diff_page_element=false`
    )
    .then((res) => {
      callback(res.data.info);
    });
}

export function getScreen(callback, appId) {
  console.log("calling get screen");
  axios
    .get(`${qfservice}/qfservice/screen/getScreensList?module_id=${appId}`)
    .then((res) => {
      if (res.data.info != null) {
        callback(res.data.info);
      }
    });
}
