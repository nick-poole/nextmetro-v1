import { randomHeroBackground, getLineName, getLineLogo } from "./maps.js";
import { fetchStationTimes } from "./times.js";
export { headers };
const apiKey = "173992fa5e684b19b2018c9a497db626";
const headers = {
    api_key: apiKey,
};

// Random Hero Image
window.addEventListener("DOMContentLoaded", function () {
    const heroSection = document.getElementById("heroSection");
    const backgrounds = [
        "images/chris-grafton.jpg",
        "images/yuvraj-singh.jpg",
        "images/tatiana-rodriguez.jpg",
        "images/sara-cottle.jpg",
        "images/rosie-kerr.jpg",
        "images/julian-lozano.jpg",
        "images/matthew-bornhorst.jpg",
        "images/andrew-wagner.jpg",
        "images/sam-jotham-sutharson.jpg",
        "images/maria-oswalt.jpg",
        "images/maria-oswalt-2.jpg",
        "images/island-cinematics.jpg",
        "images/island-cinematics-2.jpg",
        "images/eleven-photographs.jpg",
        "images/eleven-photographs-2.jpg",
    ];
    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    heroSection.style.backgroundImage = `url(${randomBackground})`;
});

// Interval ID
let refreshIntervalId;

function handleStationSelection() {
    var selectedStationCode = document.getElementById("stationSelect").value;
    var selectedStationName = document.getElementById("stationSelect").selectedOptions[0].text;
    console.log("Selected station:", selectedStationName);
    console.log("Station code: ", selectedStationCode);

    // Transitions Hero Background
    randomHeroBackground();

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
    trainInfo.classList = "flex flex-col justify-between";

    // Check if there are any train predictions
    if (trains.length > 0) {
        // Loop through the first three train predictions or the available trains
        for (let i = 0; i < Math.min(3, trains.length); i++) {
            const train = trains[i]; // Get the train prediction

            // Create a new div for each train
            const trainDiv = document.createElement("div");
            trainDiv.classList.add(
                "train",
                "w-96",
                "my-2",
                "flex",
                "flex-col",
                "items-center",
                "bg-gray-200",
                "rounded-lg",
                "shadow-md"
            );

            // Create HTML elements to display train information for each train
            // ===== Line Logo =====
            const lineLogoDiv = document.createElement("div");
            lineLogoDiv.classList.add("line__logo-div", "mt-4");

            const lineLogo = document.createElement("img");
            lineLogo.src = getLineLogo(train.Line);
            lineLogo.alt = `${train.Line} Line Logo`;
            lineLogo.classList.add("line-logo");
            lineLogo.classList.add("line-logo");

            // ===== Title =====
            const trainInfoTitle = document.createElement("h1");
            trainInfoTitle.classList.add("text-xl", "font-semibold", "mt-4", "mb-2");
            trainInfoTitle.textContent = "Next Metro";

            // Train Line
            const lineSpan = document.createElement("span");
            lineSpan.textContent = "Line:";

            const lineTicker = document.createElement("div");
            lineTicker.classList.add(
                "text-lg",
                "w-fit",
                "px-3",
                "rounded-full",
                "text-orange-500",
                "bg-black",
                "my-4"
            );

            // Text that appears in line color
            const lineColorSpan = document.createElement("span");
            lineColorSpan.textContent = getLineName(train.Line);
            lineTicker.appendChild(lineColorSpan);

            // ===== Destination =====
            const destinationSpan = document.createElement("span");
            destinationSpan.textContent = "Destination:";

            const destinationTicker = document.createElement("div");
            destinationTicker.classList.add(
                "text-lg",
                "w-fit",
                "px-3",
                "rounded-full",
                "text-orange-500",
                "bg-black",
                "my-4"
            );
            destinationTicker.textContent = train.DestinationName;

            // ===== # of Cars =====
            const carSpan = document.createElement("span");
            carSpan.textContent = "# of cars:";

            const carTicker = document.createElement("div");
            carTicker.classList.add(
                "text-lg",
                "w-fit",
                "px-3",
                "rounded-full",
                "text-orange-500",
                "bg-black",
                "my-4"
            );
            carTicker.textContent = train.Car;

            // ===== Arrival Time =====
            const arrivalSpan = document.createElement("span");
            arrivalSpan.textContent = "Arrival Time";

            const arrivalTime = document.createElement("div");
            arrivalTime.classList.add(
                "text-lg",
                "w-fit",
                "px-3",
                "rounded-full",
                "text-orange-500",
                "bg-black",
                "my-4"
            );

            if (train.Min.toLowerCase() === "brd") {
                arrivalTime.textContent = "BOARDING";
            } else if (train.Min.toLowerCase() === "arr") {
                arrivalTime.textContent = "ARRIVING";
            } else if (train.Min < 2) {
                arrivalTime.textContent = `ETA: ${train.Min} min`;
            } else {
                arrivalTime.textContent = `ETA: ${train.Min} mins`;
            }

            // Append train information elements to the trainDiv
            trainDiv.appendChild(lineLogoDiv);
            lineLogoDiv.appendChild(lineLogo);
            trainDiv.appendChild(trainInfoTitle);
            trainDiv.appendChild(lineSpan);
            trainDiv.appendChild(lineTicker);
            trainDiv.appendChild(destinationSpan);
            trainDiv.appendChild(destinationTicker);
            trainDiv.appendChild(carSpan);
            trainDiv.appendChild(carTicker);
            trainDiv.appendChild(arrivalSpan);
            trainDiv.appendChild(arrivalTime);

            // Append the trainDiv to the trainInfo div
            trainInfo.appendChild(trainDiv);
        }
    } else {
        // If no train predictions are available, display a message
        const noTrainMessage = document.createElement("p");
        noTrainMessage.classList.add("text-lg");
        noTrainMessage.textContent = "No train predictions available.";

        trainInfo.appendChild(noTrainMessage);
    }
}
