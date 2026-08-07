const map = L.map('map').setView([19.0760, 72.8777], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '© OpenStreetMap'
}).addTo(map);

// Rename variable
const pickupMarker = L.marker([19.0760, 72.8777])
         .addTo(map)
         .bindPopup("Pickup Location")
         .openPopup();

if (navigator.geolocation) {

         navigator.geolocation.getCurrentPosition(function (pos) {

                  const userLat = pos.coords.latitude;
                  const userLng = pos.coords.longitude;

                  L.marker([userLat, userLng])
                           .addTo(map)
                           .bindPopup("Your Location");

                  L.polyline([
                           [userLat, userLng],
                           [19.0760, 72.8777]
                  ], {
                           color: "#00c3ff",
                           weight: 5
                  }).addTo(map);

                  map.fitBounds([
                           [userLat, userLng],
                           [19.0760, 72.8777]
                  ]);

         });

}