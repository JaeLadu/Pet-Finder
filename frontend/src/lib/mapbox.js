const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

// function addScripts(headEl) {
//    const scriptElOne = document.createElement("script");
//    const scriptElTwo = document.createElement("script");
//    const scriptElThree = document.createElement("script");
//    const linkElOne = document.createElement("link");
//    const linkElTwo = document.createElement("link");

//    scriptElOne.src = "//api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.js";
//    scriptElTwo.src = "//unpkg.com/mapbox@1.0.0-beta9/dist/mapbox-sdk.min.js";
//    scriptElThree.src =
//       "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js";

//    linkElOne.href = "//api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css";
//    linkElOne.rel = "stylesheet";

//    linkElTwo.href =
//       "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css";
//    linkElTwo.rel = "stylesheet";
//    linkElTwo.type = "text/css";

//    return headEl.append(
//       scriptElOne,
//       scriptElTwo,
//       scriptElThree,
//       linkElOne,
//       linkElTwo
//    );
// }
function initMap() {
   const mapboxClient = new MapboxClient(MAPBOX_TOKEN);
   mapboxgl.accessToken = MAPBOX_TOKEN;

   // inicia el mapa
   const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-63.954193, -36.252002],
      zoom: 3.5,
   });

   // agrega el buscador del mapa
   map.addControl(
      new MapboxGeocoder({
         accessToken: mapboxgl.accessToken,
         mapboxgl: mapboxgl,
         placeholder: "Buscar",
         countries: "ar",
         language: "es",
         marker: false,
      })
   );

   // crea el marcador/pin y agrega el listener para el evento de moverlo en el mapa
   const marker = new mapboxgl.Marker({ draggable: true });
   marker.on("dragend", (e) => {
      console.log(marker.getLngLat());
   });

   // agrega el listener para agregar el marcador al mapa cuando se hace click
   map.on("click", (e) => {
      marker.remove();
      marker.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map);
      console.log(marker.getLngLat());
   });
}

export { initMap };
