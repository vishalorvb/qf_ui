import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ReportList from "../Components/Reports/ReportList";
// import pagegenerator from "../Components/Reports/HTMLgenrator";

export default function ViewReport() {
  const location = useLocation();
  const id = location.state.id;
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    reportDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reportDetails() {
    axios.get(`/qfreportservice/reportResult/${id}`).then((resp) => {
      setReportData(resp.data.info);
    });
  }

  return (
    <>
      <ReportList result={reportData} />
      {/* {pagegenerator(reportData)} */}
    </>
  );
}
