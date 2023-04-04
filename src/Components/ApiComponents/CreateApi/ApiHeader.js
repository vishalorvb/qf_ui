import React, { useEffect, useState } from 'react'
import GrowingTable from '../../../CustomComponent/GrowingTable'
import { setGetData } from './ApiDatasetData'

function ApiHeader({ApiDetails}) {
    console.log(ApiDetails)
    console.log(ApiDetails?.headersList)
    let displayorder = ["header_key", "header_value", "header_desc"]
    function haldleTableData(data){
        setGetData(ApiDetails.api_id,"headersList",data.slice(0, -1))
    }

    return (
        <div>
            <GrowingTable
                header={["Key", "Value", "Description"]}
                TableData={haldleTableData}
                keypair={["header_key", "header_value", "header_desc"]}
                order={displayorder}
                prefilled={ApiDetails?.headersList}
            ></GrowingTable>
        </div>
    )
}

export default ApiHeader
