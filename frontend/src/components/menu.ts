import { Router } from "@vaadin/router";
import { state } from "../state";

function initMenu() {
   class Menu extends HTMLElement {
      constructor() {
         super();
         state.subscribe(() => this.connectedCallback);
      }

      connectedCallback() {
         const menuEl = document.createElement("div");
         menuEl.classList.add("menu");

         const closeEl = document.createElement("span");
         closeEl.classList.add(
            "material-symbols-outlined",
            "menu__close-button"
         );
         closeEl.textContent = "close";
         closeEl.addEventListener("click", (e) => {
            this.remove();
            this.innerHTML = "";
         });

         const linksContainerEl = document.createElement("ul");
         linksContainerEl.classList.add("menu__links-container");

         const profileLinkEl = document.createElement("li");
         profileLinkEl.innerHTML = /*html*/ `
            <subtitle-comp color='#fff' text='Mis datos'></subtitle-comp>
         `;
         profileLinkEl.addEventListener("click", () => {
            Router.go("/profile");
         });

         const reportsLinkEl = document.createElement("li");
         reportsLinkEl.innerHTML = /*html*/ `
            <subtitle-comp color='#fff' text='Mis mascotas reportadas'></subtitle-comp>
         `;
         reportsLinkEl.addEventListener("click", () => {
            Router.go("/reports");
         });

         const createReportLinkEl = document.createElement("li");
         createReportLinkEl.innerHTML = /*html*/ `
            <subtitle-comp color='#fff' text='Reportar mascota'></subtitle-comp>
         `;
         createReportLinkEl.addEventListener("click", () => {
            Router.go("/createreport");
         });

         const changeLocationLinkEl = document.createElement("li");
         const userLocation = state.getUserData()?.location;
         changeLocationLinkEl.innerHTML = /*html*/ `
            <subtitle-comp color='#fff' text='${
               userLocation ? "Cambiar ubicación" : "Dar mi ubicación actual"
            }'></subtitle-comp>
         `;
         changeLocationLinkEl.addEventListener("click", () => {
            Router.go("/choose-location");
         });

         linksContainerEl.append(
            profileLinkEl,
            reportsLinkEl,
            createReportLinkEl,
            changeLocationLinkEl
         );

         const userMail = state.getUserData()?.mail;
         const sessionContainerEl = document.createElement("div");
         sessionContainerEl.classList.add("menu__session-container");

         if (userMail) {
            const mailEl = document.createElement("caption-comp");
            mailEl.setAttribute("text", userMail);
            mailEl.setAttribute("color", "#fff");

            const captionEl = document.createElement("link-comp");
            captionEl.setAttribute("text", "cerrar sesión");
            captionEl.setAttribute("target", "/");
            captionEl.addEventListener("click", (e) => {
               e.preventDefault();
               state.closeSession();
               this.remove();
               this.innerHTML = "";
            });

            sessionContainerEl.append(mailEl, captionEl);
         } else {
            sessionContainerEl.innerHTML = /*html*/ `
            <link-comp target='/login' text='iniciar sesión'></link-comp>
            `;
         }

         const style = document.createElement("style");
         style.textContent = /*css*/ `
            .menu{
               position: absolute;
               top: 0px;
               right: 0px;
               bottom: 150px;
               left: 50px;
               z-index: 3;
               padding: 25px;
               border-radius: 0px 0px 10px 10px;
               background-color: #26302E;
               display: flex;
               flex-direction: column;
               justify-content:space-between;
            }
            .menu__close-button{
               color:#fff;
               font-size:40px;
               align-self:flex-end;
            }
            .menu__links-container{
               padding:0;
               display:flex;
               flex-direction:column;
               gap:60px;
            }
            li{
               list-style: none;
            }
            .menu__session-container{
               display:flex;
               flex-direction:column;
               text-align:center;
               gap:35px;
            }
`;

         menuEl.append(closeEl, linksContainerEl, sessionContainerEl);
         this.append(menuEl, style);
      }
   }
   customElements.define("menu-comp", Menu);
}
export { initMenu };
