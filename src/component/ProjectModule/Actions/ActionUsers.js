import Table from '../../CustomComponent/Table';
import React, { useEffect, useState } from 'react'
import { getUserFromProject } from '../Api';


function ActionUsers(props) {



let[rows,setRows]=useState([])

    let columns = [
        {
            headerName: 'S.no',
            field: 'sno',
            valueGetter: (index) => index.api.getRowIndex(index.row.id) + 1,
            flex: 1,
            align: 'center',
            sortable: false,
        },
        {
            headerName: 'Name',
            renderCell: (param) => param.row.first_name + " " + param.row.last_name,
            flex: 1,
            align: 'left',
            sortable: false,
        },
        {
            headerName: 'Email',
            field: 'email',
            flex: 6,
            align: 'left',
            sortable: false,
        },
    ]


   

useEffect(() => {
getUserFromProject(setRows,props.projectId)
}, [props])



    return (
        <div>
           
            <Table
                rows={rows}
                columns={columns}
            >
            </Table>
        </div>
    )
}

export default ActionUsers
