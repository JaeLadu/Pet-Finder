import { Router } from "@vaadin/router";

function initPasswordPage() {
   class PasswordPage extends HTMLElement {
      constructor() {
         super();
      }
      connectedCallback() {
         const headerEl = document.createElement("header-comp");

         const containerEl = document.createElement("div");
         containerEl.classList.add("container");

         const titleEl = document.createElement("title-comp");
         titleEl.setAttribute("text", "Contraseña");

         const formEl = document.createElement("form");
         //sin terminar
         //inputs deberían mostrar la info que ya se tiene del usuario en el placeholder, si es que existe
         //sino, se muestran vacíos
         formEl.innerHTML = /*html*/ `
            <label>
                <caption-comp text='contraseña'></caption-comp>
                <input type="password" name="password">
            </label>
            <label>
                <caption-comp text='confirmar contraseña'></caption-comp>
                <input type="password" name="passwordCheck">
            </label>
         `;

         const buttonEl = document.createElement("button-comp");
         buttonEl.setAttribute("color", "#5A8FEC");
         buttonEl.setAttribute("text", "Guardar");
         buttonEl.setAttribute("text-color", "#fff");
         buttonEl.addEventListener("click", (e) => {
            e.preventDefault();
            const formData = new FormData(formEl);
            const data = Object.fromEntries(formData.entries());
            //sin terminar
            console.log(data);
            Router.go("/profile");
         });

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
            form{
               display:flex;
                flex-direction:column;
                justify-content:space-between;
                gap: 20px;
                width: 100%;
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

         `;

         formEl.append(buttonEl);
         containerEl.append(titleEl, formEl);
         this.append(headerEl, containerEl, styleEl);
      }
   }
   customElements.define("password-page", PasswordPage);
}
export { initPasswordPage };
