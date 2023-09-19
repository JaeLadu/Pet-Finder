import { Router } from "@vaadin/router";
import { state } from "../state";

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
         formEl.innerHTML = /*html*/ `
            <label>
               <caption-comp text='contraseña actual'></caption-comp>
               <input type="password" name="password">
            </label>
            <label>
               <caption-comp text='nueva contraseña'></caption-comp>
               <input type="password" name="newPassword">
            </label>
            <label>
               <caption-comp text='confirmar nueva contraseña'></caption-comp>
               <input type="password" name="passwordCheck">
            </label>
            `;

         const buttonEl = document.createElement("button-comp");
         buttonEl.setAttribute("color", "#5A8FEC");
         buttonEl.setAttribute("text", "Guardar");
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
            if (data.newPassword != data.passwordCheck) {
               errorMesageEl.textContent = "Las contraseñas no coinciden";
               inputEls[1].classList.add("error");
               inputEls[2].classList.add("error");
               inputEls[2].after(errorMesageEl);
            } else {
               //llamada al backend
               const response = await state.changePassword(
                  data.password,
                  data.newPassword
               );
               //si la contraseña no es la correcta
               if (!response?.passwordCheck) {
                  errorMesageEl.textContent =
                     "Contraseña erronea. Escribí tu contraseña actual";
                  inputEls[0].classList.add("error");
                  inputEls[0].after(errorMesageEl);
                  //Si hubo algún otro tipo de error
               } else if (response.error) {
                  errorMesageEl.textContent = "Hubo un error inesperado";
                  formEl.after(errorMesageEl);
               } else {
                  //Si todo salió ok
                  errorMesageEl.textContent = "Contraseña actualizada";
                  errorMesageEl.style.color = "green";
                  formEl.after(errorMesageEl);

                  setTimeout(() => {
                     Router.go("/profile");
                  }, 2500);
               }
            }
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
            .error{
               border: 2px solid red
            }
            .success{
               
               border: 2px solid green
            }

         `;

         formEl.append(buttonEl);
         containerEl.append(titleEl, formEl);
         this.append(headerEl, containerEl, styleEl);
      }
   }
   customElements.define("password-page", PasswordPage);
}

function clearErrorEls(element: HTMLElement) {
   const messageEls = element.querySelectorAll(".error-message");
   const colorEls = element.querySelectorAll(".error");

   messageEls.forEach((message) => message.remove());
   colorEls.forEach((color) => color.classList.remove("error", "success"));
}
export { initPasswordPage };
