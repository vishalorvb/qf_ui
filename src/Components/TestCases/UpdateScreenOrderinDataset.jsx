//import React, { useMemo } from "react";
//import MaterialReactTable from "material-react-table";
//import { useEffect, useState } from "react";
//import { useLocation, useNavigate } from "react-router-dom";
//import axios from "axios";
//import useHead from "../../hooks/useHead";

//export default function UpdateScreenOrderinDataset() {
//  const { setHeader } = useHead();
//  const location = useLocation();
//  const [data, setData] = useState([]);
//  const [order, setOrder] = useState([]);

//  useEffect(() => {
//    axios
//      .get(
//        `${qfservice}/qfservice/webtestcase/getScreens?testcase_id=${location?.state?.testcaseId}`
//      )
//      .then((resp) => {
//        const data = resp?.data?.info;
//        setData(data);
//      });

//    setHeader((ps) => {
//      return {
//        ...ps,
//        name: "Screen Elements",
//        plusButton: false,
//      };
//    });
//  }, []);

//  const updateScreenOrder = () => {
//    axios
//      .post(`${qfservice}/qfservice/webtestcase/updateOrderOfScreensInTestcase`, {
//        testcaseId: location?.state?.testcaseId,
//        screen_ids: order,
//      })
//      .then((resp) => {
//        console.log(resp);
//      });
//  };

//  useEffect(() => {
//    updateScreenOrder();
//  }, [order]);

//  const columns = useMemo(
//    //column definitions...
//    () => [
//      {
//        accessorKey: "screeninfo.name",
//        header: "Field Name",
//      },
//      {
//        accessorKey: "screeninfo.description",
//        header: "Description",
//      },
//    ],
//    []
//    //end
//  );

//  return (
//    <>
//      <MaterialReactTable
//        columns={columns}
//        data={data}
//        enableColumnActions={false}
//        initialState={{ showGlobalFilter: true, density: "compact" }}
//        enableToolbarInternalActions={false}
//        muiTableBodyRowProps={{ hover: false }}
//        enableRowOrdering
//        enableSorting={false}
//        muiTableBodyRowDragHandleProps={({ table }) => ({
//          onDragEnd: () => {
//            const { draggingRow, hoveredRow } = table.getState();
//            if (hoveredRow && draggingRow) {
//              data.splice(
//                hoveredRow.index,
//                0,
//                data.splice(draggingRow.index, 1)[0]
//              );
//              setData([...data]);
//              setOrder(() => {
//                return data.map((d) => d.screen_id);
//              });
//              console.log(data);
//            }
//          },
//        })}
//        muiTablePaperProps={{
//          elevation: 0,
//        }}
//      />
//    </>
//  );
//}
