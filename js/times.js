import { headers } from "./app.js";

export { fetchStationTimes };
// ========== Station Times ========== //
async function fetchStationTimes(selectedStationCode) {
    const url = `https://api.wmata.com/Rail.svc/json/jStationTimes?StationCode=${selectedStationCode}`;
    const response = await fetch(url, { headers });
    try {
        if (response.ok) {
            const data = await response.json();
            // Process the data and display the station information
            console.log(data);
            updateStationTimes(data); // Call the function to update the UI with station information
        } else {
            // Handle the error if the response status is not in the 200-299 range
            console.error("Error:", response.status, response.statusText);
        }
    } catch (error) {
        // Handle any network errors
        console.error("Error:", error);
    }
}

async function updateStationTimes(stationTimes) {
    const stationTimesDiv = document.getElementById("stationTimes");
    stationTimesDiv.innerHTML = ""; // Clear existing station times

    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    const currentDay = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ][currentDayIndex];

    const stationTime = stationTimes.StationTimes[0]; // Assuming there is only one station time object

    const lastTrainToday = stationTime[currentDay]?.LastTrains[0];

    if (lastTrainToday) {
        const lastTrainDestinationCode = lastTrainToday.DestinationStation;
        const lastTrainDestinationName = await fetchStationName(lastTrainDestinationCode);

        const lastTrainElement = document.createElement("p");
        lastTrainElement.classList.add("text-lg");
        lastTrainElement.classList.add("font-semibold");
        lastTrainElement.textContent = `Last Train (${currentDay})`;
        const destinationElement = document.createElement("p");
        destinationElement.textContent = `Destination: ${lastTrainDestinationName}`;
        const arrivalTimeElement = document.createElement("p");
        arrivalTimeElement.textContent = `Arrival Time: ${lastTrainToday.Time}`;

        stationTimesDiv.appendChild(lastTrainElement);
        stationTimesDiv.appendChild(destinationElement);
        stationTimesDiv.appendChild(arrivalTimeElement);
    }

    const nextDayIndex = currentDayIndex < 6 ? currentDayIndex + 1 : 0;
    const nextDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][
        nextDayIndex
    ];

    const nextDayStationTimes = stationTime[nextDay];
    if (nextDayStationTimes) {
        const firstTrainTomorrow = nextDayStationTimes.FirstTrains[0];
        const firstTrainDestinationCode = firstTrainTomorrow.DestinationStation;
        const firstTrainDestinationName = await fetchStationName(firstTrainDestinationCode);

        const firstTrainElement = document.createElement("p");
        firstTrainElement.classList.add("text-lg");
        firstTrainElement.classList.add("font-semibold");
        firstTrainElement.textContent = `First Train (Tomorrow)`;
        const destinationElement = document.createElement("p");
        destinationElement.textContent = `Destination: ${firstTrainDestinationName}`;
        const arrivalTimeElement = document.createElement("p");
        arrivalTimeElement.textContent = `Arrival Time: ${firstTrainTomorrow.Time}`;

        stationTimesDiv.appendChild(firstTrainElement);
        stationTimesDiv.appendChild(destinationElement);
        stationTimesDiv.appendChild(arrivalTimeElement);
    }

    if (!lastTrainToday && !nextDayStationTimes) {
        const noTimesMessage = document.createElement("p");
        noTimesMessage.classList.add("text-lg");
        noTimesMessage.textContent = `No station times available for ${currentDay}.`;

        stationTimesDiv.appendChild(noTimesMessage);
    }
}

async function fetchStationName(stationCode) {
    const url = `https://api.wmata.com/Rail.svc/json/jStationInfo?StationCode=${stationCode}`;
    const response = await fetch(url, { headers });
    if (response.ok) {
        const data = await response.json();
        const stationName = data.Name;
        return stationName;
    } else {
        console.error("Failed to fetch station name:", response.status, response.statusText);
        return ""; // Return an empty string if the station name couldn't be fetched
    }
}

// function updateStationInfo(stationData) {
//     // Extract the desired information from the stationData object and update the UI
//     // Example: Display the station name
//     const stationName = stationData.Name;
//     console.log("Station Name:", stationName);
//     // Update the UI elements with the station information
// }
