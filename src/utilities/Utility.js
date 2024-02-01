import axios from "axios";




export function dateFormater(originalTime) {
    const date = new Date(originalTime);
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Extract date components
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Format the time in AM/PM format
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

    // Create the formatted string
    const formattedTime = `${month}-${day}-${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;

    return formattedTime;

}

let ACCESS_TOKEN = localStorage.getItem("token")

export const Axios = axios.create({

    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
});



export const AxiosWithoutHeader = axios.create()