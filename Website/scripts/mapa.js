let latUser;
let longUser;

var marker;

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// var marker = L.marker([51.5, -0.09]).addTo(map);


map.on('click', function(e) {
    if(marker)
        map.removeLayer(marker);
    console.log(e.latlng); // e is an event object (MouseEvent in this case)
    marker = L.marker(e.latlng).addTo(map);

    latUser = e.latlng.lat;
    longUser = e.latlng.lng;

});

//   ------------------------------------------------------
const getlocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showLocation, showError)
    } else {
      alert('No location encontrada');
    }
  };

  const showError = (error) => {
    console.log('Error');
  }

  const showLocation = async(position) => {
    let lat = latUser;
    let long = longUser;

    console.log(lat, long);

    let response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`);
    let data = await response.json();

    console.log(data.address.city);

  }


