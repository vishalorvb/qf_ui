import { Button } from "@mui/material";
import { useState } from "react";

function Scheduler({ date, setDate }) {
  let minutes = Array.from({ length: 59 }, (_, index) => index + 1);
  let hours = Array.from({ length: 23 }, (_, index) => index + 1);
  let days = Array.from({ length: 31 }, (_, index) => index + 1);
  let months = [
    { val: 1, name: "January" },
    { val: 2, name: "Feb" },
    { val: 3, name: "Mar" },
    { val: 4, name: "Apr" },
    { val: 5, name: "May" },
    { val: 6, name: "Jun" },
    { val: 7, name: "Jul" },
    { val: 8, name: "Aug" },
    { val: 9, name: "Sep" },
    { val: 10, name: "Oct" },
    { val: 11, name: "Nov" },
    { val: 12, name: "Dec" },
  ];

  let weekday = [
    { val: 1, name: "Sun" },
    { val: 2, name: "Mon" },
    { val: 3, name: "Tue" },
    { val: 4, name: "Wed" },
    { val: 5, name: "Thu" },
    { val: 6, name: "Fri" },
    { val: 7, name: "Sat" },
  ];

  let [min, setMin] = useState("*");
  let [hrs, setHrs] = useState("*");
  let [day, setDay] = useState("*");
  let [mon, setMon] = useState("*");
  let [week, setWeek] = useState("*");

  return (
    <div className="scheduler">
      <div className="dropdown">
        <label for="">Min</label>
        <select onChange={(e) => setMin(e.target.value)}>
          <option value="*">0</option>
          {minutes?.map((min) => (
            <option value={min}>{min}</option>
          ))}
        </select>
      </div>

      <div className="dropdown">
        <label for="">Hr</label>
        <select onChange={(e) => setHrs(e.target.value)}>
          <option value="*">0</option>
          {hours?.map((min) => (
            <option value={min}>{min}</option>
          ))}
        </select>
      </div>

      <div className="dropdown">
        <label for="">Day</label>
        <select onChange={(e) => setDay(e.target.value)}>
          <option value="*">0</option>
          {days?.map((min) => (
            <option value={min}>{min}</option>
          ))}
        </select>
      </div>

      <div className="dropdown">
        <label for="">Month</label>
        <select onChange={(e) => setMon(e.target.value)}>
          <option value="*">0</option>
          {months?.map((min) => (
            <option value={min.val}>{min.name}</option>
          ))}
        </select>
      </div>
      <div className="dropdown">
        <label for="">week</label>
        <select onChange={(e) => setWeek(e.target.value)}>
          <option value="*">0</option>
          {weekday?.map((min) => (
            <option value={min.val}>{min.name}</option>
          ))}
        </select>
      </div>
      <div className="dropdown" style={{ marginTop: "21px" }}>
        <Button
          variant="contained"
          onClick={(e) => {
            setDate(`${min} ${hrs} ${day} ${mon} ${week}`);
          }}
        >
          Schedule
        </Button>
      </div>
    </div>
  );
}

export default Scheduler;
