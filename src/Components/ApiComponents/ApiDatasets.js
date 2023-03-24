import React, { useEffect, useState } from 'react'
import Table from '../../CustomComponent/Table'
import { getApiDatasets } from '../../Services/ApiService'
import APiListDrawer from './APiListDrawer'


function ApiDatasets() {

    let [datasets, setDatasets] = useState([])



    let col = [
        {
            field: "dataset_name_in_testcase",
            headerName: "Dataset Name",
            flex: 3,
            sortable: false,
            align: "left",
        },
    ]
    useEffect(() => {
        getApiDatasets(setDatasets, 149)
    }, [])

    return (
        <div>
            <div>
                <APiListDrawer></APiListDrawer>
            </div>
            <div>
                <Table
                    rows={datasets}
                    columns={col}
                    hidefooter={true}
                    getRowId={(row) => row.testcase_dataset_id}
                ></Table>
            </div>
        </div>
    )
}

export default ApiDatasets
