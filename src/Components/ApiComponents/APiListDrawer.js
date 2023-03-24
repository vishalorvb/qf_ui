import { Button } from '@mui/material'
import React, { useState } from 'react'
import SmartDrawer from '../../CustomComponent/SmartDrawer'


function APiListDrawer() {


    let [showApi, setShowApi] = useState(false)


    return (
        <div>
            <button onClick={e=>setShowApi(!showApi)}>click me</button>  
            <SmartDrawer
                open={showApi}
                close={setShowApi}
            >
                <h2>This is drawer</h2>
            </SmartDrawer>
        </div>
    )
}

export default APiListDrawer
