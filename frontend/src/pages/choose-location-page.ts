import { initMap } from "../lib/mapbox";

function initChooseLocationPage() {
   class ChooseLocationPage extends HTMLElement {
      constructor() {
         super();
      }
      connectedCallback() {
         const header = document.createElement("header-comp");
         const mapContainer = document.createElement("div");
         mapContainer.id = "map";
         mapContainer.classList.add("map");
         const style = document.createElement("style");
         style.textContent = /*css*/ `
            .map{
               height: 100vh;
               width: 100vw;
            }
         `;
         this.append(header, mapContainer, style);
         initMap();
      }
   }

   customElements.define("choose-location-page", ChooseLocationPage);
}
export { initChooseLocationPage };
