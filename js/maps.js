// Export the mapping functions
export { getLineName, getLineColorClass, stationNameMap, getLineLogo };

function getLineName(lineCode) {
    switch (lineCode) {
        case "RD":
            return "RED";
        case "GR":
            return "GREEN";
        case "BL":
            return "BLUE";
        case "YL":
            return "YELLOW";
        case "OR":
            return "ORANGE";
        case "SV":
            return "SILVER";
        case "No":
            return "NO PASSENGERS";
    }
}

function getLineColorClass(lineCode) {
    switch (lineCode) {
        case "RD":
            return "text-red";
        case "GR":
            return "text-green";
        case "BL":
            return "text-blue";
        case "YL":
            return "text-yellow";
        case "OR":
            return "text-orange";
        case "SV":
            return "text-silver";
    }
}

function getLineLogo(lineCode) {
    switch (lineCode) {
        case "RD":
            return "/images/line-logos/512px-WMATA_Red.svg.png";
        case "GR":
            return "/images/line-logos/512px-WMATA_Green.svg.png";
        case "BL":
            return "/images/line-logos/512px-WMATA_Blue.svg.png";
        case "YL":
            return "/images/line-logos/512px-WMATA_Yellow.svg.png";
        case "OR":
            return "/images/line-logos/512px-WMATA_Orange.svg.png";
        case "SV":
            return "/images/line-logos/512px-WMATA_Silver.svg.png";
        case "No":
            return "/images/line-logos/512px-No-Passengers.png";
    }
}

function stationNameMap(stationCode) {
    switch (stationCode) {
        case "A01":
            return "Metro Center";
        case "A02":
            return "Farragut North";
        case "A03":
            return "Dupont Circle";
        case "A04":
            return "Woodley Park-Zoo/Adams Morgan";
        case "A05":
            return "Cleveland Park";
        case "A06":
            return "Van Ness-UDC";
        case "A07":
            return "Tenleytown-AU";
        case "A08":
            return "Friendship Heights";
        case "A09":
            return "Bethesda";
        case "A10":
            return "Medical Center";
        case "A11":
            return "Grosvenor-Strathmore";
        case "A12":
            return "North Bethesda-White Flint";
        case "A13":
            return "Twinbrook";
        case "A14":
            return "Rockville";
        case "A15":
            return "Shady Grove";
        case "B01":
            return "Gallery Pl-Chinatown";
        case "B02":
            return "Judiciary Square";
        case "B03":
            return "Union Station";
        case "B04":
            return "Rhode Island Ave-Brentwood";
        case "B05":
            return "Brookland-CUA";
        case "B06":
            return "Fort Totten";
        case "B07":
            return "Takoma";
        case "B08":
            return "Silver Spring";
        case "B09":
            return "Forest Glen";
        case "B10":
            return "Wheaton";
        case "B11":
            return "Glenmont";
        case "B35":
            return "NoMa-Gallaudet U";
        case "C01":
            return "Metro Center (BL,OR,SV)";
        case "C02":
            return "McPherson Square";
        case "C03":
            return "Farragut West";
        case "C04":
            return "Foggy Bottom-GWU";
        case "C05":
            return "Rosslyn";
        case "C06":
            return "Arlington Cemetery";
        case "C07":
            return "Pentagon";
        case "C08":
            return "Pentagon City";
        case "C09":
            return "Crystal City";
        case "C10":
            return "Ronald Reagan Washington National Airport";
        case "C11":
            return "Potomac Yard";
        case "C12":
            return "Braddock Road";
        case "C13":
            return "King St-Old Town";
        case "C14":
            return "Eisenhower Avenue";
        case "C15":
            return "Huntington";
        case "D01":
            return "Federal Triangle";
        case "D02":
            return "Smithsonian";
        case "D03":
            return "L'Enfant Plaza";
        case "D04":
            return "Federal Center SW";
        case "D05":
            return "Capitol South";
        case "D06":
            return "Eastern Market";
        case "D07":
            return "Potomac Ave";
        case "D08":
            return "Stadium-Armory";
        case "D09":
            return "Minnesota Ave";
        case "D10":
            return "Deanwood";
        case "D11":
            return "Cheverly";
        case "D12":
            return "Landover";
        case "D13":
            return "New Carrollton";
        case "E01":
            return "Mt Vernon Sq 7th St-Convention Center";
        case "E02":
            return "Shaw-Howard U";
        case "E03":
            return "U Street/African-Amer Civil War Memorial/Cardozo";
        case "E04":
            return "Columbia Heights";
        case "E05":
            return "Georgia Ave-Petworth";
        case "E06":
            return "Fort Totten";
        case "E07":
            return "West Hyattsville";
        case "E08":
            return "Prince George's Plaza";
        case "E09":
            return "College Park-U of Md";
        case "E10":
            return "Greenbelt";
        case "F01":
            return "Gallery Pl-Chinatown";
        case "F02":
            return "Archives-Navy Memorial-Penn Quarter";
        case "F03":
            return "L'Enfant Plaza";
        case "F04":
            return "Waterfront";
        case "F05":
            return "Navy Yard-Ballpark";
        case "F06":
            return "Anacostia";
        case "F07":
            return "Congress Heights";
        case "F08":
            return "Southern Ave";
        case "F09":
            return "Naylor Road";
        case "F10":
            return "Suitland";
        case "F11":
            return "Branch Ave";
        case "G01":
            return "Benning Road";
        case "G02":
            return "Capitol Heights";
        case "G03":
            return "Addison Road-Seat Pleasant";
        case "G04":
            return "Morgan Boulevard";
        case "G05":
            return "Largo Town Center";
        case "K01":
            return "Court House";
        case "K02":
            return "Clarendon";
        case "K03":
            return "Virginia Square-GMU";
        case "K04":
            return "Ballston-MU";
        case "K05":
            return "East Falls Church";
        case "K06":
            return "West Falls Church";
        case "K07":
            return "Dunn Loring-Merrifield";
        case "K08":
            return "Vienna/Farfax-GMU";
        case "N01":
            return "McLean";
        case "N02":
            return "Tysons Corner";
        case "N03":
            return "Greensboro";
        case "N04":
            return "Spring Hill";
        case "N06":
            return "Wiehle-Reston East";
        case "N07":
            return "Reston Town Center";
        case "N08":
            return "Herndon";
        case "N09":
            return "Innovation Center";
        case "N10":
            return "Dulles";
        case "N11":
            return "Loudon Gateway";
        case "N12":
            return "Ashburn";
        case "J02":
            return "Van Dorn Street";
        case "J03":
            return "Franconia-Springfield";
        case "S04":
            return "King St-Old Town";
        case "S09":
            return "Braddock Road";
        case "S10":
            return "DCA-National Airport";
        case "S12":
            return "Crystal City";
        case "S13":
            return "Pentagon City";
        case "S14":
            return "Pentagon";
        default:
            return "Unknown Station";
    }
}
