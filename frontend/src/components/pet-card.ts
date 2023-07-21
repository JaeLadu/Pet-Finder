function initPetCard() {
   class PetCard extends HTMLElement {
      constructor() {
         super();
      }

      connectedCallback() {
         const img =
            this.getAttribute("img") ||
            "https://res.cloudinary.com/dxdihjprh/image/upload/v1688831887/pet-finder/incwm1zpjwpeczovbz8x.png";
         const name = this.getAttribute("name") || "Mascota perdida";
         const location = this.getAttribute("location") || "Cerca tuyo";
         const own = this.hasAttribute("own");

         const shadowEl = this.attachShadow({ mode: "open" });

         const cardEl = document.createElement("div");
         cardEl.classList.add("card");

         const imgEl = document.createElement("div");
         imgEl.classList.add("img");

         const infoContainerEl = document.createElement("div");
         infoContainerEl.classList.add("info-container");

         const nameEl = document.createElement("title-comp");
         nameEl.setAttribute("text", name);
         nameEl.setAttribute("color", "white");

         const locationEl = document.createElement("body-text-comp");
         locationEl.setAttribute("text", location);
         locationEl.setAttribute("color", "white");
         locationEl.setAttribute("bold", "true");

         const buttonEl = document.createElement("button-comp");
         buttonEl.setAttribute("text-color", "white");
         if (own) {
            buttonEl.setAttribute("text", "Editar");
            buttonEl.setAttribute("color", "#5A8FEC");
         } else {
            buttonEl.setAttribute("text", "Reportar");
            buttonEl.setAttribute("color", "#EB6372");
         }

         const styleEl = document.createElement("style");
         styleEl.textContent = /*css*/ `
         .card{
            border-radius: 10px;
            background-color: #26302E;
            box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
            padding: 7px;
            height: 30vh;
         }
         .img{
            width: 100%;
            height: 60%;
            background-image:url(${img});
            background-size: cover;
         }
         .info-container{
            width: 100%;
            height: 40%;
            padding:10px;
            display:grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
         }
         title-comp{
            grid-row: 1;
            grid-column: 1;
            justify-self: start;
            align-self: center;
         }
         body-text-comp{
            grid-row: 2;
            grid-column: 1;
            justify-self: start;
            align-self: center;
         }
         button-comp{
            grid-row: 1 / span 2;
            grid-column: 2;
            align-self: center;
            justify-self: center;
            width: 80%;
         }
         `;

         infoContainerEl.append(nameEl, locationEl, buttonEl);
         cardEl.append(imgEl, infoContainerEl);
         shadowEl.append(cardEl, styleEl);
      }
   }
   customElements.define("pet-card-comp", PetCard);
}
export { initPetCard };
