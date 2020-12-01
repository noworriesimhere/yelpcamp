mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
center: campground.geometry.coordinates, // starting position [lng, lat]
zoom: 8 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');

const marker = new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3>${campground.title}</h3><p>${campground.location}</p>`
        )
    )
    .addTo(map); 

   