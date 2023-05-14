function handleStationSelection() {
    var selectedStation = document.getElementById("stationSelect").value;
    console.log("Selected station:", selectedStation);
    fetchTrainPredictions(selectedStation);
    //updateTrainInfo();
}

async function fetchTrainPredictions(stationCode) {
    const url = `https://api.wmata.com/StationPrediction.svc/json/GetPrediction/${stationCode}`;
    const apiKey = "";
    const headers = {
        api_key: apiKey,
    };

    try {
        const response = await fetch(url, { headers });
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
        trainInfoTitle.classList.add("text-xl");
        trainInfoTitle.classList.add("font-semibold");
        trainInfoTitle.classList.add("mb-2");
        trainInfoTitle.textContent = "Next Train Information";

        const trainName = document.createElement("p");
        trainName.classList.add("text-lg");
        trainName.textContent = "Train: " + train.Line;

        const destination = document.createElement("p");
        destination.classList.add("text-lg");
        destination.textContent = "Destination: " + train.DestinationName;

        const arrivalTime = document.createElement("p");
        arrivalTime.classList.add("text-lg");
        arrivalTime.textContent = "Arrival Time: " + train.Min + " min";

        // Append train information elements to the trainInfoDiv
        trainInfo.appendChild(trainName);
        trainInfo.appendChild(destination);
        trainInfo.appendChild(arrivalTime);
    } else {
        // If no train predictions are available, display a message
        const noTrainMessage = document.createElement("p");
        noTrainMessage.classList.add("text-lg");
        noTrainMessage.textContent = "No train predictions available.";

        trainInfo.appendChild(noTrainMessage);
    }
}
