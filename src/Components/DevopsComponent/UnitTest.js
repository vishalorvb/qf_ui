import Table from "../../CustomComponent/Table";
export default function UnitTest() {
  const applicationColumns = [
    {
      field: "#",
      headerName: "#",
      flex: 1,
      sortable: false,
      renderCell: (index) => index.id,
    },
    {
      field: "testcase",
      headerName: "Testcase",
      flex: 3,
      sortable: false,
    },
    {
      field: "Result",
      headerName: "Result",
      flex: 2,
      sortable: false,
    },
  ];

  const applications = [
    {
      id: 1,
      name: "Application 1",
      description: "Description 1",
    },
    {
      id: 2,
      name: "Application 2",
      description: "Description 2",
    },
    {
      id: 3,
      name: "Application 3",
      description: "Description 3",
    },
    {
      id: 4,
      name: "Application 4",
      description: "Description 4",
    },
  ];
  return (
    <>
      <Table rows={applications} columns={applicationColumns} />
    </>
  );
}
