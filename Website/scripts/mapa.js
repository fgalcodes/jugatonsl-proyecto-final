var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// var marker = L.marker([51.5, -0.09]).addTo(map);

var marker;
map.on('click', function(e) {
    if(marker)
        map.removeLayer(marker);
    console.log(e.latlng); // e is an event object (MouseEvent in this case)
    marker = L.marker(e.latlng).addTo(map);
});