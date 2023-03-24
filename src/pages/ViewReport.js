import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from '../api/axios';
import { useLocation } from "react-router-dom";
import ReportList from '../Components/Reports/ReportList';


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
