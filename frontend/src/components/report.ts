function initReport() {
   class Report extends HTMLElement {
      constructor() {
         super();
      }
      connectedCallback() {
         const shadow = this.attachShadow({ mode: "open" });
         const pet = this.getAttribute("pet");

         const closeEl = document.createElement("span");
         closeEl.classList.add(
            "material-symbols-outlined",
            "report__close-button"
         );
         closeEl.textContent = "close";
         //modificar
         //agregar que el evento de mandar la data también cierre el popup
         closeEl.addEventListener("click", (e) => {
            this.remove();
            this.innerHTML = "";
         });

         const reportEl = document.createElement("div");
         reportEl.classList.add("report");

         const titleEl = document.createElement("title-comp");
         titleEl.setAttribute("color", "white");
         titleEl.setAttribute("text", `Reportar info de ${pet || "mascota"}`);

         const formEl = document.createElement("form");
         formEl.classList.add("report__form");
         formEl.innerHTML = /*html*/ `
            <label>
                <caption-comp color='white' text='nombre'></caption-comp>
                <input name='nombre' type="text">
            </label>
            <label>
                <caption-comp color='white' text='teléfono'></caption-comp>
                <input name='teléfono' type="text">
            </label>
            <label >
                <caption-comp color='white' text='Donde lo viste?'></caption-comp>
                <textarea name='location'></textarea>
            </label>
         `;

         const bunttonEl = document.createElement("button-comp");
         bunttonEl.setAttribute("text", "Enviar información");
         bunttonEl.setAttribute("text-color", "white");
         bunttonEl.setAttribute("color", "#00A884");
         bunttonEl.addEventListener("click", (e) => {
            e.preventDefault();
            const formData = new FormData(formEl);
            const data = Object.fromEntries(formData.entries());
            formEl.dispatchEvent(
               new CustomEvent("report", {
                  bubbles: true,
                  composed: true,
                  detail: data,
               })
            );
         });

         const style = document.createElement("style");
         style.textContent = /*css*/ `
            .report{
               position: absolute;
               top: 75px;
               right: 30px;
               bottom: 75px;
               left: 30px;
               z-index: 3;
               padding: 25px;
               border-radius: 10px;
               background-color: #26302E;
               display: flex;
               flex-direction: column;
            }
            .report__close-button{
               color:#fff;
               font-size:40px;
               align-self:flex-end;
            }
            .report__form{
               display:flex;
                flex-direction:column;
                justify-content:space-between;
                gap: 20px;
                height: 100%;
                margin-top: 20px;
               }
            input,textarea{
               box-sizing:border-box;
               display:block;
               width: 100%;
               min-height: 50px;
               background-color: #4A5553;
               border-radius: 10px;
               border: none;
               color: white;
               font-family: Poppins;
               font-size: 16px;
               font-style: normal;
               font-weight: 400;
               line-height: normal;
               text-transform: uppercase;
               padding: 10px;
            }
            textarea{
               height: 155px;
            }
            `;

         //agrega el link a la hoja de estilos para que el ícono CLOSE exista dentro del shadow
         const headEl = document.createElement("head");
         const linkEl = document.createElement("link");
         linkEl.rel = "stylesheet";
         linkEl.href =
            "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";

         headEl.append(linkEl);
         formEl.append(bunttonEl);
         reportEl.append(closeEl, titleEl, formEl);
         shadow.append(headEl, reportEl, style);
      }
   }
   customElements.define("report-comp", Report);
}
export { initReport };
