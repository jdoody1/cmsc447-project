$(document).ready(function() {
    $("div.specialPage").css("display", "none");
    $("div.homePage").css("display", "");
    resetFunction();
});

var pages = {1:"homePage", 2:"newsPage", 3:"settingsPage", 4:"aboutPage", 5:"helpPage", 6:"privPolPage", 7:"tosPage", 8:"tosPage"};
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
        $("p").css("color", "white");
        $("b").css("color", "white");
        $("i").css("color", "white");
        $("em").css("color", "white");
        $("li").css("color", "white");
        $("a").css("color", "#5bc0de");
        $(".modeTitle").css("color", "white");
        $(".tnrTitle").css("color", "white");
        $("i.nav-title").css("color", "white");
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
        vaccinationRateForCounty.innerHTML = "Vaccination Rate: <b>N/A</b>";
        countyMenu.innerHTML = "<option value = '00000'>Select a County:</option>";
        dateOfDataMenu.innerHTML = "<option value = '000'>Today (YYYY-MM-DD)</option>";
        numOfCasesForCounty.innerHTML = "N/A";
        numOfDeathsForCounty.innerHTML = "N/A";
        return;
    } 
    
    else {
        countyName.innerHTML = "County Name: N/A";
        stateName.innerHTML = "State Name or Initials: Maryland (MD)";
        countyFIPSCode.innerHTML = "County FIPS code: N/A";
        infectionRateForCounty.innerHTML = "Infection Rate: <b>N/A</b>";
        vaccinationRateForCounty.innerHTML = "Vaccination Rate: <b>N/A</b>";
        numOfCasesForCounty.innerHTML = "N/A";
        numOfDeathsForCounty.innerHTML = "N/A";
        fetch('http://localhost:3000/getData')
        .then(response => response.json())
        .then(data => populateCountySelectMenu(data['data']));
        return;
    }
}

function populateCountySelectMenu(data) {
    data.forEach(function ({id, name, infRate, vacRate}) {
        countyMenu.innerHTML += `<option value = "${id}">${name}</option>`;
    });
}

function showCountyData(str) {
    if (str == "00000") {
        countyName.innerHTML = "County Name: N/A";
        countyFIPSCode.innerHTML = "County FIPS code: N/A";
        infectionRateForCounty.innerHTML = "Infection Rate: <b>N/A</b>";
        vaccinationRateForCounty.innerHTML = "Vaccination Rate: <b>N/A</b>";
        numOfCasesForCounty.innerHTML = "N/A";
        numOfDeathsForCounty.innerHTML = "N/A";
        return;
    } 
    
    else {
        fetch('http://localhost:3000/getData')
        .then(response => response.json())
        .then(data => loadData(str, data['data']));
    }
}

function datesOfData(val) {
    dateOfDataMenu.innerHTML = "<option value = '000'>Today (YYYY-MM-DD)</option>";
}

function resetFunction() {
    countyName.innerHTML = "County Name: N/A";
    stateName.innerHTML = "State Name or Initials: N/A";
    countyFIPSCode.innerHTML = "County FIPS code: N/A";
    infectionRateForCounty.innerHTML = "Infection Rate: <b>N/A</b>";
    vaccinationRateForCounty.innerHTML = "Vaccination Rate: <b>N/A</b>";
    document.getElementById("stateSelectMenu").value = "00";
    countyMenu.innerHTML = "<option value = '00000'>Select a County:</option>";
    document.getElementById("typeOfMapMenu").value = "0";
    changeMapType("0");
    numOfCasesForCounty.innerHTML = "N/A";
    numOfDeathsForCounty.innerHTML = "N/A";
}

function loadData(str, data) {
    data.forEach(function ({id, name, infRate, vacRate}) {
        if (str == `${id}`) {
            countyName.innerHTML = "County Name: " + `${name}`;
            stateName.innerHTML = "State Name or Initials: Maryland (MD)";
            countyFIPSCode.innerHTML = "County FIPS code: " + `${id}`;
            infectionRateForCounty.innerHTML = "Infection Rate: <b>" + `${infRate}` + "%</b>";
            vaccinationRateForCounty.innerHTML = "Vaccination Rate: <b>" + `${vacRate}` + "%</b>";
            numOfCasesForCounty.innerHTML = getCasesAndDeaths(0, `${name}`);
            numOfDeathsForCounty.innerHTML = getCasesAndDeaths(1, `${name}`);
        }
    });
}

function getCasesAndDeaths(typeOfData, countyName) {
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

var getInfectionRateChart = document.getElementById("infectionRateChart").getContext('2d');
var infectionRateChart = new Chart(getInfectionRateChart, {
    type: 'line',
    data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
            label: "Cases",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: ['rgba(253, 53, 63, .2)',],
            borderColor: ['rgba(253, 10, 41, .7)',],
            borderWidth: 2
        }, {
            label: "State Average Rate",
            data: [28, 48, 40, 19, 86, 27, 90],
            backgroundColor: ['rgba(255, 255, 91, .2)',],
            borderColor: ['rgba(255, 255, 0, .7)',],
            borderWidth: 2
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
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "Cases",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: ['rgba(107, 212, 255, .2)',],
            borderColor: ['rgba(39, 167, 255, .7)',],
            borderWidth: 2
        }, {
            label: "National Rate",
            data: [28, 48, 40, 19, 86, 27, 90],
            backgroundColor: ['rgba(107, 255, 165, .2)',],
            borderColor: ['rgba(107, 255, 105, .7)',],
            borderWidth: 2
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
var map = L.map('map').setView([39, -77.0060], 8); //For MD only

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

osm.addTo(map);
carto.addTo(map);
googleStreets.addTo(map);
googleSat.addTo(map);
watercolor.addTo(map);

var baseLayers = {
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

function styleCases(feature) {
    return {
        fillColor: getColorForCases(getCasesAndDeaths(0, (feature.properties.NAME + "_" + feature.properties.LSAD))),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function styleDeaths(feature) {
    return {
        fillColor: getColorForDeaths(getCasesAndDeaths(1, (feature.properties.NAME + "_" + feature.properties.LSAD))),
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
            '<b>' + props.NAME + " " + props.LSAD + '</b><br>'  + props.STATE + ' (' + props.INITIALS + ')<br>' + getCasesAndDeaths(0, (props.NAME + "_" + props.LSAD)) + ' confirmed cases per 100k'
            : 'Hover over a county');
    }

    if (mapColorNum == 1) {
        this._div.innerHTML = "<h5 id = 'mapBoxTitle'>COVID Deaths by County</h5>" +  (props ?
            '<b>' + props.NAME + " " + props.LSAD + '</b><br>'  + props.STATE + ' (' + props.INITIALS + ')<br>' + getCasesAndDeaths(1, (props.NAME + "_" + props.LSAD)) + ' confirmed deaths'
            : 'Hover over a county');
    }
};

info.update2 = function (props) {
    showCountyData(props.ID + props.COUNTY);
};

info.addTo(map);
var legendForCases = L.control({position: 'bottomright'});
var legendForDeaths = L.control({position: 'bottomright'});

legendForCases.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 5, 7, 10, 12, 15, 20, 30],
        labels = [];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style = "background:' + getColorForCases(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legendForDeaths.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 100, 250, 500, 800, 1200, 1500, 1800],
        labels = [];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style = "background:' + getColorForDeaths(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legendForCases.addTo(map);