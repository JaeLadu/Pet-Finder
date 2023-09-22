import { state } from "../state";

const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

function initMap(container, location) {
   const mapboxClient = new MapboxClient(MAPBOX_TOKEN);
   mapboxgl.accessToken = MAPBOX_TOKEN;
   const targetLocation = location || state.getUserData()?.location;

   // inicia el mapa
   const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: targetLocation
         ? [targetLocation.lng, targetLocation.lat]
         : [-63.954193, -36.252002],
      zoom: location ? 12 : 3.5,
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
      container.dispatchEvent(
         new CustomEvent("newlocation", {
            bubbles: true,
            composed: true,
            detail: marker.getLngLat(),
         })
      );
   });

   // agrega el listener para agregar el marcador al mapa cuando se hace click
   map.on("click", (e) => {
      marker.remove();
      marker.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map);

      container.dispatchEvent(
         new CustomEvent("newlocation", {
            bubbles: true,
            composed: true,
            detail: marker.getLngLat(),
         })
      );
   });
   if (location) {
      marker.setLngLat([location.lng, location.lat]).addTo(map);
   }
}

export { initMap };
