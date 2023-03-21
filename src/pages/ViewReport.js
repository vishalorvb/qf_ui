import { Button, Divider, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from '../api/axios';
import SnackbarNotify from '../CustomComponent/SnackbarNotify';
import { useLocation } from "react-router-dom";
import { Stack } from "@mui/system";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import Card from '@mui/material/Card';
import { ConnectedTvOutlined } from '@mui/icons-material';
import ListRenderer from '../Components/DevopsComponent/ListRenderer';
import ReportList from '../Components/Reports/ReportList';
// import { useLocation} from "react-router-dom";

export default function ViewReport() {
  const location = useLocation();
const id = location.state.id;
const [reportData,setReportData] = useState([])
useEffect(() => {
  reportDetails(id);
}, []);

  function reportDetails(id) {
  axios.get(`/qfreportservice/reportResult/${id}`).then(res => {

    setReportData(res.data.info)
})
}

  return <>
  <ReportList result={reportData}/>
  </>;
}
