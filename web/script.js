// DOM objects
const ip_box = document.getElementById("ip_box");
const latlong = document.getElementById("latlong");
const maps_link = document.getElementById('maps_link');

maps_link.style.visibility = 'hidden';

// Leaflet map objects
const attr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

const lmap = L.map('map');
const tiles = L.tileLayer(tileUrl);
const marker = L.marker([0, 0]);

tiles.addTo(lmap);
lmap.attributionControl.addAttribution(attr);
lmap.setView([0, 0], 1);

function randomIP() {
    let nums = [0, 0, 0, 0];

    for (let i = 0; i < nums.length; i++) {
        nums[i] = Math.floor(Math.random() * 256);
    }

    ip_box.value = nums.join(".");
    findLocation();
}

async function findLocation() {
    // Remove marker before each new location, re-add at the end
    marker.removeFrom(lmap);
    const url = "https://freegeoip.app/json/" + ip_box.value;

    let response = await fetch(url);
    let data = await response.json();

    latlong.innerText = data.country_name + ' (' + data.latitude + ', ' + data.longitude + ')';

    lmap.setView([data.latitude, data.longitude], 15);
    marker.setLatLng([data.latitude, data.longitude]);
    marker.addTo(lmap);

    maps_link.href = 'https://www.google.com/maps/search/?api=1&query=' + data.latitude + ',' + data.longitude;
    maps_link.style.visibility = 'visible';
}
