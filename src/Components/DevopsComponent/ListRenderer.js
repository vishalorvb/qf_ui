import { Divider, Grid, List, ListItem, ListItemButton } from "@mui/material";
import ListDetails from "./ListDetails";
import MuiListItemText from "@mui/material/ListItemText";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import ApiIcon from "@mui/icons-material/Api";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import { useState } from "react";
import { Box } from "@mui/system";

const response = {
  error: null,
  message: null,
  data: {
    pipelinehisotory: null,
    pipelinereport: null,
    sonarcubereport: null,
    webresult: [
      {
        id: 0,
        testcase_name: "TC_registationin - dataset_rs",
        testset_name: null,
        browser_type: "chrome",
        report_Id: 0,
        datasetdata: [
          {
            report_detail_id: 0,
            result_type: "info",
            text: "Browser: chrome",
            screenshot: null,
            result_lable_type: null,
          },
          {
            report_detail_id: 0,
            result_type: "info",
            text: "URL: http://ec2-54-187-47-159.us-west-2.compute.amazonaws.com:8081/",
            screenshot: null,
            result_lable_type: null,
          },
          {
            report_detail_id: 0,
            result_type: "pass",
            text: "Entered Name * input: ranga",
            screenshot: null,
            result_lable_type: null,
          },
          {
            report_detail_id: 0,
            result_type: "pass",
            text: "Entered Email * input: battagiriranga@gmail.com",
            screenshot: null,
            result_lable_type: null,
          },
          {
            report_detail_id: 0,
            result_type: "pass",
            text: "Entered Phone * input: 8885425848",
            screenshot: null,
            result_lable_type: null,
          },
          {
            report_detail_id: 0,
            result_type: "pass",
            text: "Entered Subject * input: pending details",
            screenshot: null,
            result_lable_type: null,
          },
          {
            report_detail_id: 0,
            result_type: "pass",
            text: "Entered Message * input: request for lang change",
            screenshot: null,
            result_lable_type: null,
          },
          {
            report_detail_id: 0,
            result_type: "pass",
            text: "Clicked on SEND",
            screenshot: null,
            result_lable_type: null,
          },
        ],
        start_time: 1674564168405,
        end_time: 1674564173101,
        execution_time: 4696,
        passCount: 6,
        failCount: 0,
        status: "pass",
        start_time_st: null,
        end_time_st: null,
        execution_time_st: null,
        pass_percentage: 0,
        fail_percentage: 0,
      },
      {
        id: 0,
        testcase_name: "TC_Registration - Ds1",
        testset_name: null,
        browser_type: "chrome",
        report_Id: 0,
        datasetdata: [
          {
            report_detail_id: 0,
            result_type: "info",
            text: "Browser: chrome",
            screenshot: null,
            result_lable_type: null,
          },
          {
            report_detail_id: 0,
            result_type: "info",
            text: "URL: http://ec2-54-187-47-159.us-west-2.compute.amazonaws.com:8081/",
            screenshot: null,
            result_lable_type: null,
          },
          {
            report_detail_id: 0,
            result_type: "pass",
            text: "Entered Name * input: Rajasekhar",
            screenshot: null,
            result_lable_type: null,
          },
          {
            report_detail_id: 0,
            result_type: "pass",
            text: "Entered Email * input: Rajasekhar@gmail.com",
            screenshot: null,
            result_lable_type: null,
          },
          {
            report_detail_id: 0,
            result_type: "pass",
            text: "Entered Phone * input: 9393171993",
            screenshot: null,
            result_lable_type: null,
          },
          {
            report_detail_id: 0,
            result_type: "pass",
            text: "Entered Subject * input: subject",
            screenshot: null,
            result_lable_type: null,
          },
          {
            report_detail_id: 0,
            result_type: "pass",
            text: "Entered Message * input: I'm interested to take demo. Please contact",
            screenshot: null,
            result_lable_type: null,
          },
          {
            report_detail_id: 0,
            result_type: "pass",
            text: ' Validation:</br>SEND is displayed<div class="row mb-3"><div class="col-md-3">\r\n        <a href="data:image/png;base64,data:image/png;base64,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" data-featherlight="image"><span class="badge badge-gradient-primary">SEND</span></a>\r\n    </div></div>',
            screenshot: null,
            result_lable_type: null,
          },
        ],
        start_time: 1674564168405,
        end_time: 1674564173101,
        execution_time: 4696,
        passCount: 6,
        failCount: 0,
        status: "pass",
        start_time_st: null,
        end_time_st: null,
        execution_time_st: null,
        pass_percentage: 0,
        fail_percentage: 0,
      },
    ],
    apiresult: null,
    unittestset: null,
  },
  data1: null,
};

export default function ListRenderer() {
  const [selectedItem, setSelectedItem] = useState([]);
  const itemRender = (rawList) => {
    const navigationList = rawList.map((apiItem, index) => {
      return (
        <ListItem
          sx={{
            display: "block",
          }}
          key={apiItem.testcase_name}
          divider
        >
          <ListItemButton onClick={() => setSelectedItem(apiItem.datasetdata)}>
            <MuiListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
              }}
            >
              <ApiIcon />
            </MuiListItemIcon>

            <MuiListItemText primary={apiItem.testcase_name} />
            <MuiListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
              }}
            >
              <LibraryAddCheckOutlinedIcon />
            </MuiListItemIcon>
          </ListItemButton>
        </ListItem>
      );
    });
    return navigationList;
  };

  return (
    <Grid container justifyContent="flex-end    ">
      <Grid item>
        <List>{itemRender(response.data.webresult)}</List>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item md={8}>
        <ListDetails selectedItemData={selectedItem} />
      </Grid>
    </Grid>
  );
}
