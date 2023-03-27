import React, { useEffect, useState } from 'react'
import GrowingTable from '../../../CustomComponent/GrowingTable'

function ApiHeader() {

    let displayorder = ["key", "value", "description"]
    let [headerData, setHeaderData] = useState([])

    return (
        <div>
            <GrowingTable
                header={["Key", "Value", "Description"]}
                TableData={setHeaderData}
                keypair={["key", "value", "description"]}
                // prefilled={headerData?.slice(0, -1)}
                order={displayorder}
            ></GrowingTable>
        </div>
    )
}

export default ApiHeader
