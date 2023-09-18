import { Router } from "@vaadin/router";
import { state } from "../state";

function initSignUpPage() {
   class SignUpPage extends HTMLElement {
      constructor() {
         super();
      }
      connectedCallback() {
         const targetPage = state.getTargetPage();

         const headerEl = document.createElement("header-comp");

         const containerEl = document.createElement("div");
         containerEl.classList.add("container");

         const titleEl = document.createElement("title-comp");
         titleEl.setAttribute("text", "Registrarse");

         const instructionsEl = document.createElement("body-text-comp");
         instructionsEl.setAttribute(
            "text",
            "Ingresá los siguientes datos para realizar el registro"
         );

         const formEl = document.createElement("form");
         formEl.innerHTML = /*html*/ `
            <label>
                <caption-comp text='email'></caption-comp>
                <input type="text" name="mail">
            </label>
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
         buttonEl.setAttribute("text", "Registrarme");
         buttonEl.setAttribute("text-color", "#fff");
         buttonEl.addEventListener("click", async (e) => {
            //sin terminar
            //falta checkeo de password
            e.preventDefault();
            const formData = new FormData(formEl);
            const data = Object.fromEntries(formData.entries());
            const response = await state.signup(
               Object(data).mail,
               Object(data).password
            );
            if (response.ok) Router.go(targetPage);
            else console.log(response.error);
         });

         const accountQuestionEl = document.createElement("body-text-comp");
         accountQuestionEl.setAttribute("text", "Ya tenés cuenta?");

         const loginEl = document.createElement("link-comp");
         loginEl.setAttribute("text", "Iniciar sesión");
         loginEl.setAttribute("target", "/login");

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
         containerEl.append(
            titleEl,
            instructionsEl,
            formEl,
            accountQuestionEl,
            loginEl
         );
         this.append(headerEl, containerEl, styleEl);
      }
   }
   customElements.define("signup-page", SignUpPage);
}
export { initSignUpPage };
