function initTitle() {
   class Title extends HTMLElement {
      constructor() {
         super();
      }

      connectedCallback() {
         const shadow = this.attachShadow({ mode: "open" });
         const titleEl = document.createElement("h1");
         titleEl.textContent = this.getAttribute("text") || "Títutlo";
         titleEl.classList.add("title");

         const color = this.getAttribute("color");

         const style = document.createElement("style");
         style.textContent = /*css*/ `
         .title{
             color: ${color || "#000"};
             text-align: center;
             font-family: Poppins;
             font-size: 36px;
             font-style: normal;
             font-weight: 700;
             line-height: normal;
             margin: 0;
            }
         `;

         shadow.append(titleEl, style);
      }
   }
   customElements.define("title-comp", Title);
}
export { initTitle };
