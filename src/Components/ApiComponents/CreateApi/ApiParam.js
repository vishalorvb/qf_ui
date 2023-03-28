import React, { useEffect, useState } from 'react'
import GrowingTable from '../../../CustomComponent/GrowingTable'
import { setGetData } from './ApiDatasetData'





function ApiParam({ApiDetails}) {

    console.log(ApiDetails)
    let displayorder = ["param_key", "param_value", "param_desc"]
    let [paramData, setParamData] = useState([])
    useEffect(() => {
        if (paramData.length > 0) {
            setGetData(ApiDetails.api_id, "paramsList", paramData.slice(0, -1))
        }

    }, [paramData])
    return (
        <div>
            <GrowingTable
                header={["Key", "Value", "Description"]}
                TableData={setParamData}
                keypair={["param_key", "param_value", "param_desc"]}
                order={displayorder}
                prefilled={ApiDetails.paramsList}
            ></GrowingTable>
        </div>
    )
}

export default ApiParam
