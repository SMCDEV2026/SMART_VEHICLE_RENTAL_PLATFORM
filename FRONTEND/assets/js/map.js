// ===== Smart Vehicle Rental - Free OpenStreetMap =====

const pickupLat = 19.0760;
const pickupLng = 72.8777;

const map = L.map("map").setView([pickupLat, pickupLng], 13);

// OpenStreetMap Tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
         maxZoom: 19,
         attribution: "© OpenStreetMap"
}).addTo(map);

// Pickup Marker
const pickupMarker = L.marker([pickupLat, pickupLng])
         .addTo(map)
         .bindPopup("📍 Pickup Location")
         .openPopup();

// User GPS
if (navigator.geolocation) {

         navigator.geolocation.getCurrentPosition(function (position) {

                  const userLat = position.coords.latitude;
                  const userLng = position.coords.longitude;

                  // User Marker
                  L.marker([userLat, userLng])
                           .addTo(map)
                           .bindPopup("🟢 Your Current Location");

                  // Zoom
                  map.fitBounds([
                           [pickupLat, pickupLng],
                           [userLat, userLng]
                  ]);

                  // Blue Line
                  L.polyline([
                           [pickupLat, pickupLng],
                           [userLat, userLng]
                  ], {
                           color: "#00c3ff",
                           weight: 5
                  }).addTo(map);

         }, function () {

                  alert("Location permission denied.");

         });

} else {

         alert("GPS not supported.");

}