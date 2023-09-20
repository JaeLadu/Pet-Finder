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
            e.preventDefault();
            const formData = new FormData(formEl);
            const data: any = {};
            formData.forEach((value, key) => {
               data[key] = value.toString();
            });

            const inputEls = formEl.querySelectorAll("input");

            //elimina cualquier mensaje y clases de error previos
            clearErrorEls(formEl);

            const errorMesageEl = document.createElement("span");
            errorMesageEl.classList.add("error-message");
            errorMesageEl.style.color = "red";

            //checkeo de coincidencia de contraseña nueva
            if (data.password != data.passwordCheck) {
               errorMesageEl.textContent = "Las contraseñas no coinciden";
               inputEls[1].classList.add("error");
               inputEls[2].classList.add("error");
               inputEls[2].after(errorMesageEl);
            } else {
               const response = await state.signup(data.mail, data.password);
               debugger;
               if (response.ok) {
                  //Si todo salió ok
                  errorMesageEl.textContent = "Usuario creado";
                  errorMesageEl.style.color = "green";
                  formEl.after(errorMesageEl);

                  setTimeout(() => {
                     Router.go(targetPage);
                  }, 2500);
               } else {
                  errorMesageEl.textContent = "Hubo un error inesperado";
                  formEl.after(errorMesageEl);

                  console.log(response.error);
               }
            }
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
            .error{
               border: 2px solid red
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

function clearErrorEls(element: HTMLElement) {
   const messageEls = element.querySelectorAll(".error-message");
   const colorEls = element.querySelectorAll(".error");

   messageEls.forEach((message) => message.remove());
   colorEls.forEach((color) => color.classList.remove("error", "success"));
}

export { initSignUpPage };
