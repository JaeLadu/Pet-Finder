import { Router } from "@vaadin/router";
import { state } from "../state";

function initPersonalDataPage() {
   class PersonalDataPage extends HTMLElement {
      constructor() {
         super();
      }
      async connectedCallback() {
         const headerEl = document.createElement("header-comp");

         const containerEl = document.createElement("div");
         containerEl.classList.add("container");

         const titleEl = document.createElement("title-comp");
         titleEl.setAttribute("text", "Datos personales");

         const personalData = await state.getUserPersonalData();

         const formEl = document.createElement("form");
         formEl.innerHTML = /*html*/ `
            <label>
                <caption-comp text='nombre'></caption-comp>
                <input type="text" name="name" placeholder="${
                   personalData.name || ""
                }">
            </label>
            <label>
                <caption-comp text='localidad'></caption-comp>
                <input type="text" name="city" placeholder="${
                   personalData.city || ""
                }">
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
            const response = await state.changeUserPersonalData(
               data.name,
               data.city
            );
            if (response.ok) Router.go("/profile");
            else console.log(response);
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
   customElements.define("personal-data-page", PersonalDataPage);
}
export { initPersonalDataPage };
