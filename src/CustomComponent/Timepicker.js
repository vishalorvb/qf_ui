import React from 'react'

function Timepicker({ date, setDate }) {
    let style = {
        height: "25px"
    }
    return (
        <div>
            <input style={style} type="time"
                defaultValue={date}
                onChange={e => {
                    setDate(e.target.value)
                }} />
        </div>
    )
}

export default Timepicker
