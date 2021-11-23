$(document).ready(function() {
    $("div.specialPage").css("display", "none");
    $("div.homePage").css("display", "");
    resetFunction();

    for (var i = 0; i < countiesData.features.length; i++) {
        if ($("#stateSelectMenu option[value = '" + countiesData.features.at(i)["properties"]["INITIALS"] + "']").length > 0) {}

        else {
            stateSelectMenu.innerHTML += "<option value = '" + countiesData.features.at(i)["properties"]["INITIALS"] 
            + "'>" + countiesData.features.at(i)["properties"]["STATE"] + "</option>";
        }

        states.push({
            key:   countiesData.features.at(i)["properties"]["ID"],
            value: countiesData.features.at(i)["properties"]["INITIALS"]
        });
    }

    states = [...new Map(states.map(item => [JSON.stringify(item), item])).values()];
});

var pages = {1:"homePage", 2:"newsPage", 3:"settingsPage", 4:"aboutPage", 5:"helpPage", 6:"privPolPage", 7:"tosPage", 8:"tosPage"};
var states = [];
var datesArray = [];
var infRateArray = [];
var vaccRateArray = [];
var mapData = "";
var allPages = document.getElementsByClassName("specialPage");
var countyName = document.getElementById("countyName");
var stateName = document.getElementById("stateName"); 
var countyFIPSCode = document.getElementById("countyFIPSCode");
var stateSelectMenu = document.getElementById("stateSelectMenu");
var countyMenu = document.getElementById("countySelectMenu");
var dateOfDataMenu = document.getElementById("dateOfDataMenu");
var infectionRateForCounty = document.getElementById("infectionRate");
var vaccinationRateForCounty = document.getElementById("vaccinationRate");
var numOfCasesForCounty = document.getElementById("casesNum");
var numOfDeathsForCounty = document.getElementById("deathsNum");
var mapColorNum = 0;

async function getJson(url) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}

function revealPage(x) {
    for (var i = 0; i < allPages.length; i++) {
        allPages[i].style.display = "none";

        if (i + 1 == x) {
            document.getElementsByClassName(pages[x])[0].style.display = "";
        }
    }
}

function showPopUp(x) {
    var popup = document.getElementById(x);
    popup.classList.toggle("show");
}

$("#darkModeButton").on("click", function() {
    if ($("body").hasClass("dark")) {
        $("body").removeClass("dark");
        $("body").css("background-color", "#c5c5c5");
        $("div.specialPage").css("background-color", "#e7e7e7c0");
        $("#darkModeButton").text("Dark Mode");
        $("#currMode").text("Dark Mode");
        $("div.whiteBox").css("background-color", "white");
        $("p").css("color", "black");
        $("b").css("color", "black");
        $("i").css("color", "black");
        $("em").css("color", "black");
        $("li").css("color", "black");
        $("a").css("color", "#0275d8");
        $(".modeTitle").css("color", "black");
        $(".tnrTitle").css("color", "black");
        $("i.nav-title").css("color", "white");
        $("i.nav-maintitle").css("color", "rgb(221, 221, 221)");
        $(".navbar").css("background-color", "#cacacab6");
    } 
    
    else {
        $("body").addClass("dark");
        $("body").css("background-color", "gray");
        $("div.specialPage").css("background-color", "rgb(90, 90, 90)");
        $("#darkModeButton").text("Light Mode");
        $("#currMode").text("Light Mode");
        $("div.whiteBox").css("background-color", "#292b2c");
        $("p").css("color", "lightgray");
        $("b").css("color", "white");
        $("i").css("color", "white");
        $("em").css("color", "lightgray");
        $("li").css("color", "lightgray");
        $("a").css("color", "#5bc0de");
        $(".modeTitle").css("color", "white");
        $(".tnrTitle").css("color", "white");
        $("i.nav-title").css("color", "white");
        $("#resetSelectionButton b").css("color", "black");
        $("i.nav-maintitle").css("color", "rgb(221, 221, 221)");
        $(".navbar").css("background-color", "#292b2c");
    }
});

