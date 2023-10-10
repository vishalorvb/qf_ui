

function Scheduler({ date, setDate }) {

    let minutes = Array.from({ length: 59 }, (_, index) => index + 1)
    let hours = Array.from({ length: 23 }, (_, index) => index + 1)
    let days = Array.from({ length: 31 }, (_, index) => index + 1)
    let months = [{ val: 1, name: "January" }, { val: 2, name: "Feb" }, { val: 3, name: "Mar" }, { val: 4, name: "Apr" }, { val: 5, name: "May" }, { val: 6, name: "Jun" }, { val: 7, name: "Jul" }, { val: 8, name: "Aug" }, { val: 9, name: "Sep" }, { val: 10, name: "Oct" }, { val: 11, name: "Nov" }, { val: 12, name: "Dec" }]

    let weekday = [{ val: 1, name: "Sun" }, { val: 2, name: "Mon" }, { val: 3, name: "Tue" }, { val: 4, name: "Wed" }, { val: 5, name: "Thu" }, { val: 6, name: "Fri" }, { val: 7, name: "Sat" }]



    return (
        <div>
            <div className="applist">
                <ul>
                    {minutes.map(min => <li key={min}
                        onClick={e => console.log(min)}
                    >{min}</li>)}
                </ul>
            </div>

            <div className="applist">
                <ul>
                    {hours.map(min => <li key={min}
                        onClick={e => console.log(min)}
                    >{min}</li>)}
                </ul>
            </div>

            <div className="applist">
                <ul>
                    {days.map(min => <li key={min}
                        onClick={e => console.log(min)}
                    >{min}</li>)}
                </ul>
            </div>

            <div className="applist">
                <ul>
                    {months.map(min => <li key={min.val}
                        onClick={e => console.log(min.name)}
                    >{min.name}</li>)}
                </ul>
            </div>

            <div className="applist">
                <ul>
                    {weekday.map(min => <li key={min.val}
                        onClick={e => console.log(min.name)}
                    >{min.name}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default Scheduler
