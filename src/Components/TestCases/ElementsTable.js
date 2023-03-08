import React, { useEffect, useState } from 'react'
import Table from '../../CustomComponent/Table'
import { getElementsList } from '../../Services/TestCaseService'
function ElementsTable({screenId}) {

let [elements,setElements] = useState([])

const columns = [
    {
      field: "name",
      headerName: "Field Name",
      flex: 1,
      sortable: false,
      align: "left",
    },
    {
      field: "tag_name",
      headerName: "Tag Name",
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
]
useEffect(() => {
getElementsList(setElements,screenId)
}, [])

  return (
    <div>
      <Table
        rows={elements}
        columns={columns}
        hidefooter={true}
        getRowId={(row) => row.element_id}
      ></Table>
    </div>
  )
}

export default ElementsTable
