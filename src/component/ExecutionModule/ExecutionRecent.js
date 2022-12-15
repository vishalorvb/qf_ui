import Table from "../Table";

export default function ExecutionRecent() {

    const columns = [
  { field: 'id', headerName: 'S.no.', flex: 1 },
  {
    field: 'ProjectName',
    headerName: 'Project Name',
    flex: 3,
    sortable:false
  },
  {
    field: 'AutomationType',
    headerName: 'Automation Type',
    flex: 3,
    sortable:false
    
  },
  {
    field: 'ExecutionEnv',
    headerName: 'Execution Env',
    flex: 3,
    sortable:false
  },
  {
    field: 'TestingEnv',
    headerName: 'Testing Env',
    flex: 3,
    sortable:false
  },
  {
    field: 'ExecutionPerc',
    headerName: 'Execution %',
    flex: 3,
    sortable:false
  },
  ];

  const rows = [
    { id: 1, ProjectName: 'Snow', AutomationType: 'Jon', ExecutionEnv: 35 , TestingEnv: 'tnvenv', ExecutionPerc: 'abhi' },
    { id: 2, ProjectName: 'Lannister', AutomationType: 'Cersei', ExecutionEnv: 42 , TestingEnv: 'tnvenv', ExecutionPerc: 'abhi' },
    { id: 3, ProjectName: 'Lannister', AutomationType: 'Jaime', ExecutionEnv: 45 , TestingEnv: 'tnvenv', ExecutionPerc: 'abhi' },
    { id: 4, ProjectName: 'Stark', AutomationType: 'Arya', ExecutionEnv: 16 , TestingEnv: 'tnvenv', ExecutionPerc: 'abhi' },
    { id: 5, ProjectName: 'Targaryen', AutomationType: 'Daenerys', ExecutionEnv: null , TestingEnv: 'tnvenv', ExecutionPerc: 'abhi' },
    { id: 6, ProjectName: 'Melisandre', AutomationType: null, ExecutionEnv: 150 , TestingEnv: 'tnvenv', ExecutionPerc: 'abhi' },
    { id: 7, ProjectName: 'Clifford', AutomationType: 'Ferrara', ExecutionEnv: 44 , TestingEnv: 'tnvenv', ExecutionPerc: 'abhi' },
    { id: 8, ProjectName: 'Frances', AutomationType: 'Rossini', ExecutionEnv: 36 , TestingEnv: 'tnvenv', ExecutionPerc: 'abhi' },
    { id: 9, ProjectName: 'Roxie', AutomationType: 'Harvey', ExecutionEnv: 65 , TestingEnv: 'tnvenv', ExecutionPerc: 'abhi' },
    { id: 10, ProjectName: 'Roxie', AutomationType: 'Harvey', ExecutionEnv: 65 , TestingEnv: 'tnvenv', ExecutionPerc: 'abhi' },
  ];


  return(
    <Table columns={columns} rows={rows} hidefooter={true} />      
  )
}