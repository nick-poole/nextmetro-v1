import { getLineName, getLineColorClass } from "./maps.js";
import { fetchStationTimes } from "./times.js";
export { headers };
const apiKey = "";
const headers = {
    api_key: apiKey,
};

function handleStationSelection() {
    var selectedStationCode = document.getElementById("stationSelect").value;
    var selectedStationName = document.getElementById("stationSelect").selectedOptions[0].text;
    console.log("Selected station:", selectedStationName);
    console.log("Station code: ", selectedStationCode);
    fetchStationTimes(selectedStationCode);
    fetchTrainPredictions(selectedStationCode);
}

// ===== Event Listener on #stationSelect
const stationSelect = document.getElementById("stationSelect");
stationSelect.addEventListener("change", handleStationSelection);

// ==========  Train Predictions ========== //
async function fetchTrainPredictions(selectedStationCode) {
    const url = `https://api.wmata.com/StationPrediction.svc/json/GetPrediction/${selectedStationCode}`;
    const response = await fetch(url, { headers });
    try {
        if (response.ok) {
            const data = await response.json();
            // Process the data and display the train predictions
            console.log(data);
            updateTrainInfo(data.Trains); // Pass data.Trains as an argument
        } else {
            // Handle the error if the response status is not in the 200-299 range
            console.error("Error:", response.status, response.statusText);
        }
    } catch (error) {
        // Handle any network errors
        console.error("Error:", error);
    }
}

function updateTrainInfo(trains) {
    const trainInfo = document.getElementById("trainInfo");
    // Clear existing train information
    trainInfo.innerHTML = "";
    // Check if there are any train predictions
    if (trains.length > 0) {
        const train = trains[0]; // Get the first train prediction

        // Create HTML elements to display train information
        const trainInfoTitle = document.createElement("p");
        trainInfoTitle.classList.add("text-xl", "font-semibold", "mb-2");
        trainInfoTitle.textContent = "Next Train Information";

        const trainName = document.createElement("p");
        trainName.classList.add("text-lg");

        const lineColorSpan = document.createElement("span");
        lineColorSpan.classList.add(getLineColorClass(train.Line));
        lineColorSpan.textContent = getLineName(train.Line);

        trainName.textContent = "Line: ";
        trainName.appendChild(lineColorSpan);

        const destination = document.createElement("p");
        destination.classList.add("text-lg");
        destination.textContent = `Destination: ${train.DestinationName}`;

        const trainCars = document.createElement("p");
        trainCars.classList.add("text-lg");
        trainCars.textContent = `Number of cars: ${train.Car}`;

        const arrivalTime = document.createElement("p");
        arrivalTime.classList.add("text-lg");

        if (train.Min.toLowerCase() === "brd") {
            arrivalTime.textContent = "Arrival Time: BOARDING";
        } else if (train.Min.toLowerCase() === "arr") {
            arrivalTime.textContent = "Arrival Time: ARRIVING";
        } else if (train.Min < 2) {
            arrivalTime.textContent = `Arrival Time: ${train.Min} min`;
        } else {
            arrivalTime.textContent = `Arrival Time: ${train.Min} mins`;
        }

        // Append train information elements to the trainInfoDiv
        trainInfo.appendChild(trainName);
        trainInfo.appendChild(destination);
        trainInfo.appendChild(trainCars);
        trainInfo.appendChild(arrivalTime);
    } else {
        // If no train predictions are available, display a message
        const noTrainMessage = document.createElement("p");
        noTrainMessage.classList.add("text-lg");
        noTrainMessage.textContent = "No train predictions available.";

        trainInfo.appendChild(noTrainMessage);
    }
}
