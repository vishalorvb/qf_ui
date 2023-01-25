import Table from "../../CustomComponent/Table";
export default function CodeQuality() {
  const applicationColumns = [
    {
      field: "#",
      headerName: "#",
      flex: 1,
      sortable: false,
      renderCell: (index) => index.id,
    },
    {
      field: "message",
      headerName: "Message",
      flex: 4,
      sortable: false,
    },
    {
      field: "component",
      headerName: "Component",
      flex: 4,
      sortable: false,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      sortable: false,
    },
    {
      field: "Severity",
      headerName: "Severity",
      flex: 1,
      sortable: false,
    },
    {
      field: "Type",
      headerName: "Type",
      flex: 2,
      sortable: false,
    },
    {
      field: "Rule",
      headerName: "Rule",
      flex: 3,
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
