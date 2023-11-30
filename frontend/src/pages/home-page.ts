import { Router } from "@vaadin/router";
import { state } from "../state";

function initHomePage() {
   class HomePage extends HTMLElement {
      constructor() {
         super();
      }
      connectedCallback() {
         const headerEl = document.createElement("header-comp");
         this.append(headerEl);

         //chequea si hay info sobre la ubicación del usuario, si hay, renderiza una página, sino otra
         const location = state.getUserData()?.location;
         console.log(location);

         if (location) this.locationRender();
         else this.defaultRender();
      }

      //página a renderizar si NO hay info sobre la ubicación del usuario disponible
      defaultRender = () => {
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
         this.append(contentContainerEl, style);
      };

      //página a renderizar si hay info sobre la ubicación del usuario disponible
      locationRender = async () => {
         const subtitleEl = document.createElement("subtitle-comp");
         subtitleEl.setAttribute("text", "Mascotas perdidas cerca");
         subtitleEl.setAttribute("bold", "true");

         const pets = await state.getPetsInArea();

         const petCardscontainerEl = document.createElement("div");
         petCardscontainerEl.classList.add("cards-container");
         if (pets.length > 0) {
            pets.forEach(
               (pet: {
                  id: number;
                  imageURL: string;
                  name: string;
                  area: string;
                  owned: boolean;
               }) => {
                  const petCardEl = document.createElement("pet-card-comp");
                  petCardEl.setAttribute("img", pet.imageURL);
                  petCardEl.setAttribute("name", pet.name);
                  petCardEl.setAttribute("id", JSON.stringify(pet.id));
                  petCardEl.setAttribute("location", pet.area);
                  if (pet.owned)
                     petCardEl.setAttribute("own", JSON.stringify(pet.owned));

                  petCardEl.addEventListener(
                     "petCardReport",
                     (e: CustomEventInit) => {
                        const report = document.createElement("report-comp");
                        report.setAttribute("pet", pet.name);
                        report.setAttribute("id", JSON.stringify(pet.id));
                        report.addEventListener(
                           "report",
                           (e: CustomEventInit) => {
                              state.reportPet(e.detail);
                           }
                        );
                        petCardscontainerEl.append(report);
                     }
                  );

                  petCardscontainerEl.append(petCardEl);
               }
            );
         } else {
            const messageEl = document.createElement("subtitle-comp");
            messageEl.setAttribute(
               "text",
               "No hay mascotas perdidas cerca del área que elegiste"
            );
            petCardscontainerEl.append(messageEl);
         }

         const styleEl = document.createElement("style");
         styleEl.textContent = /*css*/ `
            subtitle-comp{
               margin: 25px
            }
            .cards-container{
               display: flex;
               flex-direction: column;
               gap: 35px;
               padding: 20px
            }
         `;

         this.append(subtitleEl, petCardscontainerEl, styleEl);
      };
   }

   customElements.define("home-page", HomePage);
}
export { initHomePage };
