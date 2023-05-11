let latUser;
let longUser;

var marker;

var map = L.map("map").setView([41.45361795384844, 2.1863831892761048], 14);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// var marker = L.marker([51.5, -0.09]).addTo(map);

map.on("click", function (e) {
  if (marker) map.removeLayer(marker);
  console.log(e.latlng); // e is an event object (MouseEvent in this case)
  marker = L.marker(e.latlng).addTo(map);

  latUser = e.latlng.lat;
  longUser = e.latlng.lng;
  getlocation();
});

//   ------------------------------------------------------
const getlocation = () => {
  console.log(navigator.geolocation);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, showError);
  } else {
    alert("No location encontrada");
  }
};

const showError = (error) => {
  console.log("Error");
};

const showLocation = async (position) => {
  let lat = latUser;
  let long = longUser;

  console.log(lat, long);

  let response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
  );
  let data = await response.json();

  console.log(data.address.city);
  localStorage.setItem('currentLoc', data.address.city);
  window.close();
};

// Crear el mapa
// var map = L.map('map').setView([51.505, -0.09], 13);

// // Agregar el mapa base
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
//   maxZoom: 18,
// }).addTo(map);

// // Variables para almacenar las coordenadas seleccionadas
// var selectedLatLng = null;

// // Mostrar el mapa
// // document.getElementById('map').style.display = 'block';

// // Habilitar el clic en el mapa para seleccionar ubicación
// map.on('click', function(e) {
//   // Obtener las coordenadas seleccionadas
//   selectedLatLng = e.latlng;

//   // Actualizar el campo de ubicación con las coordenadas
//   localStorage.setItem('locR', selectedLatLng.lat + ', ' + selectedLatLng.lng);
//   // setLocation();
//   // Ocultar el mapa
//   // document.getElementById('map').style.display = 'none';

//   // Deshabilitar el clic en el mapa
//   map.off('click');
// });
