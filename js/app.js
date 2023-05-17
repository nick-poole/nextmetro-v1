import { getLineName, getLineColorClass, getLineLogo } from "./maps.js";
import { fetchStationTimes } from "./times.js";
export { headers };
const apiKey = "";
const headers = {
    api_key: apiKey,
};

// Interval ID
let refreshIntervalId;

function handleStationSelection() {
    var selectedStationCode = document.getElementById("stationSelect").value;
    var selectedStationName = document.getElementById("stationSelect").selectedOptions[0].text;
    console.log("Selected station:", selectedStationName);
    console.log("Station code: ", selectedStationCode);

    // ===== Last/First Train Times =====
    fetchStationTimes(selectedStationCode);

    // Clear the previous interval
    clearInterval(refreshIntervalId);

    // Fetch train predictions and update train information
    refreshTrainInfo(selectedStationCode);

    // Sets new interval for refresh
    refreshIntervalId = setInterval(() => {
        console.log("REFRESH");
        refreshTrainInfo(selectedStationCode);
    }, 15000);
    // ===== REAL-TIME REFRESH ===
}

// ===== Event Listener on #stationSelect
const stationSelect = document.getElementById("stationSelect");
stationSelect.addEventListener("change", handleStationSelection);

// ==========  Next Train Predictions ========== //
async function refreshTrainInfo(selectedStationCode) {
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
        // Loop through the first three train predictions or the available trains
        for (let i = 0; i < Math.min(3, trains.length); i++) {
            const train = trains[i]; // Get the train prediction

            // Create HTML elements to display train information for each train
            // ===== Line Logo =====
            const lineLogoDiv = document.createElement("div");
            lineLogoDiv.classList.add("line__logo-div");

            const lineLogo = document.createElement("img");
            lineLogo.src = getLineLogo(train.Line);
            lineLogo.alt = `${train.Line} Line Logo`;
            lineLogo.classList.add("line-logo");
            lineLogo.classList.add("line-logo");

            // ===== Title =====
            const trainInfoTitle = document.createElement("p");
            trainInfoTitle.classList.add("text-xl", "font-semibold", "mb-2");
            trainInfoTitle.textContent = "Next Metro";

            // Train Line
            const trainName = document.createElement("p");
            trainName.classList.add("text-lg");
            trainName.textContent = `Train ${i + 1} Line: `;

            // Text that appears in line color
            const lineColorSpan = document.createElement("span");
            lineColorSpan.classList.add(getLineColorClass(train.Line));
            lineColorSpan.textContent = getLineName(train.Line);
            trainName.appendChild(lineColorSpan);

            // ===== Destination =====
            const destination = document.createElement("p");
            destination.classList.add("text-lg");
            destination.textContent = `Destination: ${train.DestinationName}`;

            // ===== # of Cars =====
            const trainCars = document.createElement("p");
            trainCars.classList.add("text-lg");
            trainCars.textContent = `Number of cars: ${train.Car}`;

            // ===== Arrival Time =====
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
            trainInfo.appendChild(lineLogoDiv);
            lineLogoDiv.appendChild(lineLogo);
            trainInfo.appendChild(trainInfoTitle);
            trainInfo.appendChild(trainName);
            trainInfo.appendChild(destination);
            trainInfo.appendChild(trainCars);
            trainInfo.appendChild(arrivalTime);
        }
    } else {
        // If no train predictions are available, display a message
        const noTrainMessage = document.createElement("p");
        noTrainMessage.classList.add("text-lg");
        noTrainMessage.textContent = "No train predictions available.";

        trainInfo.appendChild(noTrainMessage);
    }
}

// function updateTrainInfo(trains) {
//     const trainInfo = document.getElementById("trainInfo");
//     // Clear existing train information
//     trainInfo.innerHTML = "";
//     // Check if there are any train predictions
//     if (trains.length > 0) {
//         // Loop through the first three train predictions or the available trains
//         for (let i = 0; i < Math.min(3, trains.length); i++) {
//         const train = trains[i]; // Get the train prediction

//         // Create HTML elements to display train information

//         // ===== Line Logo =====
//         const lineLogoDiv = document.createElement("div");
//         lineLogoDiv.classList.add("line__logo-div");

//         const lineLogo = document.createElement("img");
//         lineLogo.src = getLineLogo(train.Line);
//         lineLogo.alt = `${train.Line} Line Logo`;
//         lineLogo.classList.add("line-logo");
//         lineLogo.classList.add("line-logo");

//         // ===== Title =====
//         const trainInfoTitle = document.createElement("p");
//         trainInfoTitle.classList.add("text-xl", "font-semibold", "mb-2");
//         trainInfoTitle.textContent = "Next Train Information";

//         // Train Line
//         const trainName = document.createElement("p");
//         trainName.classList.add("text-lg");
//         trainName.textContent = "Line: ";

//         // Text that appears in line color
//         const lineColorSpan = document.createElement("span");
//         lineColorSpan.classList.add(getLineColorClass(train.Line));
//         lineColorSpan.textContent = getLineName(train.Line);
//         trainName.appendChild(lineColorSpan);

//         // ===== Destination =====
//         const destination = document.createElement("p");
//         destination.classList.add("text-lg");
//         destination.textContent = `Destination: ${train.DestinationName}`;

//         // ===== # of Cars =====
//         const trainCars = document.createElement("p");
//         trainCars.classList.add("text-lg");
//         trainCars.textContent = `Number of cars: ${train.Car}`;

//         // ===== Arrival Time =====
//         const arrivalTime = document.createElement("p");
//         arrivalTime.classList.add("text-lg");

//         if (train.Min.toLowerCase() === "brd") {
//             arrivalTime.textContent = "Arrival Time: BOARDING";
//         } else if (train.Min.toLowerCase() === "arr") {
//             arrivalTime.textContent = "Arrival Time: ARRIVING";
//         } else if (train.Min < 2) {
//             arrivalTime.textContent = `Arrival Time: ${train.Min} min`;
//         } else {
//             arrivalTime.textContent = `Arrival Time: ${train.Min} mins`;
//         }

//         // append logo-div then logo inside logo div
//         trainInfo.appendChild(lineLogoDiv);
//         lineLogoDiv.appendChild(lineLogo);

//         // Append train information elements to the trainInfoDiv
//         trainInfo.appendChild(trainName);
//         trainInfo.appendChild(destination);
//         trainInfo.appendChild(trainCars);
//         trainInfo.appendChild(arrivalTime);
//     } else {
//         // If no train predictions are available, display a message
//         const noTrainMessage = document.createElement("p");
//         noTrainMessage.classList.add("text-lg");
//         noTrainMessage.textContent = "No train predictions available.";

//         trainInfo.appendChild(noTrainMessage);
//     }
// }
