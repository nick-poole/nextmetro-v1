import { headers } from "./app.js";
import { stationNameMap } from "./maps.js";

export { fetchStationTimes };

// ========== Station Times ========== //

async function fetchStationTimes(selectedStationCode) {
    const url = `https://api.wmata.com/Rail.svc/json/jStationTimes?StationCode=${selectedStationCode}`;
    const response = await fetch(url, { headers });

    try {
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            updateStationTimes(data);
        } else {
            console.error("Error:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function updateStationTimes(stationTimes) {
    const stationTimesDiv = document.getElementById("stationTimes");
    stationTimesDiv.innerHTML = "";

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

    const stationTime = stationTimes.StationTimes[0];

    const lastTrainToday = stationTime[currentDay]?.LastTrains[0];

    if (lastTrainToday) {
        const lastTrainDestinationCode = lastTrainToday.DestinationStation;
        const lastTrainDestinationName = stationNameMap(lastTrainDestinationCode) || "Unknown";

        const lastTrainElement = document.createElement("p");
        lastTrainElement.classList.add("text-lg");
        lastTrainElement.classList.add("font-semibold");
        lastTrainElement.textContent = `Last Train (${currentDay})`;
        stationTimesDiv.appendChild(lastTrainElement);

        const destinationElement = document.createElement("p");
        destinationElement.textContent = `Destination: ${lastTrainDestinationName}`;
        stationTimesDiv.appendChild(destinationElement);

        const arrivalTimeElement = document.createElement("p");
        arrivalTimeElement.textContent = `Arrival Time: ${lastTrainToday.Time}`;
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
        const firstTrainDestinationName = stationNameMap(firstTrainDestinationCode) || "Unknown";

        const firstTrainElement = document.createElement("p");
        firstTrainElement.classList.add("text-lg");
        firstTrainElement.classList.add("font-semibold");
        firstTrainElement.textContent = `First Train (Tomorrow)`;
        stationTimesDiv.appendChild(firstTrainElement);

        const destinationElement = document.createElement("p");
        destinationElement.textContent = `Destination: ${firstTrainDestinationName}`;
        stationTimesDiv.appendChild(destinationElement);

        const arrivalTimeElement = document.createElement("p");
        arrivalTimeElement.textContent = `Arrival Time: ${firstTrainTomorrow.Time}`;
        stationTimesDiv.appendChild(arrivalTimeElement);
    }

    if (!lastTrainToday && !nextDayStationTimes) {
        const noTimesMessage = document.createElement("p");
        noTimesMessage.classList.add("text-lg");
        noTimesMessage.textContent = `No station times available for ${currentDay}.`;

        stationTimesDiv.appendChild(noTimesMessage);
    }
}
