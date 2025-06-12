# NextMetro.live

NextMetro.live is a web app designed to provide real-time train information for the Washington Metro system (WMATA). With NextMetro.live, users can easily select a train station and instantly view the details of the next train arrival at their chosen station.

## Features

___

- **Real-time Train Information**: Get up-to-date details about the next train arrival at any WMATA station.
- **Station Selection**: Easily select a station from the list of available WMATA stations.
- **User-Friendly Interface**: Intuitive and user-friendly interface for seamless navigation and a smooth user experience.
- **Responsive Design**: Accessible on various devices, including desktops, tablets, and mobile phones.
- **Dynamic and Interactive**: Utilizes the WMATA API to provide live and dynamic train information.

## Technologies Used

- WMATA API: Integration with the WMATA API to retrieve real-time train data.
- HTML/CSS/TailwindCSS: Markup and styling for the web app.
- JavaScript: Programming language for implementing app logic and interactivity.

___

## Installation and Setup

1. Clone the repository: `git clone https://github.com/your-username/nextmetro-live.git`
2. Navigate to the project directory: `cd nextmetro-live`
3. Install dependencies: `npm install`
4. Start the development server: `npm run serve`
5. Open the app in your browser at `http://localhost:8080`

## Commit History

___

### 6/11/25

- Repo changed to nextmetro-v1

### 9/10/23

- FIX(main): Resolved trainDiv spacing issue by rebuilding tailwind with reset css for margin and padding excluded.

### 9/7/23

- FEAT(main): Alter color scheme to Black/Orange and adjust border radius

- FIX(main): Reconfigured dependencies for most recent Tailwind version(3.3.3)

### 5/17/23

- INTRODUCED: Favicon to root and added links to header.

- FEAT: Integrated Next3 capabilities and cross-referenced station names with station code values for accurate reporting
   >Provided more comprehensive and up-to-date information by enhancing the `updateTrainInfo` function to retrieve the next three train arrivals from the Next Trains API.
   >
   >Fixed  value errors on `#stationSelect` list by cross-referencing the station names with their corresponding station code values to ensure accurate reporting. Corrections made to reflect up-to-date station names. Included Potomac Yard station and station code.
   >
   >Added additional station selects to handle transfer stations such as Metro Center, L'Enfant Plaza, Gallery Place, and Fort Totten. This ensures that the correct station code is fetched upon selection.

### 5/16/23

- FEAT: Added real-time train information refresh
   >This enhancement provides users with up-to-date train predictions without the need to manually refresh the page.
   >
   >Introduces the functionality to fetch and display real-time train information for the selected station every 15 seconds.The handleStationSelection function now clears the previous interval, fetches the train predictions, and updates the train information.

- STYLE: Train line logos to train information display
   >Adds functionality to display train line logos in the train information section.
   >
   >The `getLineLogo` function is imported from `maps.js` and used in the `updateTrainInfo` function in `app.js`. The logos are dynamically fetched based on the train line code and displayed alongside the train information. This enhances the visual representation of train predictions and improves the overall user experience.

- INTEGRATED: stationNameMap and Export to time.js
   >Integrates the stationNameMap(stationCode) function into the `maps.js` module to reduce reliance on an additional fetch request.
   >
   > The stationNameMap function provides a mapping between station codes and their corresponding names.
   >
   > By incorporating this function into `maps.js` and exporting into `times.js`, we can directly retrieve station names without making an additional network request.This integration improves efficiency and reduces latency when accessing station information within the `time.js` module.

### 5/15/23

- FEAT: Introduced async function for fetching station times
   >Station Select now displays First/Last Train Time of Arrival
   >
   >Split JavaScript files into `time.js` and `maps.js`
   >
   >Moved station time-related code to time.js
   >
   >Separated mapping-related code to maps.js
   >
   >Refactor `updateStationTimes()` function to display train information in separate `<p>` tags
   >
   >Changed background-color to `#fff` on `.text-silver` color class
   >
   >Replaced `handleStationSelection` from index.html `onchange=""` with event listener in `app.js`

### 5/14/23

- REFACTOR: Train information display and add line color styling.
   >Updated the train information display to show the line color instead of "Train: Line Abbreviation"
   >
   > Implemented logic to display the line color in its respective color using Tailwind CSS utility classes
   >
   > Changed the background color of the trainInfo div to a darker shade `bg-gray-300` for orange/Yellow visibility
   >
   > Modified the `updateTrainInfo()` function to include the line color styling and display the train information accordingly
   >
   > Updated the `handleStationSelection()` function to log the selected station name and code
   >
   > Fixed the issue with the selected station code variable name in the `fetchTrainPredictions()` function
   >

- ADD: Train car information to train display
   >Updated the `updateTrainInfo()` function to include the number of train cars in the displayed train information.
   >
   >Modified the HTML template to include a new paragraph element showing the number of cars.
   >
   >Refactored the logic to use template literals for a cleaner and more readable code.
   >
   >Tested and verified the functionality with sample data.

- REPLACE: Initial placeholder message in trainInfo div
   > Adds a placeholder message in the trainInfo div to indicate to the user that they need to select a station in order to view real-time train information.

- REFACTOR: Train arrival time display and handle 'BOARDING' and 'ARRIVING' cases.
   >If the train's arrival time is "brd", it now shows "BOARDING" instead of "brd mins". Similarly, if the arrival time is "arr", it displays "ARRIVING" instead of "arr mins".
   >
   >For arrival times less than 2 minutes, we now show the value followed by "min" (e.g., "1 min"). For other arrival times, we display the value followed by "mins" (e.g., "5 mins").

- CREATE: Station list and integrate API using Fetch
   >Added a comprehensive list of WMATA stations in alphabetical order
   >
   >Created a select dropdown menu with the list of stations
   >
   >Implemented an event handler to trigger functions on station selection
   >
   >Utilized the Fetch API to retrieve train prediction data from the WMATA API
   >
   >Processed the response data and displayed relevant train information
   >
   >Updated the train information dynamically based on the selected station

### 5/13/23

- INSTALL: Tailwindcss && CONFIGURE: Base layout for application

### 5/12/23

- Init Commit

___

## Action Items

1. Insure Potomac Yard station is include once operational on 05/19/23

## Contributions

Contributions to NextMetro.live are welcome! If you find any bugs, have feature suggestions, or would like to contribute enhancements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