function stateToCounties(str) {
    if (str == "00") {
        countyName.innerHTML = "County Name: N/A";
        stateName.innerHTML = "State Name or Initials: N/A";
        countyFIPSCode.innerHTML = "County FIPS code: N/A";
        infectionRateForCounty.innerHTML = "Infection Rate: <b>N/A</b>";
        vaccinationRateForCounty.innerHTML = "Vaccinations: <b>N/A</b>";
        countyMenu.innerHTML = "<option value = '00000'>Select a County:</option>";
        dateOfDataMenu.disabled = true;
        dateOfDataMenu.value = "";
        dateOfDataMenu.min = "";
        dateOfDataMenu.max = "";
        numOfCasesForCounty.innerHTML = "N/A";
        numOfDeathsForCounty.innerHTML = "N/A";
        return;
    } 
    
    else {
        countyName.innerHTML = "County Name: N/A";
        countyFIPSCode.innerHTML = "County FIPS code: N/A";
        infectionRateForCounty.innerHTML = "Infection Rate: <b>N/A</b>";
        vaccinationRateForCounty.innerHTML = "Vaccinations: <b>N/A</b>";
        numOfCasesForCounty.innerHTML = "N/A";
        numOfDeathsForCounty.innerHTML = "N/A";
        fetch(`http://localhost:3000/getData_${str}`)
        .then(response => response.json())
        .then(data => populateCountySelectMenu(data['data']));
        return;
    }
}

function printFips(stateID, countyID) {
    if (stateID < 10) {
        stateID = '0' + stateID;
    }

    if (countyID < 10) {
        return stateID + '00' + countyID;
    }

    else if (countyID > 10 && countyID < 100) {
        return stateID + '0' + countyID;
    }

    else if (countyID > 99) {
        return stateID + countyID;
    }   
}

function printCountyName(countyName) {
    var modifiedCountyName = countyName.replace(/_/g," ");

    if (modifiedCountyName.substr(modifiedCountyName.length - 4) == "City") {
        return modifiedCountyName;
    }

    else {
        return modifiedCountyName + " County";
    }
}

function populateCountySelectMenu(data) {
    countyMenu.innerHTML = "<option value = '00000'>Select a County:</option>";
    datesArray = [];

    data.forEach(function ({state_ID, state_name, state_init, county_ID, county_name, county_infection_rate, county_vaccination_rate, dt}) {
        datesArray.push(`${dt}`.substring(0, 10));

        if ($("#countySelectMenu option[value = '" + printFips(`${state_ID}`, `${county_ID}`) + "']").length > 0) {}

        else {
            stateName.innerHTML = "State Name or Initials: " + `${state_name}` + " (" + `${state_init}` + ")"; 
            countyMenu.innerHTML += "<option value = '" + printFips(`${state_ID}`, `${county_ID}`) + "'>" + printCountyName(`${county_name}`) + "</option>";
        }
    });

    dateOfDataMenu.disabled = false;
    dateOfDataMenu.min = datesArray[0];
    dateOfDataMenu.max = datesArray.at(-1);
    dateOfDataMenu.value = datesArray.at(-1);
}

function showCountyData(str) {
    if (str == "00000") {
        countyName.innerHTML = "County Name: N/A";
        countyFIPSCode.innerHTML = "County FIPS code: N/A";
        infectionRateForCounty.innerHTML = "Infection Rate: <b>N/A</b>";
        vaccinationRateForCounty.innerHTML = "Vaccinations: <b>N/A</b>";
        numOfCasesForCounty.innerHTML = "N/A";
        numOfDeathsForCounty.innerHTML = "N/A";
        return;
    } 
    
    else {
        let x = str.substring(0, 2);
        $.each(states, function(k, v) {
            if (states[k].key == x) {
                fetch(`http://localhost:3000/getData_${states[k].value}`)
                .then(response => response.json())
                .then(data => loadData(str, data['data']));
            }
        });
    }
}

function resetFunction() {
    countyName.innerHTML = "County Name: N/A";
    stateName.innerHTML = "State Name or Initials: N/A";
    countyFIPSCode.innerHTML = "County FIPS code: N/A";
    infectionRateForCounty.innerHTML = "Infection Rate: <b>N/A</b>";
    vaccinationRateForCounty.innerHTML = "Vaccinations: <b>N/A</b>";
    document.getElementById("stateSelectMenu").value = "00";
    countyMenu.innerHTML = "<option value = '00000'>Select a County:</option>";
    dateOfDataMenu.disabled = true;
    dateOfDataMenu.value = "";
    dateOfDataMenu.min = "";
    dateOfDataMenu.max = "";
    datesArray = [];
    document.getElementById("typeOfMapMenu").value = "0";
    changeMapType("0");
    numOfCasesForCounty.innerHTML = "N/A";
    numOfDeathsForCounty.innerHTML = "N/A";
}

