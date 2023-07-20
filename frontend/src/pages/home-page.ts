import { Router } from "@vaadin/router";

function initHomePage() {
   class HomePage extends HTMLElement {
      constructor() {
         super();
      }
      connectedCallback() {
         const headerEl = document.createElement("header-comp");

         const contentContainerEl = document.createElement("div");
         contentContainerEl.classList.add("container");

         const imgEl = document.createElement("img");
         imgEl.src =
            "https://res.cloudinary.com/dxdihjprh/image/upload/v1688831887/pet-finder/incwm1zpjwpeczovbz8x.png";
         imgEl.style.maxWidth = "217px";

         const titleEl = document.createElement("title-comp");
         titleEl.setAttribute("color", "#EB6372");
         titleEl.setAttribute("text", "Pet Finder App");

         const subtitleEl = document.createElement("subtitle-comp");
         subtitleEl.setAttribute(
            "text",
            "Encontrá y reportá mascotas perdidas cerca de tu ubicación"
         );

         const primaryButtonEl = document.createElement("button-comp");
         primaryButtonEl.setAttribute("text", "Dar mi ubicación actual");
         primaryButtonEl.setAttribute("bold", "true");
         primaryButtonEl.setAttribute("color", "#5A8FEC");
         primaryButtonEl.setAttribute("text-color", "#fff");
         primaryButtonEl.addEventListener("click", (e) => {
            e.preventDefault();
            Router.go("/choose-location");
         });

         const secondaryButtonEl = document.createElement("button-comp");
         secondaryButtonEl.setAttribute("text", "¿Cómo funciona Pet Finder?");
         secondaryButtonEl.setAttribute("bold", "true");
         secondaryButtonEl.setAttribute("color", "#00A884");
         secondaryButtonEl.setAttribute("text-color", "#fff");
         secondaryButtonEl.addEventListener("click", (e) => {
            e.preventDefault();
            Router.go("/");
         });

         const style = document.createElement("style");
         style.textContent = /*css*/ `
            .container{
               height: calc(100vh - 60px);
               display: flex;
               flex-direction:column;
               align-items: center;
               justify-content:space-evenly;
               padding: 45px;
            }
            button-comp{
               width:100%
            }
         `;

         contentContainerEl.append(
            imgEl,
            titleEl,
            subtitleEl,
            primaryButtonEl,
            secondaryButtonEl
         );
         this.append(headerEl, contentContainerEl, style);
      }
   }

   customElements.define("home-page", HomePage);
}
export { initHomePage };
