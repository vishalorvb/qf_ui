import React, { useEffect, useState } from 'react'
import GrowingTable from '../../../CustomComponent/GrowingTable'
import { setGetData } from './ApiDatasetData'

function ApiHeader({ApiDetails}) {
    console.log(ApiDetails)
    console.log(ApiDetails?.headersList)
    let displayorder = ["key", "value", "description"]
    function haldleTableData(data){
        setGetData(ApiDetails.api_id,"headersList",data.slice(0, -1))
    }

    return (
        <div>
            <GrowingTable
                header={["Key", "Value", "Description"]}
                TableData={haldleTableData}
                keypair={["key", "value", "description"]}
                order={displayorder}
                prefilled={ApiDetails?.headersList}
            ></GrowingTable>
        </div>
    )
}

export default ApiHeader
