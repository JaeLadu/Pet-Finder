import { Router } from "@vaadin/router";
import { initMap } from "../lib/mapbox";
import { state } from "../state";

function initChooseLocationPage() {
   class ChooseLocationPage extends HTMLElement {
      constructor() {
         super();
      }
      connectedCallback() {
         const headerEl = document.createElement("header-comp");

         const explanationContainerEl = document.createElement("div");
         explanationContainerEl.classList.add("explanation-container");
         const explanationTextEl = document.createElement("body-text-comp");
         explanationTextEl.setAttribute(
            "text",
            "Buscá una dirección o punto geográfico cercano a donde estás.<br>Hacé click para soltar un pin y marcar la ubicación más exacta.<br>Al terminar, hacé click en Confirmar"
         );

         const mapContainerEl = document.createElement("div");
         mapContainerEl.id = "map";
         mapContainerEl.classList.add("map-container");
         mapContainerEl.addEventListener(
            "newlocation",
            (e: CustomEventInit) => {
               state.setUserLocation(e.detail);
            }
         );

         const buttonContainerEl = document.createElement("div");
         buttonContainerEl.classList.add("button-container");
         const buttonEl = document.createElement("button-comp");
         buttonEl.setAttribute("text", "Confirmar");
         buttonEl.setAttribute("color", "#5A8FEC");
         buttonEl.setAttribute("text-color", "white");
         buttonEl.addEventListener("click", (e) => Router.go("/"));

         const styleEl = document.createElement("style");
         styleEl.textContent = /*css*/ `
            .explanation-container{
               margin: 25px 45px;
               text-align: center;
            }
            .map-container{
               height: calc(100vh - 300px);
               width: 100%;
               max-width: calc(100vw - 20px);
               border-radius: 10px;
               margin: 10px;
            }
            .button-container{
               margin: 25px 10px
            }
         `;
         explanationContainerEl.append(explanationTextEl);
         buttonContainerEl.append(buttonEl);
         this.append(
            headerEl,
            explanationContainerEl,
            mapContainerEl,
            buttonContainerEl,
            styleEl
         );
         initMap(mapContainerEl);
      }
   }

   customElements.define("choose-location-page", ChooseLocationPage);
}
export { initChooseLocationPage };