function loadData(str, data) {
    infRateArray = [];
    vaccRateArray = [];
    var tempDates = [];

    data.forEach(function ({state_ID, state_name, state_init, county_ID, county_name, county_infection_rate, county_vaccination_rate, cases, confirmed_deaths, dt}) {
        if (str == printFips(`${state_ID}`, `${county_ID}`)) {
            infRateArray.push(`${county_infection_rate}`);
            vaccRateArray.push(`${county_vaccination_rate}`);
            tempDates.push(`${dt}`.substring(0, 10));
        }

        if ((str == printFips(`${state_ID}`, `${county_ID}`)) && (dateOfDataMenu.value == (`${dt}`.substring(0, 10)))) {
            countyName.innerHTML = "County Name: " + printCountyName(`${county_name}`);
            stateName.innerHTML = "State Name or Initials: " + `${state_name}` + " (" + `${state_init}` + ")";
            countyFIPSCode.innerHTML = "County FIPS code: " + printFips(`${state_ID}`, `${county_ID}`);
            infectionRateForCounty.innerHTML = "Infection Rate: <b>" + `${county_infection_rate}` + "%</b>";
            vaccinationRateForCounty.innerHTML = "Vaccinations: <b>" + `${county_vaccination_rate}` + "&nbsp;</b><i style = 'font-size: 18px;'>fully vaccinated</i>";
            updateChart(infectionRateChart, infRateArray, tempDates);
            updateChart(vaccinationRateChart, vaccRateArray, tempDates);
            numOfCasesForCounty.innerHTML = `${cases}`;
            numOfDeathsForCounty.innerHTML = `${confirmed_deaths}`;
        }
    });
}

function changeMapType(val) {
    mapColorNum = val;

    switch (mapColorNum) {
        case "0":
            map.removeLayer(geojson);
            map.removeControl(legendForDeaths);
            geojson = L.geoJson(countiesData, {style: styleCases, onEachFeature: onEachFeature});
            document.getElementById("mapBoxTitle").innerHTML = "<h5 id = 'mapBoxTitle'>COVID Cases by County</h5>";
            map.addLayer(geojson);
            legendForCases.addTo(map);
            break;

        case "1":
            map.removeLayer(geojson);
            map.removeControl(legendForCases);
            geojson = L.geoJson(countiesData, {style: styleDeaths, onEachFeature: onEachFeature});
            document.getElementById("mapBoxTitle").innerHTML = "<h5 id = 'mapBoxTitle'>COVID Deaths by County</h5>";
            map.addLayer(geojson);
            legendForDeaths.addTo(map);
            break;
    }
}

/*===================================================
        INFECTION AND VACCINATION GRAPH CODES             
===================================================*/

function updateChart(chart, newDataset, dates) {
    var plots = [];
    var dateLabels = [];

    for (var x = 7; x > 0; x--) {
        if ((newDataset.length - x) < 0 || (dates.length - x) < 0) {
            plots.push(0);
            dateLabels.push("Unavailable");
        }

        else {
            plots.push(newDataset[newDataset.length - x]);
            dateLabels.push(dates[dates.length - x]);
        }
    }

    chart.data.labels = dateLabels;
    chart.data.datasets[0].data = plots;
    chart.update();
}

var getInfectionRateChart = document.getElementById("infectionRateChart").getContext('2d');
var infectionRateChart = new Chart(getInfectionRateChart, {
    type: 'line',
    data: {
        labels: ["6 Days Ago", "5 Days Ago", "4 Days Ago", "3 Days Ago", "2 Days Ago", "Yesterday", "Today"],
        datasets: [{
            label: "Infection Rate",
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: ['rgba(253, 53, 63, .2)',],
            borderColor: ['rgba(253, 10, 41, .7)',],
            borderWidth: 2
        }, {
            label: "",
            data: [30, 0, 30, 0, 30, 0, 30],
            backgroundColor: ['rgba(107, 255, 165, 0)',],
            borderColor: ['rgba(107, 255, 105, 0)',],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true
    }
});

var getVaccinationRateChart = document.getElementById("vaccinationRateChart").getContext('2d');
var vaccinationRateChart = new Chart(getVaccinationRateChart, {
    type: 'line',
    data: {
        labels: ["6 Days Ago", "5 Days Ago", "4 Days Ago", "3 Days Ago", "2 Days Ago", "Yesterday", "Today"],
        datasets: [{
            label: "Vaccinations",
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: ['rgba(107, 212, 255, .2)',],
            borderColor: ['rgba(39, 167, 255, .7)',],
            borderWidth: 2
        }, {
            label: "",
            data: [30, 0, 30, 0, 30, 0, 30],
            backgroundColor: ['rgba(107, 255, 165, 0)',],
            borderColor: ['rgba(107, 255, 105, 0)',],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true
    }
});

/*===================================================
                LEAFLET CODE              
===================================================*/

// For all counties, replace below line with: var map = L.map('map').setView([39.7128,-94.0060], 4.3);
//For MD only, replace below line with: var map = L.map('map').setView([39, -77.0060], 8);
var map = L.map('map').setView([40.5, -75.0060], 7);

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href = "https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 19,
    subdomains:['mt0','mt1','mt2','mt3']
});

var carto = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href = "https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href = "https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
	maxZoom: 19
});

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 19,
    subdomains:['mt0','mt1','mt2','mt3']
});

var watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href = "http://stamen.com">Stamen Design</a>, <a href = "http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    maxZoom: 19,
    ext: 'jpg'
});

var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
});

osm.addTo(map);
carto.addTo(map);
googleStreets.addTo(map);
googleSat.addTo(map);
watercolor.addTo(map);
CartoDB_DarkMatter.addTo(map);

var baseLayers = {
    "Dark" : CartoDB_DarkMatter,
    "Water Color" : watercolor,
    "Satellite" : googleSat,
    "Google Map" : googleStreets,
    "OpenStreetMap" : osm
};

L.control.layers(baseLayers).addTo(map);
L.geoJSON(countiesData).addTo(map);

function getColorForCases(d) {
    return d > 30    ? '#800026' :
           d > 20    ? '#BD0026' :
           d > 15    ? '#E31A1C' :
           d > 12    ? '#FC4E2A' :
           d > 10    ? '#FD8D3C' :
           d > 7     ? '#FEB24C' :
           d > 5     ? '#FED976' :
                       '#FFEDA0' ;
}

function getColorForDeaths(d) {
    return d > 1800    ? '#33104A' :
           d > 1500    ? '#4B186C' :
           d > 1200    ? '#63218F' :
           d > 800     ? '#8F3192' :
           d > 500     ? '#C0458A' :
           d > 250     ? '#E8608A' :
           d > 100     ? '#EF9198' :
                         '#F8C1A8' ;
}

function getCasesAndDeaths(typeOfData, countyName, stateInits) {
    var modifiedCountyName = countyName.replace(/ /gi, "_").replace(/['.]/gi, "");

    if (modifiedCountyName.substr(modifiedCountyName.length - 6) == "County") {
        modifiedCountyName = modifiedCountyName.substring(0, modifiedCountyName.length - 7);
    }

    if (typeOfData == 0) {
        return caseData.features.at(-1)["properties"][modifiedCountyName];
    }

    if (typeOfData == 1) {
        return deathData.features.at(-1)["properties"][modifiedCountyName];
    }
}

function styleCases(feature) {
    return {
        fillColor: getColorForCases(getCasesAndDeaths(0, (feature.properties.NAME + "_" + feature.properties.LSAD), feature.properties.INITIALS)),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function styleDeaths(feature) {
    return {
        fillColor: getColorForDeaths(getCasesAndDeaths(1, (feature.properties.NAME + "_" + feature.properties.LSAD), feature.properties.INITIALS)),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(countiesData, {style: styleCases}).addTo(map);

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

var geojson;
geojson = L.geoJson(countiesData);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    info.update2(e.target.feature.properties);
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(countiesData, {
    style: styleCases,
    onEachFeature: onEachFeature
}).addTo(map);

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    if (mapColorNum == 0) {
        this._div.innerHTML = "<h5 id = 'mapBoxTitle'>COVID Cases by County</h5>" +  (props ?
            '<b>' + props.NAME + " " + props.LSAD + '</b><br>'  + props.STATE + ' (' + props.INITIALS + ')<br>' + getCasesAndDeaths(0, (props.NAME + "_" + props.LSAD), props.INITIALS) + ' confirmed cases per 100k'
            : 'Hover over a county');
    }

    if (mapColorNum == 1) {
        this._div.innerHTML = "<h5 id = 'mapBoxTitle'>COVID Deaths by County</h5>" +  (props ?
            '<b>' + props.NAME + " " + props.LSAD + '</b><br>'  + props.STATE + ' (' + props.INITIALS + ')<br>' + getCasesAndDeaths(1, (props.NAME + "_" + props.LSAD), props.INITIALS) + ' confirmed deaths'
            : 'Hover over a county');
    }
};

info.update2 = function (props) {
    document.getElementById("stateSelectMenu").value = props.INITIALS;
    stateToCounties(props.INITIALS);
    showCountyData(props.ID + props.COUNTY);
    setTimeout(function(){ document.getElementById("countySelectMenu").value = (props.ID + props.COUNTY); }, 500);
};

info.addTo(map);
var legendForCases = L.control({position: 'bottomright'});
var legendForDeaths = L.control({position: 'bottomright'});

legendForCases.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 5, 7, 10, 12, 15, 20, 30],
        labels = [];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML += '<i style = "background:' + getColorForCases(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legendForDeaths.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 100, 250, 500, 800, 1200, 1500, 1800],
        labels = [];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML += '<i style = "background:' + getColorForDeaths(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legendForCases.addTo(map);
