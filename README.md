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

- Vue.js: Front-end JavaScript framework for building interactive user interfaces.
- WMATA API: Integration with the WMATA API to retrieve real-time train data.
- HTML/CSS: Markup and styling for the web app.
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

### 5/14/23

- ADD: Train car information to train display
   >Updated the `updateTrainInfo()` function to include the number of train cars in the displayed train information.
   >
   >Modified the HTML template to include a new paragraph element showing the number of cars.
   >
   >Refactored the logic to use template literals for a cleaner and more readable code.
   >
   >Tested and verified the functionality with sample data.

- REFACTOR: Train arrival time display and handle 'BOARDING' and 'ARRIVING' cases.

```text
If the train's arrival time is "brd", it now shows "BOARDING" instead of "brd mins". Similarly, if the arrival time is "arr", it displays "ARRIVING" instead of "arr mins". For arrival times less than 2 minutes, we now show the value followed by "min" (e.g., "1 min"). For other arrival times, we display the value followed by "mins" (e.g., "5 mins"). 
```

- COMPLETE: Station list and integrate API using Fetch
- Added a comprehensive list of WMATA stations in alphabetical order
- Ensured the inclusion of the Potomac Yard station in the list
- Created a select dropdown menu with the list of stations
- Implemented an event handler to trigger functions on station selection
- Utilized the Fetch API to retrieve train prediction data from the WMATA API
- Processed the response data and displayed relevant train information
- Updated the train information dynamically based on the selected station

### 5/13/23

- INSTALL: Tailwindcss && CONFIGURE: Base layout for application

### 5/12/23

- Init Commit

___

## Contributions

Contributions to NextMetro.live are welcome! If you find any bugs, have feature suggestions, or would like to contribute enhancements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
