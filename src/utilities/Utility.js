



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

    console.log(formattedTime); // Output: "Sep-29-2023 5:40:52 AM"
    return formattedTime;

}