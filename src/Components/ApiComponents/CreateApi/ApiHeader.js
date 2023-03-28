import React, { useEffect, useState } from 'react'
import GrowingTable from '../../../CustomComponent/GrowingTable'
import { setGetData } from './ApiDatasetData'

function ApiHeader({ApiDetails}) {
    console.log(ApiDetails)
    console.log(ApiDetails.headersList?.slice(0, -1))
    let displayorder = ["key", "value", "description"]
    let [headerData, setHeaderData] = useState([])

    useEffect(() => {
        // console.log(headerData)
        if(headerData.length>0){
            setGetData(ApiDetails.api_id,"headersList",headerData.slice(0, -1))
        }

    }, [headerData])

    return (
        <div>
            <GrowingTable
                header={["Key", "Value", "Description"]}
                TableData={setHeaderData}
                keypair={["key", "value", "description"]}
                order={displayorder}
                prefilled={ApiDetails.headersList}
            ></GrowingTable>
        </div>
    )
}

export default ApiHeader
