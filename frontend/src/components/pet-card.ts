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

         const shadowEl = this.attachShadow({ mode: "open" });

         const cardEl = document.createElement("div");
         cardEl.classList.add("card");

         const imgEl = document.createElement("img");
         imgEl.src = img;

         const nameEl = document.createElement("title-comp");
         nameEl.setAttribute("text", name);
         nameEl.setAttribute("color", "white");

         const locationEl = document.createElement("body-text-comp");
         locationEl.setAttribute("text", location);
         locationEl.setAttribute("color", "white");
         locationEl.setAttribute("bold", "true");

         const styleEl = document.createElement("style");
         styleEl.textContent = /*css*/ `
         .card{
            border-radius: 10px;
            background-color: #26302E;
            box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
            padding: 7px;
         }
         img{
            width: 100%;
            max-height: 50%;
         }
         `;

         cardEl.append(imgEl, nameEl, locationEl);
         shadowEl.append(cardEl, styleEl);
      }
   }
   customElements.define("pet-card-comp", PetCard);
}
export { initPetCard };
