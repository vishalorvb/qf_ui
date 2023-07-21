import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useHead from "../../hooks/useHead";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";

function UpdateTestcasesOrder() {
  const { setHeader } = useHead();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    location?.state?.moduleType === 1
      ? axios
          .get(
            `/qfservice/GetTestcasesInTestset?testset_id=${location?.state?.testsetId}`
          )
          .then((resp) => {
            const data = resp?.data?.data;
            setData(data);
          })
      : axios
          .get(
            `/qfservice/webtestset/getTestcasesInWebTestset?testset_id=${location?.state?.testsetId}`
          )
          .then((resp) => {
            const data = resp?.data?.info;
            setData(data);
          });

    setHeader((ps) => {
      return {
        ...ps,
        name: "Update Testcase Order",
        plusButton: false,
      };
    });
  }, []);

  const updateTestcasesOrder = () => {
    location?.state?.moduleType === 1
      ? axios
          .post(`/qfservice/UpdateTestcasesOrderInTestset`, {
            testset_id: location?.state?.testsetId,
            testcases_list: order.map((testcase) => {
              return { testcase_id: testcase };
            }),
          })
          .then((resp) => {
            console.log(resp);
          })
      : axios
          .post(`/qfservice/webtestset/updateWebTestcasesOrderInTestset`, {
            testset_id: location?.state?.testsetId,
            web_testcases_list: order.map((testcase) => {
              return { testcase_id: testcase };
            }),
          })
          .then((resp) => {
            console.log(resp);
          });
  };

  useEffect(() => {
    updateTestcasesOrder();
  }, [order]);

  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "name",
        header: "Testcase Name",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
    ],
    []
    //end
  );
  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableColumnActions={false}
        initialState={{ showGlobalFilter: true, density: "compact" }}
        enableToolbarInternalActions={false}
        muiTableBodyRowProps={{ hover: false }}
        enableRowOrdering
        enableSorting={false}
        muiTableBodyRowDragHandleProps={({ table }) => ({
          onDragEnd: () => {
            const { draggingRow, hoveredRow } = table.getState();
            if (hoveredRow && draggingRow) {
              data.splice(
                hoveredRow.index,
                0,
                data.splice(draggingRow.index, 1)[0]
              );
              setData([...data]);
              setOrder(() => {
                return data.map((d) => d.testcase_id);
              });
              console.log(data);
              setOpen(true);
              setTimeout(() => {
                setOpen(false);
                // navigate("/testset");
              }, 3000);
            }
          },
        })}
        muiTablePaperProps={{
          elevation: 0,
        }}
      />
      <SnackbarNotify
        open={open}
        close={setOpen}
        msg="Testcases Order Changed successfully"
        severity="success"
      />
    </>
  );
}

export default UpdateTestcasesOrder;
