import { Router } from "@vaadin/router";
import Dropzone, { DropzoneFile } from "dropzone";
import { initMap } from "../lib/mapbox.js";
import { state } from "../state.js";

function initCreateReportPage() {
   class CreateReportPage extends HTMLElement {
      constructor() {
         super();
      }
      onBeforeEnter() {
         const token = state.getUserData()?.token;
         if (!token) Router.go("/login");
      }

      connectedCallback() {
         const headerEl = document.createElement("header-comp");

         const containerEl = document.createElement("div");
         containerEl.classList.add("container");

         const titleEl = document.createElement("title-comp");
         titleEl.setAttribute("text", "Reportar Mascota");

         const instructionsEl = document.createElement("body-text-comp");
         instructionsEl.setAttribute(
            "text",
            "Ingresá la siguiente información para realizar el reporte de la mascota"
         );

         const formEl = document.createElement("form");
         formEl.innerHTML = /*html*/ `
            <label>
               <caption-comp text='nombre'></caption-comp>
               <input type="text" name="name">
            </label>
            `;

         //Dropzone
         const dropzoneInstructionsEl =
            document.createElement("body-text-comp");
         dropzoneInstructionsEl.setAttribute(
            "text",
            "Hacé click en la zona gris para seleccionar una imágen o arrastrala y soltala"
         );
         // Elemento donde va a ir dropzone
         const previewContainerEl = document.createElement("div");
         previewContainerEl.classList.add("dropzone-previews");
         formEl.append(previewContainerEl);

         // template necesaria para cambiar la apariencia de dropzone
         const template = document.createElement("div");
         template.innerHTML = /*html*/ `
         <div>
               <img class="prueba" data-dz-thumbnail>
               <button-comp color="red" text-color= "white" text="Eliminar" data-dz-remove></button-comp>
         </div>
         `;

         //dropzone config
         const dropzone = new Dropzone(formEl, {
            url: "/",
            autoProcessQueue: false,
            previewsContainer: previewContainerEl,
            previewTemplate: template.innerHTML,
            clickable: previewContainerEl,
            thumbnailHeight: 150,
            thumbnailWidth: 250,
            thumbnailMethod: "contain",
            addRemoveLinks: true,
         });

         let imageData: Dropzone.DropzoneFile;
         dropzone.on("addedfile", (file) => {
            imageData = file;
            previewContainerEl.style.backgroundColor = "transparent";
         });
         dropzone.on("removedfile", (file) => {
            previewContainerEl.style.backgroundColor = "grey";
         });

         //Map
         let location = { lng: 0, lat: 0 };
         const mapContainerEl = document.createElement("div");
         mapContainerEl.id = "map";
         mapContainerEl.classList.add("map-container");
         mapContainerEl.addEventListener(
            "newlocation",
            (e: CustomEventInit) => {
               location = { ...e.detail };
            }
         );

         const mapInstructionsEl = document.createElement("body-text-comp");
         mapInstructionsEl.setAttribute(
            "text",
            "Buscá un punto de referencia para reportar la mascota. Por ejemplo, la ubicación donde lo viste por última vez. Después, hacé click en el punto exacto que querés marcar"
         );

         const buttonsContainer = document.createElement("div");
         buttonsContainer.classList.add("buttons-container");

         const reportButtonEl = document.createElement("button-comp");
         reportButtonEl.setAttribute("color", "#00A884");
         reportButtonEl.setAttribute("text", "Reportar mascota");
         reportButtonEl.setAttribute("text-color", "#fff");
         reportButtonEl.addEventListener("click", async (e) => {
            e.preventDefault();
            const formData = new FormData(formEl);
            formData.append("dataURL", imageData.dataURL || "");
            formData.append("lat", JSON.stringify(location.lat));
            formData.append("lng", JSON.stringify(location.lng));
            const data: any = {};
            formData.forEach((value, key) => {
               data[key] = value.toString();
            });
            const response = await state.reportPet(
               data.dataURL,
               data.lat,
               data.lng,
               data.name
            );

            if (response.reportId) {
               console.log(response.message);
               Router.go("/reports");
            }
         });

         const cancelButtonEl = document.createElement("button-comp");
         cancelButtonEl.setAttribute("color", "#4A5553");
         cancelButtonEl.setAttribute("text", "Cancelar");
         cancelButtonEl.setAttribute("text-color", "#fff");
         cancelButtonEl.addEventListener("click", (e) => {
            e.preventDefault();
            Router.go("/reports");
         });

         const styleEl = document.createElement("style");
         styleEl.textContent = /*css*/ `
            .container{
                min-height: calc(100vh - 60px);
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:space-evenly;
                padding:20px;
            }
            form{
               display:flex;
                flex-direction:column;
                justify-content:space-between;
                gap: 45px;
                width: 100%;
                margin: 35px 0px;
               }
            input{
               box-sizing:border-box;
               display:block;
               width: 100%;
               min-height: 50px;
               border-radius: 10px;
               border: none;
               font-family: Poppins;
               font-size: 16px;
               font-style: normal;
               font-weight: 400;
               line-height: normal;
               text-transform: uppercase;
               padding: 10px;
            }
            .buttons-container{
               display: flex;
               flex-direction:column;
               gap:25px
            }
            .dropzone-previews{
               width:100%;
               min-height: 200px;
               background-color:gray;
               border-radius:10px;
            }
            .dz-remove{
               display: none;
            }

            .map-container{
               height: 300px;
               width: 100%;
            }

         `;

         buttonsContainer.append(reportButtonEl, cancelButtonEl);
         formEl.append(
            dropzoneInstructionsEl,
            mapContainerEl,
            mapInstructionsEl,
            buttonsContainer
         );
         containerEl.append(titleEl, instructionsEl, formEl);
         this.append(headerEl, containerEl, styleEl);
         initMap(mapContainerEl);
      }
   }
   customElements.define("create-report-page", CreateReportPage);
}
export { initCreateReportPage };
