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
                <input type="text">
            </label>
            <label>
                <caption-comp color='white' text='teléfono'></caption-comp>
                <input type="text">
            </label>
            <label >
                <caption-comp color='white' text='Donde lo viste?'></caption-comp>
                <textarea></textarea>
            </label>
         `;

         const bunttonEl = document.createElement("button-comp");
         bunttonEl.setAttribute("text", "Enviar información");
         bunttonEl.setAttribute("text-color", "white");
         bunttonEl.setAttribute("color", "#00A884");
         formEl.append(bunttonEl);
         bunttonEl.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(formEl);
            const data = Object.fromEntries(formData.entries());
            console.log(data);
            formEl.dispatchEvent(
               new CustomEvent("report", {
                  bubbles: true,
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
                display:block;
                width: 100%;
                height: 50px;
                background-color: #4A5553;
                border-radius: 10px;
                border: none;
            }
            textarea{
                height: 155px;
            }
        `;
         reportEl.append(titleEl, formEl);
         shadow.append(reportEl, style);
      }
   }
   customElements.define("report-comp", Report);
}
export { initReport };
