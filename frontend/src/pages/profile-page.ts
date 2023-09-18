import { Router, RouterLocation } from "@vaadin/router";
import { state } from "../state";

function initProfilePage() {
   class ProfilePage extends HTMLElement {
      constructor() {
         super();
      }
      onBeforeEnter(location: RouterLocation) {
         const token = state.getUserData()?.token;
         if (!token) {
            state.setTargetPage(location.pathname);
            Router.go("/login");
         }
      }
      connectedCallback() {
         const headerEl = document.createElement("header-comp");

         const containerEl = document.createElement("div");
         containerEl.classList.add("container");

         const titleEl = document.createElement("title-comp");
         titleEl.setAttribute("text", "Mis datos");

         const dataButtonEl = document.createElement("button-comp");
         dataButtonEl.setAttribute("color", "#5A8FEC");
         dataButtonEl.setAttribute("text", "Modificar datos personales");
         dataButtonEl.setAttribute("text-color", "#fff");
         dataButtonEl.addEventListener("click", (e) => {
            Router.go("/personaldata");
         });
         const passwordButtonEl = document.createElement("button-comp");
         passwordButtonEl.setAttribute("color", "#5A8FEC");
         passwordButtonEl.setAttribute("text", "Modificar contraseña");
         passwordButtonEl.setAttribute("text-color", "#fff");
         passwordButtonEl.addEventListener("click", (e) => {
            Router.go("/password");
         });

         const userEmailEl = document.createElement("body-text-comp");
         //sin terminar //modificar
         userEmailEl.setAttribute("text", "email@email.com"); //get user email from state

         const signoutEl = document.createElement("link-comp");
         signoutEl.setAttribute("text", "Cerrar sesión"); //falta agregar funcionalidad

         const styleEl = document.createElement("style");
         styleEl.textContent = /*css*/ `
            .container{
                height: calc(100vh - 60px);
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:space-evenly;
                padding:20px;
            }
            button-comp{
               width:100%;
            }

         `;

         containerEl.append(
            titleEl,
            dataButtonEl,
            passwordButtonEl,
            userEmailEl,
            signoutEl
         );
         this.append(headerEl, containerEl, styleEl);
      }
   }
   customElements.define("profile-page", ProfilePage);
}
export { initProfilePage };
