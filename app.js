$(document).ready(function() {
    $("div.specialPage").css("display", "none");
    $("div.homePage").css("display", "");
});

var pages = {1:"homePage", 2:"newsPage", 3:"settingsPage", 4:"aboutPage", 5:"helpPage", 6:"privPolPage", 7:"tosPage", 8:"tosPage"};

function revealPage(x) {
    var allPages = document.getElementsByClassName("specialPage");

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

/*===================================================
        INFECTION AND VACCINATION GRAPH CODES             
===================================================*/

var getInfectionRateChart = document.getElementById("infectionRateChart").getContext('2d');
var infectionRateChart = new Chart(getInfectionRateChart, {
    type: 'line',
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "Cases",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: ['rgba(253, 53, 63, .2)',],
            borderColor: ['rgba(253, 10, 41, .7)',],
            borderWidth: 2
        }, {
            label: "National Rate",
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

var map = L.map('map').setView([39.7128,-94.0060], 4.3);
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);

/*===================================================
                TILE LAYER               
===================================================*/

var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
subdomains: 'abcd',
	maxZoom: 19
});
CartoDB_DarkMatter.addTo(map);

googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
 });
 googleStreets.addTo(map); // Google Map Layer

/*===================================================
                LAYER CONTROL               
===================================================*/

var baseLayers = {
    "Google Map":googleStreets,
    "OpenStreetMap": osm,
};

L.control.layers(baseLayers).addTo(map);

/*===================================================
                CHOROPLETH Map               
===================================================*/

L.geoJSON(statesData).addTo(map);

function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(statesData, {style: style}).addTo(map);

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
// ... our listeners
geojson = L.geoJson(statesData);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
        : 'Hover over a state');
};

info.addTo(map);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);